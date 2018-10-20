$(function() {
  $('a.dcomment').on("click", function(e){
    e.preventDefault()
    alert("Are you sure?");
    $('div').remove('new_comment_container');
         

      })
  })


$(function(){
  $('a.ecomment').on("click", function(e) {
    e.preventDefault()
    alert("you hit edit")
  })
})
