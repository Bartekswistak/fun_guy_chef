class RecipesController < ApplicationController

  def home
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
  end

  def create
    recipe = current_user.recipes.new(recipe_params)
    if recipe.save
      recipe.add_ingredients_to_recipe(recipe_ingredient_params)
      redirect_to recipe_path(recipe), notice: "Your recipe has successfully been added"
    else
      @recipe = Recipe.new
      redirect_to new_recipe_path, alert: recipe.errors.full_messages.each {|m| m}.join
    end
  end

private

def recipe_params
  params.require(:recipe).permit(:name, :prep_time, :cook_time, :instructions)
end

def recipe_ingredient_params
  params.require(:recipe).permit(recipe_ingredients_attributes: [:quantity, :ingredient_id, ingredient: [:name]])
end


end
