class Recipe < ApplicationRecord
  belongs_to :user
  has_many :ingredients

  validates :name, uniqueness: true
  validates :name, presence: true

end
