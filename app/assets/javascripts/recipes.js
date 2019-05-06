function Recipe(recipe) {
	this.id = recipe.id
	this.name = recipe.name;
	this.cook_time_in_minutes = recipe.cook_time_in_minutes;
	this.prep_time_in_minutes = recipe.prep_time_in_minutes;
	this.instructions = recipe.instructions;
	this.ingredients = recipe.ingredients;
	this.recipe_ingredients = recipe.recipe_ingredients;
	this.user = recipe.user;
  }


Recipe.prototype.displayRecipe = function(e){
	
	$('div.container').remove();
	$('div.page').append("<div class='container'>")
	$('div.container').append('<h1 class="recipe_title">' + this.name + '</h1>')
	$('div.container').append('<h3 class= "cook_time">Prep Time: ' + this.prep_time_in_minutes + ' minutes ' + '--- Cook Time: ' + this.cook_time_in_minutes + ' minutes')
	$('div.container').append('<h4 class="ingredients"> Ingredients: </h4>')
	$('div.container').append('<ol class ="list">')
				
		$.each(this.ingredients, function(index, element) {						
			$('.list').append('<li id="ingredient_name_' + element.id + '">' + element.name + '</li>')
		})
					
		$.each(this.recipe_ingredients, function(index, element) {						
				$('#ingredient_name_' + element.ingredient_id).prepend(element.quantity + " ")
		})

	$('div.container').append('<h4 class="instructions"> Instructions: </h4>')
	$('div.container').append('<p class="recipe_instructions">' + this.instructions + '</p>')
	$('div.container').append('<h3 class="author">Added by: ' + this.user.name + '</h3>')
	$('div.container').append('<h2> <a href="#" class="show_comments"> Show Comments </a></h2>')
}

$(function showRecipeFromUsers() {
	$('body').on("click", 'a#user_recipe', function(e){
		e.preventDefault();
		
		let thisUrl = this.href
	
		$.ajax({
			action: 'GET',
			url: thisUrl,
			dataType: 'json',
			success: function(json) {

		let newRecipe = new Recipe(json)
		newRecipe.displayRecipe();

			}
			})
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		})
	})

$(function displayComments() {
	$('body').on("click", 'a.show_comments', function(e){
		e.preventDefault();
	
		let thisUrl = this.href

		$.ajax({
			action: 'GET',
			url: thisUrl,
			data: 'data',
			dataType: 'html',
			success: function(data) {
				let allComments = $(data).find("div.all_comments")
				$('div.container').append(allComments)
				$('a.show_comments').remove()
			}
		})
	})
})

$(function showUsersRecipes() {
	$('body').on("click",'a#users_recipes', function(e){
		e.preventDefault();
		
		let thisUrl = this.href
		
		$.ajax({
			action: 'GET',
			url: thisUrl,
			dataType: 'json',
			success: function(json) {
				
			$('div.container').remove();
			$('div.page').append("<div class='container'>")
			$('div.container').append("<h1 class ='user'>" + json[0].user.name + "'s Recipes</h1>");
			$('div.container').append("<h3 class='users_recipes'></h3>");
			

			$.each(json, function(index, element) {
				
				let edit = '<button type="button" name="button" class="button"> <a href="/recipes/' + element.id + '/edit">Edit</a> </button>'
				let remove = '<button type="button" name="button" class="button"> <a rel="nofollow" data-method="delete" href="/recipes/' + element.id + '">Delete</a> </button>'

				$('h3.users_recipes').append('<a id="user_recipe" href="/recipes/' + element.id + '">'+ element.name + '</a><br>') 
				$('h3.users_recipes').append('<p class="recipe_info"> Prep Time: ' + element.prep_time_in_minutes + " minutes" + 
												'<br> Cook Time: ' + element.cook_time_in_minutes + " minutes </p>");
				$('h3.users_recipes').append( '<br>' + edit + " " + remove + '<br><br>')
				
				
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
				let newRecipe = new Recipe(json)

				newRecipe.displayRecipe();
									
			}
		});
		window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
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
