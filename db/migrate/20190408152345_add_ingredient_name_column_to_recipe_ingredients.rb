class AddIngredientNameColumnToRecipeIngredients < ActiveRecord::Migration[5.2]
  def change
    add_column :recipe_ingredients, :ingredient_name, :string
  end
end
