import React from 'react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../styles/components/PasswordReset.css';
import axios from 'axios';

const PasswordReset = () => {
    
    const query = new URLSearchParams(window.location.search)
    let tokenMdp = query.get('token');
    let idUser = query.get('id');
    console.log(tokenMdp);
    console.log(idUser);


    const [allValues, setAllValues] = useState({
        password: '',
        password2: '',
     });


    let regexPassword = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    let errorRegex = document.getElementById('error-regex');
    
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
     }



    // mettre le ELSE par rapport a la reponse de l'api et non pas comme c'est actuellement
    const logValue = (e) => {
        e.preventDefault()
        console.log(allValues);
        if (allValues.password !== allValues.password2) {
            errorRegex.innerHTML = `<span>Attention vos mots de passe ne sont pas identiques ! </span>`;
            errorRegex.style.color = "red"
        }else{

            axios.post(`http://localhost:3000/api/auth/reset-password/${idUser}/${tokenMdp}`, {
                password: allValues.password ,
            })
            .then(function (response) {
                console.log(response);
                if (response) {
                    errorRegex.innerHTML = `<b>Mot de passe mis à jour ! </b> <i class="fa-solid fa-check"></i>`;
                    errorRegex.style.color = "white"
                }
            })
            .catch(function (error) {
                console.log(error);
                if (error) {
                    errorRegex.innerHTML = `<b>Erreur de communication avec le seveur </b> <i class="fa-solid fa-check"></i>`;
                    errorRegex.style.color = "red"
                }
            });

        }

        
    
    }
     
    return (

            <div id='card'>
            <h1>Mot de passe oublié ? <span><i className="fa-solid fa-key"></i></span></h1>
            <form>
                <label htmlFor="email"><b>Mot de passe</b></label>
                <input type="password" placeholder="Password" name='password' onChange={changeHandler} />
                <label htmlFor="email"><b>Confirmation Mot de passe</b></label>
                <input type="password" placeholder="Password" name='password2' onChange={changeHandler} />

                <span id='error-regex'></span>
                <input type="submit"  onClick={logValue} value="Valider"/>
            </form> 
            <NavLink exact to="/">Login</NavLink>

        </div>
       
    );
};

export default PasswordReset;