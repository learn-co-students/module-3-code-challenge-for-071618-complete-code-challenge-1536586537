document.addEventListener('DOMContentLoaded', function() {
  const imageId = 16 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.getElementById('image')
  let imageName = document.getElementById('name')

  let imageLikes = document.getElementById('likes')
  let likeButton = document.getElementById('like_button')
  let likes = 0

  let imageComment = document.getElementById('comment_input')
  let form = document.getElementById('comment_form')
  let comments = document.getElementById('comments')

  let container = document.getElementsByClassName('container')[0]

  function fetchRandImage() {
    fetch(imageURL).then((res) => res.json()).then(displayRandImage)
  }

  function displayRandImage(imgObj) {
    image.src = imgObj.url
    imageName.innerText = imgObj.name
    imageLikes.innerText = imgObj.like_count
    imgObj.comments.forEach((element) => {
      let li = document.createElement('li')
      li.innerText = `${element.content}`
      imgObj.comments = imageComment.value
      comments.appendChild(li)
    })

    likeButton.addEventListener('click', function() {
      imageLikes.innerText = ++likes
      let postObject = {
              method:'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  image_id: `${imgObj.id}`
              })
          }
      fetch('https://randopic.herokuapp.com/likes', postObject)
    })

    form.addEventListener('submit', function(event) {
      event.preventDefault()

      let li = document.createElement('li')
      li.innerText = imageComment.value
      imgObj.comments = imageComment.value
      comments.appendChild(li)

      let postObject = {
              method:'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  image_id: `${imgObj.id}`,
                  content: `${imageComment.value}`
            })
          }
      fetch('https://randopic.herokuapp.com/comments', postObject)
      imageComment.value = ""
    })
  }

  function app() {
    fetchRandImage()
  }

  app()
})
