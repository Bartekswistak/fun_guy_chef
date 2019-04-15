$(function displayRecipeInfo(){
    $('body').on('mouseenter', 'a#recipe_link', function(){
      $(this).next('p.recipe_info').slideDown(2000);
	})
});

$(function displayUserRecipeInfo(){
	$('body').on('mouseenter', 'a#user_recipe', function(){
		$(this).next('p.recipe_info').slideDown(2000);
	})
});

$(function showUsersRecipes() {
	$('body').on("click",'a#users_recipes', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let myRecipes = $(data).find('div.container');
			$('div.container').replaceWith(myRecipes)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function showRecipe() {
	$('body').on("click",'a#recipe_link', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let thisRecipe = $(data).find('div.container')
			$('div.container').replaceWith(thisRecipe)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function showRecipeFromUsers() {
	$('body').on("click", 'a#user_recipe', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let thisRecipe = $(data).find('div.container')
			$('div.container').replaceWith(thisRecipe)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function editRecipe(){
	$('body').on("click",'a#edit_recipe', function(e){
		e.preventDefault();

	var thisRecipe = $('div.container')
	
	$.get(this.href).success(function(data){
		var editForm = $(data).find('div.container');
		$(thisRecipe).replaceWith(editForm)
		
			$('body').on("click", 'button.cancel_edit_recipe', function(){
				$('div.edit_recipe_form').replaceWith(thisRecipe);
			 });        
		});
	});
});

$(function showAllRecipes() {
	$('body').on("click", 'a#all_recipes', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let thisRecipe = $(data).find('div.container')
			$('div.container').replaceWith(thisRecipe)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function showFastestRecipes() {
	$('body').on("click", 'a#fastest_recipes', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let thisRecipe = $(data).find('div.container')
			$('div.container').replaceWith(thisRecipe)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function createRecipeForm() {
	$('body').on("click", 'a#create_recipe', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let thisRecipe = $(data).find('div.container')
			$('div.container').replaceWith(thisRecipe)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function addMoreIngredients() {
	var max_fields = 10;
	var wrapper = $(".ingredient_form"); 
	var x = 0; 
	
	$('body').on('click', 'button.add_field_button', function(e){ 
		e.preventDefault();
		if(x < max_fields){ 
			x++; 
      		$('div.ingredient_form').append('<div class="ingredient_entry_form">Add New Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][ingredient][name]"/>Amount:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][quantity]"/><a href="#" class="remove_field">Remove</a></div>');
		};
	});
	
	$('body').on("click",".remove_field", function(e){ 
		e.preventDefault(); 

		$(this).parent('div.ingredient_entry_form').remove(); x--;
	});
});
