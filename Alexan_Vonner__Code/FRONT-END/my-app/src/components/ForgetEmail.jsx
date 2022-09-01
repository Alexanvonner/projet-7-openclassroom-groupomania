import React from 'react';
import '../styles/components/forgetEmail.css';
import { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';


const ForgetEmail = () => {
    const [allValues, setAllValues] = useState({
        email: '',
     });
    
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})
     }

    let errorRegex = document.getElementById('error-regex');

     
    const logValue = (e) => {
        e.preventDefault()
        console.log(allValues);
        
        let regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

        if (regex.test(allValues.email)) {
            errorRegex.innerHTML = `<b>E-mail de récupération Envoyé ! </b> <i class="fa-solid fa-check"></i>`;
            errorRegex.style.color = "white";
            axios.post('http://localhost:3000/api/auth/reset-password', {
                email: allValues.email ,
            })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                errorRegex.innerHTML = `<b>E-mail inconnu dans notre base de données ! </b> <i class="fa-solid fa-triangle-exclamation"></i> `;
                errorRegex.style.color = "red";
            });
        }else{
            console.log("email invalid");
            errorRegex.innerHTML = `<b>Veuillez insérer un e-mail valide </b> <i class="fa-solid fa-triangle-exclamation"></i> `;
            errorRegex.style.color = "red";
        }

    }


    return (
        <div id='card'>
            <h1>Mot de passe oublié ? <i className="fa-solid fa-key"></i></h1>
            <form>
                <label htmlFor="email"><b>E-mail</b></label>
                <input type="text" placeholder="Veuillez saisir votre E-mail" name='email' onChange={changeHandler} />
                <span id='error-regex'></span>
                <input type="submit"  onClick={logValue}/>
            </form> 
            <NavLink exact to="/">Login</NavLink>
        </div>
    );
};

export default ForgetEmail;