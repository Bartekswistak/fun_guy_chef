$(function createComment() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();
     
    const values = {
      description: $('#comment_description').val(),
      rating: $('#comment_rating').val()
    };

    const newComment = new Comment(values);
    newComment.commentConfirm();
    
  });
});

Comment.prototype.commentConfirm = function(e) {    
  let doIt = confirm(`You are about to comment: "${this.description}" and give a rating of: ${this.rating} stars`);
  if(doIt == true) {

    let params = {
      'comment[description]': this.description,
      'comment[rating]': this.rating
    };  
    
  $.post(this.action, params).success(function(response) {
    
    $('div.comments_container').append('<div class="new_comment_' + `${response.id}` + '"> </div>')

      $('div.new_comment_'+ `${response.id}`).append('<h3 class="cheading">' + response.user.name + ' gives ' + response.rating + ' out of 5 stars! </h3>')
      $('div.new_comment_'+ `${response.id}`).append('<p class="cdescription">' + response.description + '</p>')
      $('div.new_comment_'+ `${response.id}`).append('<a class="ecomment" href="/recipes/' + `${response.recipe_id}` + '/comments/' + `${response.id}` + '/edit">Edit</a>' + " ")
      $('div.new_comment_'+ `${response.id}`).append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${response.id}` + '">Delete</a>')
      
      $('form#new_comment')[0].reset();
    });  
  };
};

function Comment(comment) {
  this.description = comment.description;
  this.rating = comment.rating;
  this.user = comment.user;
}
  
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
      $.get(this.href).success(function(data){
        var editForm = $(data).find('.edit_comment').html();
        var id = $(data).find('.edit_comment')[0].id.match(/\d+/)[0]
        
          $('div.new_comment_' + id).hide();
          $('div.comments_container').append('<h3> Edit your Comment: </h3>' + editForm + "<button class ='cancel_edit'>Cancel</button>")
        
          
       });
  });
});
      //Edit form with values is successfully displayed, now work on the actual updating and ability to cancel to revert

  $(function canclEdit() {
    $('body').on("click", 'button.cancel_edit', function(){
      var id = $('.ecomment')[0].href.split("/")[6]
        $('div.new_comment_' + id).show();
        $('div.new_comment_' + id).siblings().hide();
       
          
    })
  })

  $(function submitEdit() {
    $('body').on("submit",'button#submit_comment'[0], function(e){
      e.preventDefault();
        alert('okay i got you')
       
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




