$(function() {
  $("#new_comment").on("submit", function(e) {

//    $.ajax({
//      method: "GET",
  //    url: this.href

    //}).done(function(response){
      //debugger
      //$("div.comments").html(response)
    //});
    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {
//      debugger
  //    $("div.comments").html(response)
    //})

    $('div.comments').append(response)
    })

    e.preventDefault();
  })
})
