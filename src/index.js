document.addEventListener('DOMContentLoaded', function() {
  const imageId = 7 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/7`
  const commentsURL = `https://randopic.herokuapp.com/comments/7`


  let imageHolder = document.getElementById('image_card')

  // GET INFO

  fetch(`https://randopic.herokuapp.com/images/`)
  .then(response => response.json())
  .then(data => displayData(data))

  // DISPLAY DATA
  function displayData(data) {
    let image = document.getElementById('image')
    let nameOfPic = document.getElementById('name')
    nameOfPic.innerText = `${data.name}`
    image.src = (`${data.url}`)
    let commentHolder = document.getElementById('comments')
    data.comments.forEach( comment =>{
      let eachComment = document.createElement('li')
      eachComment.innerText = `${comment.content}`
      commentHolder.appendChild(eachComment)

      //SUBMIT BUTTON NEED TO SUBMIT VALUE OF COMMENT INPUT AND PERSIST TO DATABASE
      //WILL SHOW COMMENT ON REFRESH
      let submitButton = document.getElementById('submit')

      submitButton.addEventListener('click', (event) => {
        event.preventDefault();
        let commentInput = document.getElementById('comment-input')
        fetch(commentsURL,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({comments: commentInput.value})
        })
      })
    })
    // LIKE BUTTOM ADDING AS STRING STILL AND NOT GOING TO DB
    // NEED TO CHANGE COUNTER TO NUMBERS
    let likeButton = document.getElementById('like_button')
    let likes = document.getElementById('likes')
    likes.innerText = parseInt(`${data.like_count}`)
    likeButton.addEventListener('click', () => {
      likes.innerText += 1
      fetch(likeURL,
        {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({like_count: likes})

      })
    })
  }
})
