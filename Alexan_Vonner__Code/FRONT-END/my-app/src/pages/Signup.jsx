import React from 'react';
import logo from '../assets/groupomania-logo.png'
import Signups from '../components/Signup';
import '../styles/Signup.css'


const Signup = () => {
    
    return (
        <div>
            <img  className='logo-groupomania' src={logo} alt="logo groupomania"/>
            <Signups/>
        </div>
    );
};

export default Signup;