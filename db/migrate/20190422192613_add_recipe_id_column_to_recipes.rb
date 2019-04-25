class AddRecipeIdColumnToRecipes < ActiveRecord::Migration[5.2]
  def change
    add_column :recipes, :recipe_id, :integer
  end
end
