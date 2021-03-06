class CreateRecipes < ActiveRecord::Migration[5.2]
  def change
    create_table :recipes do |t|
      t.string :name
      t.integer :prep_time_in_minutes
      t.integer :cook_time_in_minutes
      t.text :instructions
      t.belongs_to :user, null: false

      t.timestamps
    end
  end
end
