$(function() {
  $("#new_comment").on("submit", function(e) {

    $.ajax({
      method: "GET",
      url: '/recipes/1/comments',


    }).done(function(data){
      console.log(data)
    });


    e.preventDefault();
  })
})
