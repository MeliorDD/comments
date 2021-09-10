function Form(props){

    function handleSubmit(e) {
        e.preventDefault();
        console.log('Отправлена форма.');
      }

    return(
      <form form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="comment-name"></label>
          <input type="name" className="form-control" id="comment-name" placeholder="Ваше имя"></input>
        </div>
        <div className="form-group">
            <label htmlFor="comment-body"></label>
            <input type="name" id="comment-body"  className="form-control" placeholder="Ваш комментарий"/>
        </div>
        <div className="form-group text-right">
            <button type="submit" id="comment-add" onClick={props.addComment}>Добавить комментарий</button>
        </div>
      </form>
    )
  }

  export default Form