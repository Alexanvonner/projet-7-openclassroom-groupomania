import React from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import '../styles/DisplayAllTweet.css'
import { useState, useEffect} from 'react';


const DisplayAllTweet = ({ data, setData }) => {

    // stock comment value submit Post 
    const [comment, setComment] = useState({});

    const [majComment, setMajComment] = useState({});

    console.log("log de mon comment de update");
    console.log(majComment);

    // Affichage action bouton update post
    const [oui, setOui] = useState(false);


    const [msgButton, setMsgButton] = useState("Voir les commentaires");

 
    // récuperation du status admin dans le token
    var token = JSON.parse(localStorage.getItem('token'));
    var decoded = jwt_decode(token);



    const onClickUpdate = (e) => {
        e.preventDefault();
        setOui(true)
    }




    const addLike = (post) =>{
        axios.post(`http://localhost:3000/api/post/${post.id}/likes`,{"like" : 1},
        {
            headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "application/json; charset=utf-8" },
        })
       .then((response) => {
           console.log(response);
           window.location.reload();
       })
        .catch(function (error) {
            // handle error
            console.log(error);
            
        });    

    }



    const decrementLike = (post) =>{
        
        axios.post(`http://localhost:3000/api/post/${post.id}/likes`,{"like" : 0},
        {
            headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "application/json; charset=utf-8" },
        })
       .then((response) => {
           console.log(response);
           window.location.reload();
       })
        .catch(function (error) {
            // handle error
            console.log(error);
            
        });    

    }

    const changeHandlerUpdate = e => {
        e.preventDefault();
        setMajComment(e.target.value);
    };






 

    const updatePost = (post) => {
        if (majComment !==  null && majComment !== undefined && majComment != "[object Object]") {

            const formData = new FormData();
            formData.append('content', majComment);
            console.log("log de majComment");
            console.log(majComment);
            axios.patch(`http://localhost:3000/api/post/${post}/`,formData,
            {
                headers: { 'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('token')), "Content-Type": "multipart/form-data"  },
            })
            .then((response) => {
                console.log(response);
                window.location.reload();

            })
            .catch(function (error) {
                // handle error
                console.log(error);

            });
        }
        

    }






    




    const changeHandlerCmt = e => {
        setComment(e.target.value);
    };
    
    // post comment onclick
    const onClick = (e,id_post) => {
       

            if (comment) {
                e.preventDefault();
                const formData = new FormData();
                formData.append('comment',comment);
    
                axios.post(`http://localhost:3000/api/post/${id_post}`,formData,
                {
                    headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "application/json; charset=utf-8" },
                })
                .then(function (response) {
                    console.log(response);
                    

                })
                .catch(function (error) {
                    console.log(error);
                    window.location.href = "http://localhost:8000/";
                    localStorage.clear();
                });
                let commentInput = document.getElementById('comment');
                commentInput.value = '';
             }
    }


     
    
    let result = JSON.parse(localStorage.getItem('token'));
    console.log("log de result");
    console.log(result);





    // get comment 
    function getCommentClick(post){

        if(post.clickControl == false || post.clickControl == undefined){
            axios.get(`http://localhost:3000/api/post/comment/${post.id}`)
           .then(response => {
                              
               // DONE retrouver l'objet post avec un find
               let indexPost =  data.map(function (e){return e.id}).indexOf(post.id);               
               // DONE : pour les commentaires du post => CHANGER LE status du clickcontrol de l'objet post. (le passer à true)
               post.clickControl = true;
               // DONE attacher la liste des commentaire à l'objet post 
               post.lstComments = response.data
               // refresh le state (setData)
                let newlist = [...data];
               // let updateitem = post;
                newlist[indexPost] = post;
              
                setData(newlist)
                setMsgButton("Cacher les commentaires");
              

           })
            .catch(function (error) {
                // handle error
                console.log(error);
                
            });    
        }else{
            let indexPost =  data.map(function (e){return e.id}).indexOf(post.id);

               
               // DONE : pour les commentaires du post => CHANGER LE status du clickcontrol de l'objet post. (le passer à false)
               post.clickControl = false;

               // DONE attacher la liste des commentaire à l'objet post 
                let newlist = [...data];
               // let updateitem = post;
                newlist[indexPost] = post;
              
                setData(newlist)
                setMsgButton("Voir les commenataires");
            //post.clickControl = false;

        }
    }





    // Delete Comment onClick
    function deleteComment(commentId,postId){
        axios.delete(`http://localhost:3000/api/post/comment/${commentId}`,
        {
            headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
        })
       .then((response) => {
            // DONE retrouver l'objet post avec un find
            let indexPost =  data.map(function (e){return e.id}).indexOf(postId);   

            // DONE : pour les commentaires du post => CHANGER LE status du clickcontrol de l'objet post. (le passer à true)
            //je recupere l'index du comment
            let indexComment = data[indexPost].lstComments.map(function (e){return e.id}).indexOf(commentId);  
          
            // refresh le state (setData)
             let newlist = [...data];
            // let updateitem = post;
            newlist[indexPost].lstComments.splice(indexComment,1);
            
           
             setData(newlist);
        

       })
        .catch(function (error) {
            // handle error
            console.log(error);
            
        });    


    }

   

    // delete Post OnClick
    function deletePost(post){
        axios.delete(`http://localhost:3000/api/post/${post.id}`,
        {
            headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
        })
       .then((response) => {
           console.log(response);
           window.location.reload();
        

       })
        .catch(function (error) {
            // handle error
            console.log(error);
            
        });    


    


}return (
        <div className='DisplayAllTweet'>
           
        {data.map(item =>(
                <div className='flex-block' key={item.id}>
                    <div className='container-content'>
                    
                        {decoded.userId == item.userUserId ?<i className="fa-solid fa-wrench" onClick={onClickUpdate}></i>  : null}

                        <div className='container-trash'> 
                            <img className='profil-picture'  src={item.user.profilPicture} alt="profil picture " width={80}/>
                         {decoded.userId == item.userUserId || decoded.isAdmin == 1 ?   <i className="fa-solid fa-trash" onClick={() => deletePost(item)} ></i> : null }    
                        </div>
                           
                        <div className='container-username-content'>
                             <span className='username'><b>{item.user.username}</b></span>
                            {oui ? <div>
                                        <textarea  cols="30" rows="10"   onChange={changeHandlerUpdate} >{item.content}</textarea>
                                        <input type="submit" onClick={()=> updatePost(item.id)} value="envoyer"/>
                                   </div> :   <p>{item.content}</p>} 
                              
                        </div>
                       
                    </div>
                    <div className='container-attachment'>

                       {!item.attachment ?  <div></div> : <img className='attachment' src={item.attachment} alt="picture tweet posted by user" />}
                       
                       <div>
                            <i className="fa-solid fa-thumbs-up" onClick={()=>addLike(item)}></i> <span>{item.like}</span> <i className="fa-regular fa-thumbs-down" onClick={()=>decrementLike(item)} ></i>
                       </div>
                       

                       <span  className='comment'> <b>Écrire un commentaire</b></span>
                       
                       <form>
                            <input type="text" name="comment" id="comment"  placeholder='Écrire un commentaire 😁' onChange={changeHandlerCmt} />
                            <input type="button" value="Envoyer commentaire" onClick={(e) => onClick(e, item.id)} />
                       </form> 
                       <div className='commentAlert'></div>
                        
                        <input type="button" value={msgButton} onClick={() => getCommentClick(item)} />

                        <div>
                          {item.clickControl ? item.lstComments.map(comment => (
                              <div className='container-comment'>
                                  <span>{comment.user.username}</span>
                                  <p key={comment.id}>  {comment.comment}  </p>
                                  {decoded.userId == comment.userUserId || decoded.isAdmin == 1 ? <i className="fa-solid fa-trash " onClick={() => deleteComment(comment.id,item.id)}/> : null} 
                                  
                              </div>
                             
                          )) : null}
                      </div>
        

                    </div>
                    
                </div>

        ))}
           
           
           
           
           
        </div>
    );








};

export default DisplayAllTweet;





              


    