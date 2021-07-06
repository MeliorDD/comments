import React from "react"

function Comment(props){
    return(
        <div className="comment" id={'comment' + props.index}>
          <div className="user">
            <b>{props.name}</b>
          </div>
          <div className="body" id={'com' + props.index}>
            {props.body}
          </div>
          <div className="time">
            {props.time}
          </div>
          <div className="buttons">
            <button onClick={() => props.editComment(props.index)} id={'edit' + props.index}>Редактировать</button>
            <button onClick={() => props.deleteComment(props.index)}>Удалить</button>
          </div>
        </div>
    )
  }

  export default Comment