$(function() {
  $("#new_comment").on("submit", function(e) {

//    $.ajax({
//      method: "GET",
  //    url: this.href

    //}).done(function(response){
      //debugger
      //$("div.comments").html(response)
    //});

    $.get(this.href).success(function(response) {
      $("div.comments").html(response)
    })

    e.preventDefault();
  })
})
