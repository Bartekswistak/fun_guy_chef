class RecipeSerializer < ActiveModel::Serializer
    attributes :id, :name, :prep_time_in_minutes, :cook_time_in_minutes, :instructions
    has_many :recipe_ingredients
    has_many :ingredients, through: :recipe_ingredients
    belongs_to :user

end