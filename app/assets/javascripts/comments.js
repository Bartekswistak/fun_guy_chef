$(function() {
  $('a.dcomment').on("click", function(e){
    e.preventDefault()
        $.post(this.href, {_method:'delete'});

            return false;
          })
        })
