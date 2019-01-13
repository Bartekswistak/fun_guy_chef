$(function(){
    $('a#recipe_link').hover(function(){
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
