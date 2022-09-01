import React from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/Navigation.css'

const Navigation = () => {

    function disconnect () {
        localStorage.clear()
    }

    return (
        <div id='card'>
                <NavLink exact to='/dashboard'><i className="fa-solid fa-user"></i></NavLink>
                <NavLink exact to='/home'><i className="fas fa-home"></i></NavLink>
                <NavLink exact to='/'> <i className="fas fa-sign-out" onClick={disconnect}></i></NavLink>  
        </div>
    );
};

export default Navigation;