$(function() {
  $('a.dcomment').click (function(e){
    e.preventDefault()
        $.post(this.href, {_method:'delete'});

            return false;
          })
        })
