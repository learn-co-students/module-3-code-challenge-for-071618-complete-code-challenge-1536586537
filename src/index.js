document.addEventListener('DOMContentLoaded', function() {

  const imageId = 2 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageContainer = document.getElementById("image_card")

  fetch(imageURL).then(res => res.json()).then(image => {
    let allComments = image.comments
    console.log(allComments)
    imageContainer.innerHTML = `<img src="${image.url}" id="image" data-id/>
    <h4 id="name">${image.name}</h4>
    <span>Likes:
      <span id="likes">${image.like_count}</span>
    </span>
    <button id="like_button">Like</button>
    <form id="comment_form">
      <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
      <input type="submit" value="Submit"/>
    </form>
    <ul id="comments">
    </ul>`
    allComments.forEach(comment => {
      let element = document.createElement("LI");
      let commentContent = document.createTextNode(comment.content);
      element.appendChild(commentContent);
      document.getElementById("comments").appendChild(element)
    })

// add likes to frontend
    const likeButton = document.getElementById("like_button")
    likeButton.addEventListener("click", function(event) {
      event.preventDefault();
      image.like_count += 1;
      const likes = document.getElementById("likes")
      likes.innerHTML = image.like_count
// post likes to backend
      fetch(likeURL, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({image_id: 2, likes: image.like_count})
      }).then(res => res.json()).then(data => console.log(data))
    })
// add comments to frontend
      let commentForm = document.getElementById("comment_form")
      let commentList = document.getElementById("comments")
      commentForm.addEventListener("submit", function(event){
        event.preventDefault();
        let commentTextArea = document.getElementById("comment_input").value
        console.log(commentTextArea)
        let newComment = document.createElement("LI");
        let commentText = document.createTextNode(commentTextArea);
        newComment.appendChild(commentText)
        commentList.appendChild(newComment)
// add comments to backend
            fetch(commentsURL, {
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify({image_id: 2, content: commentTextArea})
            }).then(res => res.json()).then(data => console.log(data))
          })
      })

})
