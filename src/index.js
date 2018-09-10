document.addEventListener('DOMContentLoaded', function() {

  const imageId = 13 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`


const imageCard = document.getElementById('image-card')
  fetch(imageURL)
  .then( response => response.json())
  .then( image => {
    console.log(image)
    const newImage = document.getElementById('image')
    const newName = document.getElementById('name')
    const newLike = document.getElementById('likes')
    const newComment = document.getElementById('comments')

    const imageName = document.createElement('div')
    imageName.innerText = image.name

    const imageIMG = document.createElement('img')
    imageIMG.src = image.url

    let imageLike = document.createElement('span')
    imageLike.innerText = image.like_count

    const allComments = image.comments
    const imageComment = document.createElement('li')
    // imageComment.innerText = allComments

    allComments.forEach(function(comment){
      newComment.append(comment.content)
    })
    newName.append(imageName)
    newName.append(imageIMG)
    newLike.append(imageLike)
    // newComment.append(imageComment)

    const likeButton = document.getElementById('like_button')
    likeButton.addEventListener('click', function(event) {
      event.preventDefault()
      // imageLike.innerText = image.like_count += 1
      fetch(likeURL, {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({image_id: 13})
      })
    })

    const submitButton = document.getElementById('submit-button')
    submitButton.addEventListener('click', function(event){
      event.preventDefault()
      const commentInput = document.getElementById('comment_input').value
      const userComment = document.createElement('li')
      userComment.innerText = commentInput
      // newComment.append(userComment)
      fetch(commentsURL, {
        method: "POST",
        body: JSON.stringify({image_id: 13, content: commentInput}),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })

    })

  })


})
