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
		}
	});
	
	$(wrapper).on("click",".remove_field", function(e){ 
		e.preventDefault(); 

		$(this).parent('div').remove(); x--;
		$(this).parent('div').reset()

	})
});

$(function showNextRecipe() {
	$('body').on('click', 'a.next', function(e){
		e.preventDefault();
		
		let url = '/recipes/2'

		$.get(url).success(function(data){
			let nextRecipe = $(data).find('div.container')

			$('div.container').replaceWith(nextRecipe);
		});		
			});
		$('body').on('click', 'a.previous', function(e){
			e.preventDefault();
			let prevUrl = '/recipes/1'
		
		$.get(prevUrl).success(function(data){
			let prevRecipe = $(data).find('div.container')
		
			$('div.container').replaceWith(prevRecipe);
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


    