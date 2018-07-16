$(function() {
  $("#new_comment").on("submit", function(e) {

    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {

    $('div.comments').append(response)
    })

    e.preventDefault();
  })
})
