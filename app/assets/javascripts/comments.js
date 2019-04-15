$(function createComment() {
  $('body').on("submit","#new_comment", function(e) {
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
    let url = window.location.href

  $.post(url, params).success(function(response) {
      
    $('div.comments_container').append('<div class="new_comment_' + `${response.id}` + '"> </div>')

      $('div.new_comment_'+ `${response.id}`).append('<h3 class="cheading">' + response.user.name + ' gives ' + response.rating + ' out of 5 stars! </h3>')
      $('div.new_comment_'+ `${response.id}`).append('<p class="cdescription">' + response.description + '</p>')
      $('div.new_comment_'+ `${response.id}`).append('<a class="ecomment" href="/recipes/' + `${response.recipe_id}` + '/comments/' + `${response.id}` + '/edit">Edit</a>' + " ")
      $('div.new_comment_'+ `${response.id}`).append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${response.id}` + '">Delete</a>')

      $('form#new_comment')[0].reset();
      $('h2.no_comment_message').remove();
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

  $(function showComments(){
    $('body').on("click",'#comments_link', function(e){
      e.preventDefault();
      $('.comments_container').slideToggle(1000)
    })
  });


$(function() {
  $('body').on("click",'#comments_link', function () {
        $("#comments_link").fadeOut(function () {
            $("#comments_link").text(($("#comments_link").text() == 'View Comments') ? 'Hide Comments' : 'View Comments').fadeIn();
        })
    })
});
