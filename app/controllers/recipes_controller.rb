class RecipesController < ApplicationController

  def home
    @recipes = Recipe.all
      respond_to do |f|
        f.html { render :home }
        f.json { render json: @recipes }
      end
  end

  def new
    @recipe = Recipe.new
    @ingredients = 1.times.collect { @recipe.recipe_ingredients.build }
  end

  def create
    recipe = current_user.recipes.new(recipe_params)
    if recipe.save
      recipe.add_ingredients_to_recipe(recipe_ingredient_params)
      redirect_to recipe_path(recipe), notice: "Your recipe has successfully been added"
    else
      @recipe = Recipe.new
      redirect_to new_recipe_path, alert: recipe.errors.full_messages.each {|m| m}.join(", ")
    end
  end

  def show
    @recipe = find_by_id(Recipe)
    respond_to do |f|
      f.html { render :show }
      f.json { render json: @recipe}
    end
  end

  def edit
    @recipe = find_by_id(Recipe)
    @i = 1.times.collect { @recipe.recipe_ingredients.build }
  end

  def update
    recipe = find_by_id(Recipe)
    if current_user == recipe.user
      recipe.update(recipe_params)
      recipe.add_ingredients_to_recipe(recipe_ingredient_params)
      redirect_to recipe_path(recipe)
    else
      redirect_to recipe_path(recipe), alert: "You cannot edit another user's recipe"
    end
  end

  def destroy
    recipe = find_by_id(Recipe)
    recipe.delete
    redirect_to root_path
  end

  def sorted_cook_time
    @recipes = Recipe.fastest
    respond_to do |f|
      f.html { render 'recipes/fastest' }
      f.json { render json: @recipes }
    end
  end

private

  def recipe_params
    params.require(:recipe).permit(:id, :name, :prep_time_in_minutes, :cook_time_in_minutes, :instructions)
  end

  def recipe_ingredient_params
    params.require(:recipe).permit(recipe_ingredients_attributes: [:quantity, :ingredient_id, :recipe_id, ingredient: [:name]])
  end

end
