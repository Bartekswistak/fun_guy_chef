$(function() {
    $("#new_comment").on("submit", function(e) {
      e.preventDefault();
  
      const values = $(this).serialize()
  
      $.post(this.action, values).success(function(response) {
  
      //let new_comment_wrapper = ('<div class= "new_comment_container"/>').attr('id', `${response.id}`)
  
      $('div.comments_container').append('<h3 class="cheading">' + ` ${response.user.name}` + ' gives' + ` ${response.rating}` + ' out of 5 stars! </h3>')
      $('div.comments_container').append('<p class="cdescription">' + `${response.description}` + '</p>')
      $('div.comments_container').append('<a class="ecomment" href="/recipes/' + `${response.recipe_id}` + '/comments/' + `${response.id}` + '/edit">Edit</a>' + " ")
      $('div.comments_container').append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${response.id}` + '">Delete</a>')

      $('div.comments_container').wrapInner('<div class= "new_comment_container"/>').attr('id', `${response.id}`)
    
      })
  
      $('form#new_comment')[0].reset()
  
    })
  })
  
  $(function() {
    $('a.dcomment').on("click", function(e){
      e.preventDefault();

      alert("Delete this comment?");
    $(this).parent().remove();

  })    
})
  
  
  $(function(){
    $('a.ecomment').on("click", function(e) {
      e.preventDefault();
      alert("you hit edit")
    })
  })

  $(function(){
    $('#comments_link').on("click", function(e){
      e.preventDefault();
      $('.comments_container').fadeToggle();
    })
  })
  

