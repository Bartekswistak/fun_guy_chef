class RecipesController < ApplicationController

  def home
    @recipes = Recipe.all
  end

  def new
    @recipe = Recipe.new
  end

  def create

  end


end
