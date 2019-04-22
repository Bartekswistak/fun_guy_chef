function Recipe(recipe) {
	this.id = recipe.id;
	this.name = recipe.name;
	this.cook_time_in_minutes = recipe.cook_time_in_minutes;
	this.prep_time_in_minutes = recipe.prep_time_in_minutes;
	this.instructions = recipe.instructions;
	this.ingredients = recipe.ingredients;
	this.recipe_ingredients = recipe.recipe_ingredients;
	this.user = recipe.user;
  }

$(function showUsersRecipes() {
	$('body').on("click",'a#users_recipes', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
		$.ajax({
			action: 'GET',
			url: thisUrl,
			dataType: 'json',
			success: function(json) {

			let edit = '<button type="button" name="button"> <a href="/recipes/1/edit">Edit</a> </button>'
			let remove = '<button type="button" name="button"> <a rel="nofollow" data-method="delete" href="/recipes/1">Delete</a> </button>'
		
			$('div.container').remove();
			$('div.page').append("<div class='container'>")
			$('div.container').append("<h1 class ='user'>" + json[0].user.name + "'s Recipes</h1>");
			$('div.container').append("<h3 class='users_recipes'></h3>");

			$.each(json, function(index, element) {

				// Need a recipe Id for showing and editing and deleting
				
				$('h3.users_recipes').append('<a id="user_recipe" href="/recipes/1">'+ element.name + '</a>') 
				$('h3.users_recipes').append('<p class="recipe_info"> Prep Time: ' + element.prep_time_in_minutes + " minutes" + 
												'<br> Cook Time: ' + element.cook_time_in_minutes + " minutes </p>");
				$('h3.users_recipes').append('<br>' + edit + remove + '<br><br>')
				
				
			});		
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
	
		}});
	});
});

$(function showRecipe() {
	$('body').on("click",'a#recipe_link', function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
		$.ajax({
			action: 'GET',
			url: thisUrl,
			dataType: 'json',
			success: function(json) {

					// Append recipe show data from json to HTML
					// also render comments at the bottom of the page...so probaby a function in comments.js to show comments..
				debugger
			}
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