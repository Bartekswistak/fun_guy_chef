$(function() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();

    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {

      let heading = document.createElement("h3")
      let description = document.createElement("p")

      heading.innerHTML = `${response.user.name} gives ${response.rating} out of 5 stars!`
      description.innerHTML = response.description

    $('div.comments').append(heading)
    $('div.comments').append(description)
    })

    $('form#new_comment')[0].reset()

  })
})
$(function() {
  $('.dcomment').click (function(e){
    e.preventDefault()
            if(confirm("Are you sure?")){
                $.post(this.href, {_method:'delete'}, null, "script");
                  return false;
            } else {
              return false;
            }
          })
    })
    
// $(function() {
//   $(".dcomment").on("click", function(e) {
//     debugger
//
//     e.preventDefault();
//   })
// })
