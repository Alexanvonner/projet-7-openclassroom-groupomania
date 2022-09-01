import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import '../styles/components/PostTweet.css';


// récuperer le token dans le localStorage
let jwt =localStorage.getItem('token')
if (jwt) {
    var removeQuotationMarkToken= jwt.slice(1, -1,);
    console.log(removeQuotationMarkToken);

}



const PostTweet = ({ data, setData }) => {
    // useState content 
    const [allValues, setAllValues] = useState({});
    const [getMe , setGetMe] = useState([]);
     // useState attachment
    const [content, setContent] = useState('');

    const changeHandlerTxt = e => {
       
        setContent(e.target.value);
    };
    
 
    const changeHandler = e => {
       
        setAllValues(e.target.files[0])
    };
   

    const onClick = (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('content',content);
        formData.append('image',allValues);
        if (content) {
            axios.post('http://localhost:3000/api/post',formData,
            {
                headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
            })
            .then(function (response) {
                //handle success
                
                console.log(response);
                window.location.reload()  

            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
        }
    }

    useEffect(() => {
         //get profil picture 
          axios.get('http://localhost:3000/api/auth/me',
          {
               headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
          }).then(function (response) {
               console.log(response);
               setGetMe(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        },[])











   
    





    return (
        <div>
        <h1>Home</h1>
        <div id='publication-post'>
            <img id='logo' src={getMe.profilPicture} alt="profil picture user" />
            <form>
                <div id='textarea-flex'>
                    <textarea id='input-post' type="text" placeholder="What's Happening !" name='content' onChange={changeHandlerTxt} />
                    <label htmlFor="upload-photo"><i className="fa-solid fa-image"></i></label>
                    <input type="file" name="photo" id="upload-photo" name='image' onChange={changeHandler} />    
                </div>
                <input id='btn-tweet' type="submit" value="TWEET" onClick={onClick} />
            </form>
        </div>
    </div>
    );
};

export default PostTweet;