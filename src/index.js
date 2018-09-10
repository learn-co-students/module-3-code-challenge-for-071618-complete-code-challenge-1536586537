document.addEventListener('DOMContentLoaded', function() {

  const imageId = 15 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const likebutton = document.getElementById('like_button')

  const image = document.getElementById('image')
  const name  = document.getElementById('name')
  const comform = document.getElementById('comment_form')
  let likes = document.getElementById('likes')
  let comments = document.getElementById('comments')

  fetch(imageURL)
  .then((res) => res.json())
  .then((data) => {
    // console.log(data)
    image.src = data.url
    name.innerText = data.name
    likes.innerText = data.like_count
    data.comments.forEach(e => {
      createComment(e.content)
    });

    likebutton.addEventListener('click', () => {
      likes.innerText = parseInt(likes.innerText) + 1
      fetch(likeURL,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({image_id: "15"})
      })
    })
  
    comform.addEventListener('submit', (e) => {
      e.preventDefault();
      createComment(comment_input.value)
      fetch(commentsURL,
      {
        headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method:"POST",
        body: JSON.stringify({image_id: "15", content: comment_input.value})
      })
      comform.reset();
    })
    return data; 
  })
  .then((data) => {
    // console.log(data)
    let delbuttons = document.getElementsByClassName('delete_button')
    Array.prototype.forEach.call(delbuttons, (e) =>{
      // console.log(data)
     e.addEventListener('click', (e) => {
        let target = e.target
        let parent = target.parentElement
        fetch(commentsURL + data.comments[target.id].id,
          {
            headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            method:"DELETE",
            message: 'Comment Destroyed'
          })
        comments.removeChild(parent)
      })
    })
  })
})


function createComment(content) {
  com = document.createElement('li')
  comdel = document.createElement('button')
  com.innerText = content + "   "
  comdel.innerText = "delete"
  comdel.className = "delete_button"
  comdel.id = document.getElementsByClassName('delete_button').length
  com.append(comdel)
  comments.append(com)
}
