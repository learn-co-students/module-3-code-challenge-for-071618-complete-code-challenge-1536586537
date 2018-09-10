document.addEventListener('DOMContentLoaded', function() {

  const imageId = 6 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const ImageContainer = document.getElementById('image_card');

  const actualImage = document.getElementById('image');

  const name = document.getElementById('name');

  const likes = document.getElementById('likes');

  const likeButton = document.getElementById('like_button');

  const comments = document.getElementById('comments')

  const commentInput = document.getElementById('comment_input')

  const submitComment = document.getElementById('submit-button')

  fetch('https://randopic.herokuapp.com/images/6')
  .then(res=> res.json())
  .then(imageData => displayImageData(imageData))


  const displayImageData = (imageData) =>{
    console.log(imageData)
    actualImage.src = imageData.url;
    name.innerHTML = imageData.name;
    likes.innerHTML = imageData.like_count;
    imageData.comments.forEach(comment =>{
      const eachComment = document.createElement('li');
      eachComment.dataset.id = comment.id;
      eachComment.innerHTML = comment.content;
      comments.append(eachComment)
    })
    frontAndBackEndLike(imageData);
    frontAndBackEndComment();

  }

  const frontAndBackEndLike = (imageData) =>{
    likeButton.addEventListener('click', e =>{
      console.log(likes)
      let likesTotal = imageData.like_count;
      likes.innerHTML = ++imageData.like_count;

      fetch(`https://randopic.herokuapp.com/likes/`,
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({image_id: 6, like_count: `${likes.innerHTML}`})
      })
    })
  }

  const frontAndBackEndComment = () =>{
    submitComment.addEventListener('click', e =>{
      e.preventDefault();
      const newComment = document.createElement('li');
      newComment.innerHTML = commentInput.value
      console.log(newComment.innerHTML)
      comments.append(newComment)
      commentInput.value = ''

      fetch(commentsURL,
      {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify({image_id: 6, content: `${newComment.innerHTML}`})
      })
    })
  }




})
