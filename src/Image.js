const commentul = document.getElementById("comments")

class Image {

  constructor(url){
    this.like_count = 0
    this.comments = []
    fetch(url)
      .then(resp=>resp.json())
      .then(json=>{
        const imageIMG = document.getElementById("image")
        imageIMG.src = json.url
        this.id = json.id
        json.comments.sort((a,b)=>{
          return a.id-b.id
        })
        this.comments = json.comments
        this.renderComment()
        this.addLike(json.like_count)
      })

  }

  addComment(comment){
    this.comments.push(comment)
    this.renderComment()
  }
  renderComment(){
    commentul.innerHTML = ""

    this.comments.forEach(comment=>{
      const li = document.createElement("li")
      li.innerHTML = comment.content + `<button data-commentid=${comment.id}>X</button>`
      commentul.append(li)
    })
  }
  addLike(count){
    let likeSpan = document.getElementById("likes")
    this.like_count+=count
    likeSpan.innerHTML =this.like_count

  }

  deleteComment(id){
    this.comments = this.comments.filter(comment=>{
      return comment.id !== parseInt(id)
    })
    this.renderComment()
  }
}
