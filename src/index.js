document.addEventListener('DOMContentLoaded', function() {

  const imageId = 4 //Enter your assigned imageId here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imgTag = document.getElementById('image');

  const imgNameTag = document.getElementById('name');

  const likesEl = document.getElementById('likes');

  const commentsEl = document.getElementById('comments');

  const imageCard = document.getElementById('image_card');

  const commentInputEl = document.getElementById('comment_input');


  function runApplication(){
    getAndDisplayInfoFromApi();
    addClickButtonListenerToImageCard();
    addSubmitListenerToImageCard();
  }

  function getAndDisplayInfoFromApi(){
    fetch(imageURL).
    then(res=>res.json()).
    then(function(apiObj){
      imgTag.src=apiObj.url;
      imgNameTag.innerHTML=apiObj.name;
      likesEl.innerText=apiObj.like_count
      apiObj.comments.forEach(function(comment){
        commentsEl.innerHTML+=`
          <li id=${comment.id}>
            ${comment.content} <button id=${comment.id} type='delete' data-action='delete'>X</button>
          </li>
        `
      })
    })
  }

  // function addClickButtonListenerToImageCard(){
  //     imageCard.addEventListener('click',function(event){
  //       if(event.target.dataset.action==='like'){
        //   let likeCount = likesEl.innerText
        //   likesEl.innerText = ++likeCount
        //   fetch(likeURL,{
        //     headers: {
        //       'Accept': 'application/json',
        //       'Content-Type': 'application/json'
        //     },
        //     method: "POST",
        //     body: JSON.stringify({image_id:4})
        // }).then(res=>res.json()).then(obj=>console.log(obj))}
      // else if(event.target.dataset.action='delete'){
      //   fetch(commentsURL,{
      //     headers: {
      //       'Accept': 'application/json',
      //       'Content-Type': 'application/json'
      //     },
      //     method: "DELETE",
      //     body: JSON.stringify({image_id:4,id:document.querySelector(`li[data-id=${comment.id}]`)})
      // }).then(res=>res.json()).then(obj=>console.log(obj))}
  //     }
  //   })       
  // }

  function addClickButtonListenerToImageCard(){
    imageCard.addEventListener('click',function(){
      if(event.target.dataset.action==="like"){
        let likeCount = likesEl.innerText;
        likesEl.innerText = ++likeCount;
        fetch(likeURL,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({image_id:4})
      }).then(res=>res.json()).then(obj=>console.log(obj))}
       else if(event.target.dataset.action==="delete"){
        let deleteTargetId = event.target.id;
        let deleteTarget = document.getElementById(deleteTargetId);
        deleteTarget.remove();
        fetch(`${commentsURL}/${deleteTargetId}`,{
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "DELETE",
          body: JSON.stringify({image_id:4})
      }).then(res=>res.json()).then(obj=>console.log(obj))}
    })
  }
  


  function addSubmitListenerToImageCard(){
    imageCard.addEventListener('submit',function(event){
      event.preventDefault();
      let newCommentContent = commentInputEl.value
      commentsEl.innerHTML+=`
        <li>${newCommentContent}<button type='delete' data-action='delete'>X</button></li>
      `;
      commentInputEl.value='';
      fetch(commentsURL,{
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({image_id:4,content:newCommentContent})
    }).then(res=>res.json()).then(obj=>console.log(obj))
    })
  }
  
  runApplication();

})

