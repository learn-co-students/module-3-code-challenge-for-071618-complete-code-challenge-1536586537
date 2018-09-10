document.addEventListener('DOMContentLoaded', function() {
  const imageId = 9 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById('image_card')
  const image = document.getElementById('image')
  const likesButton = document.getElementById('like_button')
  const likesCount = document.getElementById('likes')
  const commentsList = document.getElementById('comments')
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')


  function addImageAndInfoToPage(){
    //fetch image url and information
    fetch(imageURL)
    .then(res => res.json())
    .then(img => {
      //add image info to html page
      // console.log(img)
      image.src = `${img.url}`
      likesCount.innerText = `${img.like_count}`
      //get comments array
      const commentsArray = img.comments
      //iterate through array for comments
      commentsArray.forEach(function(cmnt) {
        //create list items and append to commentsList
        let newLi = document.createElement('li')
        newLi.innerHTML = `${cmnt.content}`
        commentsList.append(newLi)
      })
      likesButton.addEventListener('click', function(){
        //check if button is working
        // console.log('pete')
        //add to likesCount
        likesCount.innerText = `${++img.like_count}`
        const newLikesCount = likesCount.innerText
        //make patch request to api(which is obviously not working)
        //to change
        // fetch(imageURL, {
	      //   method: 'POST',
	      //   mode: 'cors',
	      //   redirect: 'follow',
        //   like_count: ({like_count: newLikesCount})
	      //    headers: new Headers({
		    //    'Content-Type': 'text/plain'
	      // })
      commentForm.addEventListener('submit', function(event){
        event.preventDefault()
        const newComment = commentInput.innerText
        //make post request to add new comment
      })
      })

    })
  }
  addImageAndInfoToPage()
})
