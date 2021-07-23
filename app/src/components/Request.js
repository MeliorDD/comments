function getComments(){
    let myHeaders = new Headers();
    let resultToReturn
    myHeaders.append("YT-AUTH-TOKEN", "YourTar 878b9c2d1b9eb1e5cbb140b2cf756ae323ad91ac0aba06a5d66652af77cfa5c7eb247d7be0c86c02557b6bb0f0f7f139abadd76df4a23be3f17f2ffc15806226");

    var requestOptions = {
        mode:"no-cors",
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    fetch("http://localhost:8000/comments/?object_name=content&object_id=1&order=ASC&page=1&limit=10", requestOptions)
        .then(response => response.json())
        .then(result => resultToReturn = result)
        .catch(error => console.log('error', error));
        
    return resultToReturn
}

function createComment(comment){
    let myHeaders = new Headers();
    myHeaders.append("YT-AUTH-TOKEN", "YourTar 878b9c2d1b9eb1e5cbb140b2cf756ae323ad91ac0aba06a5d66652af77cfa5c7eb247d7be0c86c02557b6bb0f0f7f139abadd76df4a23be3f17f2ffc15806226");
    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: JSON.stringify(comment),
    redirect: 'follow'
    };

    fetch("http://localhost:8000/comments/", requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}