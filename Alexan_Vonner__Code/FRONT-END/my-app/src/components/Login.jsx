import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';


const Login = () => {

    const [allValues, setAllValues] = useState({
        email: '',
        password: '',
     });
    
    const changeHandler = e => {
        setAllValues({...allValues, [e.target.name]: e.target.value})

     }

    const logValue = (e) => {
        e.preventDefault()
        console.log(allValues);
       

   // AJOUTER LE CONTROLE EMAIL PASSWORD REGEX  //////////////////////////////////
   
            console.log(allValues);

            axios.post('http://localhost:3000/api/auth/login', {
                email: allValues.email ,
                password  : allValues.password
            })
            .then(function (response) {
                console.log(response);
                localStorage.setItem('token', JSON.stringify(response.data.token))
                window.location.href = "http://localhost:8000/home";
                
            })
            .catch(function (error) {
                console.log(error);
            });
        
            
        
    };
    

      






    return (
        <div className='login'>
                <form className='login-form'> 
                    <img className='login-picture' src='https://www.w3schools.com/howto/img_avatar2.png' alt='avatar login' width={200}/>
                    <h1>LOGIN</h1>
                    <div className='input-form'>
                       <label htmlFor='email'> <b>E-mail</b> </label>
                       <input id='email' name='email' placeholder='Entrer votre E-mail' onChange={changeHandler}/> 
                    </div>
                    <div className='input-form'>
                       <label htmlFor="password"><b>Password</b></label>
                       <input type="password" placeholder="Entrer votre Mot de Passe" name="password" onChange={changeHandler} required/>
                    </div>
                    <button type="submit" onClick={logValue}>Login</button>
                    <div className='navLink'>
                        <NavLink exact to="/signup">créer un compte</NavLink>
                        <NavLink className='forget-password' exact to="/reset-password">Lost password?</NavLink>
                    </div>
                    
                </form>
            
        </div>
                      
    );
};

export default Login;