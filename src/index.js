document.addEventListener('DOMContentLoaded', function() {

  const imageId = 5 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let getImageContainer = document.getElementById("image_card")


  fetch(imageURL)
  .then(res => res.json())
  .then(data => {
    getImageContainer.innerHTML +=
    `<img id="image" src="${data.url} "data-id/>
    <h4 id="name">${data.name}</h4>

    <button id="like_button">Like</button>

    `
    let likeButton = document.getElementById("like_button")
    let likes = document.getElementById("likes")
    let currentCount = 0
    likeButton.addEventListener("click", function(e) {
      currentCount += parseInt(`${data.like_count + 1}`)
        likes.innerText = currentCount







    })
    fetch(likeURL,
             {
               headers: {
                 'Accept': 'application/json',
                 'Content-Type': 'application/json'
               },
               method: "POST",
               body: JSON.stringify({image_id: 5})
           })

           const getComments = document.getElementById("comments")
           const commentForm = document.getElementById("comment_input")
           const getSubmit = document.getElementById("submit")
           getSubmit.addEventListener("submit", function(e) {
             let createLI = document.createElement("li")
             let value = commentForm.value
             createLi.append(value)
              getComments.append(createLi)

           })

  })
})
