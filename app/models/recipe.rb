class Recipe < ApplicationRecord
  belongs_to :user
  has_many :comments
  has_many :recipe_ingredients
  has_many :ingredients, through: :recipe_ingredients

  validates :name, uniqueness: true
  validates :name, presence: true
  validates :prep_time_in_minutes, presence: true
  validates :cook_time_in_minutes, presence: true
  validates :instructions, presence: true

  accepts_nested_attributes_for :ingredients, reject_if: lambda {|attributes| attributes['name'].blank?}
  accepts_nested_attributes_for :recipe_ingredients, reject_if: lambda {|attributes| attributes['name'].blank?}

  scope :fastest, -> { order("cook_time_in_minutes ASC") }
  scope :most_ingredients, -> { order("recipe.recipe_ingredients.size DESC") }

  def clear_ingredients_from_recipe
      ingredients.size.times do
      ingredient = RecipeIngredient.find_by(recipe_id: self.id)
      ingredient.delete
    end
  end

  def add_ingredients_to_recipe(params)

    clear_ingredients_from_recipe

    params[:recipe_ingredients_attributes].each do |k, recipe_ingredient|

      if recipe_ingredient[:ingredient][:name].present?
        ingredient_name = recipe_ingredient[:ingredient][:name].downcase
        ingredient = Ingredient.find_or_create_by(name: ingredient_name)
      elsif recipe_ingredient[:ingredient_id].present?
        ingredient = Ingredient.find_by(id: recipe_ingredient[:ingredient_id])
      end

      if recipe_ingredient[:quantity].present?
        RecipeIngredient.create(quantity: recipe_ingredient[:quantity], ingredient_id: ingredient.id, recipe_id: self.id )
      end
    end
  end
end
