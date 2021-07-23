import './App.css';
import ReactDOM from 'react-dom';
import Comment from './components/Comment'
import Form from './components/Form'
import Request from'./components/Request'

function App() {
  return (
    <div className="app">
      <div className="note">
        <h2>Статья</h2>
        <div className="text">
          Lorem sldkfm;dsalkgd;l gkdjfg;slkd f;lkbml kmf;lkf g;dlfkhjfd;l khjtioj hpoitgdksfg kjfhglkur hiuhasdj hldfkj ghlsku rghiusd fhgk jdshgl kjdnv kjdfnlv kushd roiu hgdi fjvn lkdfhiu erhgiou rhgs difjg lkdjfg shlkd fuhgori euah ifdlg kjdfghl kdjfghlriu thpwo hp lkhd;gkljhdfl
        </div>
      </div>
      {loadComments().map((com, index) => {
        if(com.name != ''){
          return <Comment name={com.name} body={com.body} time={timeConverter(com.time)} index={index} key={com.id} editComment = {editComment} deleteComment={deleteComment}/>
        }
      })}
      <Form addComment={addComment}/>
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

    if(commentName.value != '')
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
  ReactDOM.render(
    <App />, document.getElementById('root')
  )
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
    let time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min 
    return time
}

export default App;
