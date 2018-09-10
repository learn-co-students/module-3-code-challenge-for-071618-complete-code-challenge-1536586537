//If I had more time I would have refactored this so that when a new comment is submitted, it comes with a delete button, not just on refresh

document.addEventListener('DOMContentLoaded', function() {

  const imageId = 8 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageTag = document.getElementById('image')
  const name = document.getElementById('name')
  const likes = document.getElementById('likes')
  const commentsList = document.getElementById('comments')

  const appContainer = document.getElementById('app-container')


  fetch('https://randopic.herokuapp.com/images/8')
  .then(resp=>resp.json())
  .then(imageObj => {
    imageTag.src = imageObj.url
    name.innerText = imageObj.name
    likes.innerText = imageObj.like_count

    imageObj.comments.forEach(comment=>{
      const individualComment =
      `<li>${comment.content}
        <button type="button" data-comment-id=${comment.id} data-action="delete-comment" name="button">Delete!</button>
      </li>`
      commentsList.innerHTML += individualComment
    })

    appContainer.addEventListener('click', function(event){
      if(event.target.dataset.action === 'increase-likes'){
        ++likes.innerText
        fetch("https://randopic.herokuapp.com/likes", {
          body: JSON.stringify({ image_id:8 }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })
      }

      if(event.target.dataset.action === 'delete-comment'){
        // console.log('hello')
        event.target.parentNode.remove()
        fetch(`https://randopic.herokuapp.com/comments/${event.target.dataset.commentId}`, {
          method: 'DELETE'
        })
      }
    })


    const commentForm = document.getElementById('comment_form')

    commentForm.addEventListener('submit', function(event){
      let commentInput = document.getElementById('comment_input')
      event.preventDefault()
      commentsList.innerHTML +=
      `<li>${commentInput.value}</li>`

        fetch("https://randopic.herokuapp.com/comments",{
          body: JSON.stringify({
            image_id: 8,
            content: commentInput.value
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST'
        })

        commentInput.value = ""

    })
  })

})
