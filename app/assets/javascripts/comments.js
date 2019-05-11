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
    let thisComment = new Comment(response)
    thisComment.displayComment();
      
    });
  };
};

Comment.prototype.displayComment = function(e) {
  $('div.comments_container').append('<div class="new_comment_' + this.id + '"> </div>')

      $('div.new_comment_'+ `${this.id}`).append('<h3 class="cheading">' + this.user.name + ' gives ' + this.rating + ' out of 5 stars! </h3>')
      $('div.new_comment_'+ `${this.id}`).append('<p class="cdescription">' + this.description + '</p>')
      $('div.new_comment_'+ `${this.id}`).append('<a class="ecomment" href="/recipes/' + `${this.recipe_id}` + '/comments/' + `${this.id}` + '/edit">Edit</a>' + " ")
      $('div.new_comment_'+ `${this.id}`).append('<a class="dcomment" rel="nofollow" data-method="delete" href="/comments/' + `${this.id}` + '">Delete</a>')

      // `
      // <div>
      //   ${}
      // </div>
      // `

      $('form#new_comment')[0].reset();
      $('h2.no_comment_message').remove();
}

function Comment(comment) {
  this.description = comment.description;
  this.rating = comment.rating;
  this.user = comment.user;
}

  $(function deleteComment() {
    $('body').on("click",'a.dcomment', function(e){
      e.preventDefault();

      var alertBoolean = confirm("Delete this comment?");
        if (alertBoolean == true) {
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
