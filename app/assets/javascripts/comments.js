$(function() {
    $("#new_comment").on("submit", function(e) {
      e.preventDefault();
  
      const values = $(this).serialize()
  
      $.post(this.action, values).success(function(response) {
  
  
        let heading = document.createElement("h3")
        let description = document.createElement("p")
        let edit_link = document.createElement("a")
        let delete_link = document.createElement("a")
  
        heading.innerHTML = `${response.user.name} gives ${response.rating} out of 5 stars!`
        description.innerHTML = response.description
  
        edit_link.setAttribute('href', `/recipes/${response.recipe_id}/comments/${response.id}/edit`)
        edit_link.className = "ecomment"
        edit_link.innerHTML = "Edit"
  
        delete_link.setAttribute('href', `/comments/${response.id}`)
        delete_link.setAttribute('data-method', 'delete')
        delete_link.className = "dcomment"
        delete_link.innerHTML = "Delete"
  
      $('div.comments').append(heading)
      $('div.comments').append(description)
      $('div.comments').append(edit_link, " ", delete_link)
  
      $('div.comments').wrap('<div class= "new_comment_container"/>').attr('id', `${response.id}`)
  
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
  