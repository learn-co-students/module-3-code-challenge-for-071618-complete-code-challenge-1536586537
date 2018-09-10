document.addEventListener('DOMContentLoaded', function() {

  const imageId = 3 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = new Image(imageURL)
  contentText = document.getElementById("comment_input")
  comment_form = document.getElementById("comment_form")
  comment_form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if( contentText.value === "" )
      return alert("Please input comment.")
    const data = {
      method:"POST",
      body:JSON.stringify({
        image_id:image.id,
        content:contentText.value,
      }),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch(commentsURL, data)
      .then(resp=>resp.json())
      .then(json=>{
        image.addComment(json)
      })
  })


  likeButton = document.getElementById("like_button")
  like_button.addEventListener("click", (e)=>{
    const data = {
      method:"POST",
      body:JSON.stringify({
        image_id:image.id,
      }),
      headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }
    fetch(likeURL, data)
      .then(resp=>resp.json())
      .then(json=>{
        image.addLike(1)
      })
  })

  const commentul = document.getElementById("comments")
  commentul.addEventListener("click", (e)=>{
      let commentid = e.target.dataset.commentid
      if( commentid ){
        const data = {
          method:"DELETE",
        }
        fetch(commentsURL+commentid, data)
          .then(resp=>resp.json())
          .then(json=>{
            image.deleteComment(commentid)
          })

      }
  })
})
