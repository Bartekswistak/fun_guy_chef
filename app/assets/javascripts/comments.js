$(function() {
    $("#new_comment").on("submit", function(e) {
      e.preventDefault();
  
      const values = $(this).serialize()
  
      $.post(this.action, values).success(function(response) {
  
  
        // let heading = document.createElement("h3")
        // let description = document.createElement("p")
        // let edit_link = document.createElement("a")
        // let delete_link = document.createElement("a")
  
        // heading.innerHTML = `${response.user.name} gives ${response.rating} out of 5 stars!`
        // description.innerHTML = response.description
  
        // edit_link.setAttribute('href', `/recipes/${response.recipe_id}/comments/${response.id}/edit`)
        // edit_link.className = "ecomment"
        // edit_link.innerHTML = "Edit"
  
        // delete_link.setAttribute('href', `/comments/${response.id}`)
        // delete_link.setAttribute('data-method', 'delete')
        // delete_link.className = "dcomment"
        // delete_link.innerHTML = "Delete"
  
      // $('div.comments').append(heading)
      // $('div.comments').append(description)
      // $('div.comments').append(edit_link, " ", delete_link)
  
      // $('div.comments').append('<div class= "new_comment_container"/>').attr('id', `${response.id}`)
  
      $('div.comments').append('<h3>' + ` ${response.user.name}` + ' gives' + ` ${response.rating}` + ' out of 5 stars! </h3>')
      $('div.comments').append('<p>' + `${response.description}` + '</p>')
      $('div.comments').append('<a class="ecomment" href="/recipes/' + `${response.recipe_id}` + '/comments/' + `${response.id}` + '/edit">Edit</a>' + " ")
      $('div.comments').append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${response.id}` + '">Delete</a>')


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
  

