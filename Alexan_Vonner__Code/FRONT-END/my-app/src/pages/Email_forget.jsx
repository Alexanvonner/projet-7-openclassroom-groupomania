import React from 'react';
import ForgetEmail from '../components/ForgetEmail';
import '../styles/ForgetEmail.css';
import PasswordReset from '../components/PasswordReset';
import {useEffect} from 'react';
//import {useSearchParams} from 'react-dom';

const Email_forget = () => {

    const query = new URLSearchParams(window.location.search)
    let tokenMdp = query.get('token');
    let iduser = query.get('id');
    console.log("token :"+tokenMdp);
    console.log("userid :"+iduser);
    

    // useEffect(() =>{
        

    // },[])


    return (
        <div className='email_forget'>
 
            {!tokenMdp && !iduser ? <ForgetEmail/> : <PasswordReset/> } 
        </div>
    );
};

export default Email_forget;