$(function() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();

    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {


      let heading = document.createElement("h3")
      let description = document.createElement("p")

      heading.innerHTML = `${response.user.name} gives ${response.rating} stars`
      description.innerHTML = response.description

    $('div.comments').append(heading)
    $('div.comments').append(description)
    })


  })
})
