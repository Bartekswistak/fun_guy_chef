$(function() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();

    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {
debugger
      let heading = document.createElement("h3")
      let description = document.createElement("p")
      let edit_link = document.createElement("a")
      let edit_link.href = `/recipes/${response.recipe_id}/comments/${response.id}/edit`

      heading.innerHTML = `${response.user.name} gives ${response.rating} out of 5 stars!`
      description.innerHTML = response.description
      edit_link.innerHTML = "<a href=`${edit_url}` />"

    $('div.comments').append(heading)
    $('div.comments').append(description)
    })

    $('form#new_comment')[0].reset()

  })
})
