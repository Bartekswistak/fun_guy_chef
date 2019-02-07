$(function createComment() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();
  
    const values = $(this).serialize()
  
    $.post(this.action, values).success(function(response) {
      const newComment = new Comment(response);
      //debugger
      $('div.comments_container').append('<div class="new_comment_' + `${response.id}` + '"> </div>')

      $('div.new_comment_'+ `${response.id}`).append('<h3 class="cheading">' + newComment.user.name + ' gives ' + newComment.rating + ' out of 5 stars! </h3>')
      $('div.new_comment_'+ `${response.id}`).append('<p class="cdescription">' + newComment.description + '</p>')
      $('div.new_comment_'+ `${response.id}`).append('<a class="ecomment" href="/recipes/' + `${response.recipe_id}` + '/comments/' + `${response.id}` + '/edit">Edit</a>' + " ")
      $('div.new_comment_'+ `${response.id}`).append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${response.id}` + '">Delete</a>')
      
      Comment.prototype.commentConfirm(newComment);
    });

$('form#new_comment')[0].reset();
  


  });
});
  
  $(function deleteComment() {
    $('body').on("click",'a.dcomment', function(e){
      e.preventDefault();

      var r = confirm("Delete this comment?");
        if (r == true) {
          $(this).parent().hide("slow");
          }
          else {
            return false;
          }
      });
  });
  
 
  $(function editComment(){
    $('body').on("click",'a.ecomment', function(e){
      e.preventDefault();

      $(this).parent().hide();
       $(".editing").show();

    });
  });

  $(function cancelEdit() {
    $('body').on("click",'button.cancel', function(e){
      e.preventDefault();
        
        $("form.editing").hide();

        $("form.editing").prev().show();
        
    })
  })
  

  var updateComments = (data) => {
    $.ajax({
      url: data.action,
      type: "PATCH",
      data: $(data).serialize(),
      success: function(response) {
        //update DOM/do something
      }
    });
  };

  $(function showComments(){
    $('#comments_link').on("click", function(e){
      e.preventDefault();
      $('.comments_container').fadeToggle()
    });
  });

$(function() {
    $("#comments_link").click(function () {
        $("#comments_link").fadeOut(function () {
            $("#comments_link").text(($("#comments_link").text() == 'View Comments') ? 'Hide Comments' : 'View Comments').fadeIn();
        })
    })
});

function Comment(comment) {
  this.description = comment.description;
  this.rating = comment.rating;
  this.user = comment.user;
}

Comment.prototype.commentConfirm = function() {
  alert('You are about to give a rating of: ' +  this.rating + 'stars');
}
