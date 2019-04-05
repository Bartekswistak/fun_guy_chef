$(function(){
    $('a#recipe_link').hover(function(){
      $(this).next('p.recipe_info').slideDown(2000);
    })
})

$(function(){
	$('h3.users_recipes').hover(function(){
		$(this).next('p.recipe_info').slideDown(2000);
	})
})

$(function() {
	var max_fields      = 10;
	var wrapper   		= $(".ingredient_form"); 
	var add_button      = $(".add_field_button"); 
	
	var x = 0; 
	$(add_button).click(function(e){ 
		e.preventDefault();
		if(x < max_fields){ 
			x++; 
      $(wrapper).append('<div class="recipe_form">Select Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + ']ingredient_id]"/>Or Add New Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][ingredient][name]"/>Amount:<input type="text" name="recipe[recipe_ingredients_attributes][' + x + '][quantity]"/><a href="#" class="remove_field">Remove</a></div>');
		}
	});
	
	$(wrapper).on("click",".remove_field", function(e){ 
		e.preventDefault(); $(this).parent('div').remove(); x--;
	})
});

$(function(){
	$('#submit_recipe').click(function(e){
		e.preventDefault();
		
		let params = {
			'recipe[cook_time_in_minutes]': this.cook_time_in_minutes,
			'recipe[prep_time_in_minutes]': this.prep_time_in_minutes,
			'recipe[instructions]': this.instructions
		  };
	
	$.post(this.action, params).success(function(response) {
		debugger
	})
	})
})

function Recipe(recipe) {
	this.cook_time_in_minutes = recipe.cook_time_in_minutes;
	this.prep_time_in_minutes = recipe.prep_time_in_minutes;
	this.instructions = recipe.instructions;
	this.user = recipe.user;
  }