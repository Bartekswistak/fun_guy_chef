$(function(){
    $('a#recipe_link').hover(function(){
      $(this).next('p.recipe_info').slideDown(2000);
    })
})

$(document).ready(function() {
	var max_fields      = 10; //maximum input boxes allowed
	var wrapper   		= $(".ingredient_form"); 
	var add_button      = $(".add_field_button"); //Add button ID
	
	var x = 1; //initial text box count
	$(add_button).click(function(e){ //on add input button click
		e.preventDefault();
		if(x < max_fields){ //max input box allowed
			x++; //text box increment
      $(wrapper).append('<div>Select Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][][ingredient_id]"/>Or Add New Ingredient:<input type="text" name="recipe[recipe_ingredients_attributes][][ingredient][name]"/>Amount:<input type="text" name="recipe[recipe_ingredients_attributes][][quantity]"/><a href="#" class="remove_field">Remove</a></div>');
		}
	});
	
	$(wrapper).on("click",".remove_field", function(e){ //user click on remove text
		e.preventDefault(); $(this).parent('div').remove(); x--;
	})
});
