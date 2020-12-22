let Url = "https://localhost:44324/api/"
let postRequestOptions = (obj,get=false)=>{
    let myHeaders = new Headers({
        "Content-Type": 'application/json',
    });
    let options = {
        method: 'post'
        , headers: myHeaders
        , body: JSON.stringify(obj)
    }
    if(get){
        options = {
            method: 'get'
            , headers: myHeaders
            , body: JSON.stringify(obj)
        } 
    }
    return options;
}
export {
    Url,
    postRequestOptions
};
