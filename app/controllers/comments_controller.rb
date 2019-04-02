class CommentsController < ApplicationController
  
  def new
    @comment = Comment.new
  end

  def show
    comment = Comment.find_by(user: current_user, recipe: find_by_recipe_id)
  end

  def create
    if logged_in?
      comment = Comment.new(comment_params)
      comment.recipe = find_by_recipe_id
      comment.user = current_user
        if comment.description.empty? || comment.rating == nil
          redirect_to recipe_path(comment.recipe), alert: "Please fill out all fields"
        else
          comment.save
          render json: comment.to_json(only: [:rating, :description, :id, :recipe_id],
                                    include: [user: { only: [:name]}])
        end
      end
    end

  def edit
    @comment = find_by_id(Comment)
  end

  def update
    comment = find_by_id(Comment)
    respond_to do |format|
      if comment.update(comment_params)
        format.html { redirect_to recipe_path(comment.recipe), notice: 'Comment was successfully created.' }
        format.json { render json: comment.to_json(only: [:rating, :description, :id, :recipe_id],
                                          include: [user: { only: [:name]}])}
      else
        format.html { redirect_to recipe_path(comment.recipe), alert: "You can't leave the comment box blank. Please try again!" }
        format.json { render json: comment.errors, status:400 }
      end
    end
  end

  def destroy
    id = params["id"].to_i
    comment = Comment.find_by(id: id)
    if current_user == comment.user
      comment.delete
      flash[:notice] = "Comment has been deleted"
    else
      redirect_to recipe_path(comment.recipe), alert: "You can only delete your own comments"
    end
  end

  private

  def comment_params
     params.require(:comment).permit(:rating, :description, :user)
  end
end
