$(function displayRecipeInfo(){
    $('a#recipe_link').mouseenter(function(){
      $(this).next('p.recipe_info').slideDown(2000);
	})
});

$(function displayUserRecipeInfo(){
	$('a#user_recipe').mouseenter(function(){
		$(this).next('p.recipe_info').slideDown(2000);
	})
});

$(function showUsersRecipes() {
	$('a#users_recipes').click(function(e){
		e.preventDefault();
	
		let thisUrl = this.href
		
	$.get(thisUrl).success(function(data){
		let myRecipes = $(data).find('div.container').html();
			$('div.container').replaceWith(myRecipes)
			
			window.history.pushState('obj', 'PageTitle', thisUrl);
   				return false;
		});
	});
});

$(function editRecipe(){
	$('body').on("click",'a#edit_recipe', function(e){
		e.preventDefault();

	var thisrecipe = $('div.container')[0]
	
	$.get(this.href).success(function(data){
		var editForm = $(data).find('div.container').html();
		$('div.container').replaceWith(editForm)
			$('body').on("click", 'button.cancel_edit_recipe', function(){
				$('div.edit_recipe_form').replaceWith(thisrecipe);
			 });        
		});
	});
});

$(function addMoreIngredients() {
	var max_fields = 10;
	var wrapper = $(".ingredient_form"); 
	var x = 0; 
	
	$('body').on('click', ".add_field_button", function(e){ 
		e.preventDefault();
		if(x < max_fields){ 
			x++; 
      		$(wrapper).append('<div class="recipe_form">Add New Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][ingredient][name]"/>Amount:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][quantity]"/><a href="#" class="remove_field">Remove</a></div>');
		};
	});
	
	$(wrapper).on("click",".remove_field", function(e){ 
		e.preventDefault(); 
			
		$(this).parent('div').remove(); x--;
		$(this).parent('div').reset();
	});
});

$(function showNextRecipe() {
	$('body').on('click', 'a.next', function(e){
		e.preventDefault();
		
		let this_recipe_id = parseInt(this.href.match(/[^\/]*$/)[0]);
			this_recipe_id++;
		
		let next_recipe_url = '/recipes/' + this_recipe_id
		
		$.get(next_recipe_url).success(function(data){
			
			let nextRecipe = $(data).find('div.container')

			$('div.container').fadeOut(1000).replaceWith(nextRecipe.fadeIn(1000));
		
			window.history.pushState('obj', 'PageTitle', next_recipe_url);
   				return false;
		});		
	});
});

$(function showPrevRecipe() {
	$('body').on('click', 'a.previous', function(e){
		e.preventDefault();

		let this_recipe_id = parseInt(this.href.match(/[^\/]*$/)[0]);
		this_recipe_id--;
	
		let prevUrl = '/recipes/' + this_recipe_id
		

		$.get(prevUrl).success(function(data){
			let prevRecipe = $(data).find('div.container')

			$('div.container').fadeOut(1000).replaceWith(prevRecipe.fadeIn(1000));	
					
			window.history.pushState('obj', 'PageTitle', prevUrl);
   				return false;
		});
	});
});
















// $(function(){
// 	$('#submit_recipe').click(function(e){
// 		e.preventDefault();

// 		const values = {
// 			name: $('#recipe_name').val(),
// 			cook_time_in_minutes: $('#recipe_cook_time_in_minutes').val(),
// 			prep_time_in_minutes: $('#recipe_prep_time_in_minutes').val(),
// 			instructions: $('#recipe_instructions').val()
// 		  };
		
// 		let params = {
// 			'recipe[cook_time_in_minutes]': this.cook_time_in_minutes,
// 			'recipe[prep_time_in_minutes]': this.prep_time_in_minutes,
// 			'recipe[instructions]': this.instructions
// 		  };

// 		  const newRecipe = new Recipe(values);
// 	debugger
// 	$.post(this.action, params).success(function(response) {
		
// 	})
// 	})
// })

// function Recipe(recipe) {
// 	this.cook_time_in_minutes = recipe.cook_time_in_minutes;
// 	this.prep_time_in_minutes = recipe.prep_time_in_minutes;
// 	this.instructions = recipe.instructions;
// 	this.user = recipe.user;
//   }


    