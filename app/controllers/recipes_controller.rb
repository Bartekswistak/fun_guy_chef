class RecipesController < ApplicationController

  def home
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
    @ingredients = 6.times.collect { @recipe.recipe_ingredients.build }
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
      if @recipe == nil
        render "users/show"
      end
  end

  def edit
    @recipe = find_by_id(Recipe)
    @i = 6.times.collect { @recipe.recipe_ingredients.build }
  end

  def update
    recipe = find_by_id(Recipe)
    if current_user == recipe.user
      recipe.update(recipe_params)
      recipe.add_ingredients_to_recipe(recipe_ingredient_params)
      redirect_to recipe_path(recipe), notice: "Your recipe has successfully been updated"
    else
      redirect_to recipe_path(recipe), alert: "You cannot edit another user's recipe"
    end
  end

  def destroy
    recipe = find_by_id(Recipe)
    recipe.delete
    redirect_to root_path
  end

private

  def recipe_params
    params.require(:recipe).permit(:name, :prep_time, :cook_time, :instructions)
  end

  def recipe_ingredient_params
    params.require(:recipe).permit(recipe_ingredients_attributes: [:quantity, :ingredient_id, ingredient: [:name]])
  end

end
