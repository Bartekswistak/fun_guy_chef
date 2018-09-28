$(function() {
  $('a.dcomment').on("click", function(e){
    e.preventDefault()
    $('div.comments').remove();
         
    $.post(this.href, {_method:'delete'});
  
        return false
      })
  })


$(function(){
  $('a.ecomment').on("click", function(e) {
    e.preventDefault()
    alert("you hit edit")
  })
})
