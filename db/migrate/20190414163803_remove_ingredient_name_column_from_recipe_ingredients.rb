class RemoveIngredientNameColumnFromRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipe_ingredients, :ingredient_name, :string
  end
end
