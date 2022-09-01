import React from 'react';
import '../styles/Login.css'
import logo from '../assets/groupomania-logo.png'
import Logins from '../components/Login';


const Login = () => {




    return (
        <div>
            <img  className='logo-groupomania' src={logo} alt="logo groupomania"/>
            <Logins/>
           



        </div>
    );
};

export default Login;