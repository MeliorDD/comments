import './App.css';
import ReactDOM from 'react-dom';


function Comment(props){
  return(
      <div className="comment" id={'comment' + props.index}>
        <div className="user">
          <b>{props.name}</b>
        </div>
        <div className="body" id={'com' + props.index}>
          {props.body}
        </div>
        <div className="buttons">
          <button onClick={() => editComment(props.index)} id={'edit' + props.index}>Редактировать</button>
          <button onClick={() => deleteComment(props.index)}>Удалить</button>
        </div>
      </div>
  )
}

function Form(){
  return(
    <form >
      <div className="form-group">
        <label htmlFor="comment-name">Имя:</label>
        <input type="name" className="form-control" id="comment-name" placeholder="Ваше имя"></input>
      </div>
      <div className="form-group">
          <label htmlFor="comment-body">Комментарий:</label>
          <input type="name" id="comment-body" placeholder="Ваш комментарий"/>
      </div>
      <div className="form-group text-right">
          <button type="submit" id="comment-add" onClick={addComment}>Добавить комментарий</button>
      </div>
    </form>
  )
}

function App() {
  return (
    <div>
      <div className="note">
        <h2>Статья</h2>
        <div className="text">
          Lorem sldkfm;dsalkgd;l gkdjfg;slkd f;lkbml kmf;lkf g;dlfkhjfd;l khjtioj hpoitgdksfg kjfhglkur hiuhasdj hldfkj ghlsku rghiusd fhgk jdshgl kjdnv kjdfnlv kushd roiu hgdi fjvn lkdfhiu erhgiou rhgs difjg lkdjfg shlkd fuhgori euah ifdlg kjdfghl kdjfghlriu thpwo hp lkhd;gkljhdfl
        </div>
      </div>
      {loadComments().map((com, index) => {
        if(com.name != '' && com.body != ''){
          return <Comment name={com.name} body={com.body} index={index} key={com.id}/>
        }
      })}
      <Form />
    </div>
  );
}

let comments = []

function addComment(){

    let commentName = document.getElementById('comment-name');
    let commentBody = document.getElementById('comment-body');

    let comment = {
        name : commentName.value,
        body : commentBody.value,
        time : Math.floor(Date.now()/1000)
    }

    if(commentName.value != '' && commentBody.value != '')
    {
      commentName.value = ''
      commentBody.value = ''
      comments.push(comment) 
      saveComments()
      ReactDOM.render(
        <App />, document.getElementById('root')
      )
    }
    
    
}
function saveComments(){
    localStorage.setItem('comments', JSON.stringify(comments))
}

function loadComments(){
    if(localStorage.getItem('comments')) {
        return comments = JSON.parse(localStorage.getItem('comments'))
    }
    else{
      return []
    }
}

function editComment(id){
  const body = document.getElementById('com' + id)
  const editBtn = document.getElementById('edit' + id)
  const textArea = document.createElement('textarea')
  const applyBtn = document.createElement('button')
  const cancelBtn = document.createElement('button')

  textArea.value = body.innerText
  textArea.id = 'ta'+id

  applyBtn.innerText = 'Ок'
  cancelBtn.innerText = 'Отмена'

  body.replaceWith(textArea)
  editBtn.replaceWith(applyBtn,cancelBtn)

  applyBtn.addEventListener('click', () => editCommentApply(textArea,body, applyBtn, cancelBtn,editBtn, id)) 
  cancelBtn.addEventListener('click', () => cancelEditing(textArea, body, applyBtn, cancelBtn,editBtn))
}

function deleteComment(id){
  comments.splice(id,1)
  const commentToDelete = document.getElementById('comment'+ id)
  commentToDelete.parentNode.removeChild(commentToDelete)
  saveComments()
}

function editCommentApply(editedComment, comment, ok, cancel,editBtn, id){
  comment.innerText = editedComment.value
  comments[id].body = comment.innerText
  editedComment.replaceWith(comment)
  saveComments()
  ok.parentNode.removeChild(ok)
  cancel.replaceWith(editBtn)
}

function cancelEditing(txtArea, comment, ok, cancel, editBtn){
  txtArea.replaceWith(comment)
  ok.parentNode.removeChild(ok)
  cancel.replaceWith(editBtn)
}

function timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp * 1000)
    let months = ['Января', 'Февраля', 'Марта','Апреля','Мая','Июня','Июля','Авгуса','Сентября','Октября','Ноября','Декабря']
    let year = a.getFullYear()
    let month = months[a.getMonth()]
    let date = a.getDate()
    let hour = a.getHours()
    let min = a.getMinutes()
    let sec = a.getSeconds()
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec 
    return time
}

export default App;
