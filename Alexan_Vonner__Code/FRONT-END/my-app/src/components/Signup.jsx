import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Signup = () => {


    const [allValues, setAllValues] = useState({
        username: '',
        email: '',
        password: '',
        passwordConfirm : ''
     });
    
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})

     }




    const logValue = (e) => {
        e.preventDefault();

    
        let regexEmail =  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
        let regexUsername = /^[A-z0-9_-]{3,15}$/;

        let errorRegexMail = document.getElementById('errorRegexMail')
        let errorRegexPwd = document.getElementById('errorRegexPwd')
        let errorRegexUser = document.getElementById('errorRegexUser')
        let errorRegexUsername = document.getElementById('errorRegexUsername')




        if (!regexEmail.test(allValues.email)) {
            errorRegexMail.innerHTML = `Veuillez insérer un E-mail Valide !`;
            errorRegexMail.style.color = 'red'
        }else{
            errorRegexMail.innerHTML = ``;

            if (!regexUsername.test(allValues.username)) {
                errorRegexUsername.innerHTML = "Veuillez entrer un Nom d'utilisateur correct !";
                errorRegexUsername.style.color = 'red';
            }else{
                errorRegexUsername.innerHTML = "";
                if (allValues.password == allValues.passwordConfirm) {
                // if password is identical  clear field
                errorRegexPwd.innerHTML = ``;
    
                console.log(allValues);
    
                axios.post('http://localhost:3000/api/auth/signup', {
                    email: allValues.email ,
                    username: allValues.username ,
                    password  : allValues.password
                })
                .then(function (response) {
                    console.log(response);
                    errorRegexUser.innerHTML = `Compte utilisateur crée`;
                    errorRegexUser.style.color = 'white';
                })
                .catch(function (error) {
                    console.log(error);
                    errorRegexUser.innerHTML = `Erreur de communication avec le serveur 😭`;
                    errorRegexUser.style.color = 'red';
                    if (error.message == "Request failed with status code 409") {
                        errorRegexUser.innerHTML = `Cet e-mail possède déjà un compte utilisateur`;
                        errorRegexUser.style.color = 'red';
                    }
                    console.log(error.message);
                    if (error.message == "Request failed with status code 400") {
                        errorRegexUser.innerHTML = ``;
                        errorRegexPwd.innerHTML = "Le mot de passe doit contenir une lettre <b>  Majuscule</b> , un caractère <b>Spécial </b> , un <b> Chiffre</b> <br> ex: Azerty11yy!";
                        errorRegexPwd.style.color = 'red';
                        
                    }
                });
            }else{
                errorRegexPwd.innerHTML = `  Vos mots de passe ne sont pas identiques`;
                errorRegexPwd.style.color = 'red';
                
            }

        }
     }




            

       
    
    };
    

      



    return (
        <div className='login'>
        <form className='login-form'> 
            <img className='login-picture' src='https://www.w3schools.com/howto/img_avatar2.png' alt='avatar login' width={200}/>
            <h1>SIGNUP</h1>
            <div className='input-form'>
               <label htmlFor='email'> <b>E-mail</b> </label>
               <input id='email' className='field-email' name='email' placeholder='Entrer votre E-mail' onChange={changeHandler} /> 
            </div>
            <div className='input-form'>
               <label htmlFor='username'> <b>Prénom</b> </label>
               <input type="text" name='username' placeholder='Prénom' onChange={changeHandler}/> 
            </div>
            <div className='input-form'>
               <label htmlFor="password"><b>Password</b></label>
               <input type="password" placeholder="Entrer votre Mot de Passe" name="password" autoComplete="on" onChange={changeHandler}/>
            </div>
            <div className='input-form'>
               <label htmlFor="passwordConfirm"><b>Confirm Password</b></label>
               <input type="password" placeholder="Entrer votre Mot de Passe" name="passwordConfirm" autoComplete="on" onChange={changeHandler}/>
            </div>
            <span id='errorRegexMail'></span>
            <span id='errorRegexPwd'></span>
            <span id='errorRegexUser'></span>
            <span id='errorRegexUsername'></span>


            <button type="submit" onClick={logValue} >Login</button>
            <div className='navLink'>
                <NavLink id='navlinkLogin' exact to="/">Login</NavLink>
                <NavLink className='forget-password' exact to="/reset-password">Lost password?</NavLink>
            </div>
            
        </form>
</div>
    );
};

export default Signup;