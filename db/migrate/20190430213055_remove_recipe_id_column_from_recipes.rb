class RemoveRecipeIdColumnFromRecipes < ActiveRecord::Migration[5.2]
  def change
    remove_column :recipes, :recipe_id, :integer
  end
end
