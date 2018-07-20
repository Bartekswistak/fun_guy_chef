$(function() {
  $("#new_comment").on("submit", function(e) {
    e.preventDefault();

    const values = $(this).serialize()

    $.post(this.action, values).success(function(response) {


      let heading = document.createElement("h3")
      let description = document.createElement("p")

      heading.innerHTML = `${response.user.name} gives ${response.rating} stars on ${response.created_at}`
      description.innerHTML = response.description

debugger

    $('div.comments').append(heading)
    $('div.comments').append(description)
    })


  })
})
