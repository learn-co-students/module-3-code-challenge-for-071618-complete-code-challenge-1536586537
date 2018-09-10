// As a user, when the page loads I will see an image,
// any comments that image has, and the number of likes that image has.
//
// As a user, I can click to like an image, which will increase
// the number of likes that image has by one.
//
// As a user I can fill out an input fields and submit the form to add a comment to an image.
// I should see my new comment below any previous comments.
//
// As a user, when I refresh the page, any comments or likes I have added should be
// persisted to the backend API and I should see my changes on the page.


document.addEventListener('DOMContentLoaded', function() {

  const imageId = 1 //Enter your assigned imageId here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const likeButton = document.getElementById('like_button')
  const likes = document.getElementById('likes')



  // deliverable 1 - get the image data
  // I know that I have to fetch using the url, but I don't know how to iterate through to grab the url
  //("http://blog.flatironschool.com/wp-content/uploads/2017/06/IMAG2936-352x200.jpg") to post the actual image on to the page
  fetch(`https://randopic.herokuapp.com/images/${imageId}`).then(response => response)


  // deliverable 2 - incrementing like button
  // I know that I have to set a counter here, but I don't know how to
  // It needs an addEventListener with the action 'click' so that it knows when to increase the like count
  // I grabbed the element id of the like button and where the like button count is, but I don't know how to use it in the function
  likeButton.addEventListener('click', function(event) {

  })

  var i = 0;
  function likeButtonClick() {
      document.getElementById('like_button').value = ++i;

  // deliverable 3 - like button optimistic rendering
  // Since we want to manipulate the backend, we need to insert a post request here so that the db is changed
  // I would add an event listener along with the post request for the likes

  // deliverable 4 - comment feature
  // similar to the like button in deliverable 2, I need to add an event listener to the submit button with an action of "submit"
  // needs a preventDefault() to the submit button
  // I added an id to the input of the submit button called "submit"

  // deliverable 5 - comment feature optimistic rendering
  // similar to deliberable 3, I would create a post request to add a comment to the image
  // Along with the post request, I would have an event listener that would trigger this post request when the submit button is submitted

})
