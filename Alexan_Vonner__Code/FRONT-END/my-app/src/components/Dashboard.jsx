import React from 'react';
import '../styles/components/Dashboard.css'
import axios from 'axios';
import { useState , useEffect} from 'react';
import swal from 'sweetalert';


const Dashboard = () => {

    const [data , setData] = useState([]);
    const [bio , setBio] = useState([]);
    const [picture, setPicture] = useState({})

      useEffect(() => {
        axios.get('http://localhost:3000/api/auth/me', {
            headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
          })
          .then(function (response) {
            console.log(response);
            setData(response.data) 
    
          })
          .catch(function (error) {
            console.log(error);
          });
        

      },[])

  

    const onDelete = (e) => {
      swal("Souhaitez vous vraiment supprimer votre compte ? ", {
        buttons: {
          value: "Non !",
          catch: {
            text: "Oui ! ",
            value: "oui",
          },
          defeat: false,
        },
      })
      .then((value) => {
        switch (value) {
          case "oui":
            swal("delete account", "Votre compte à bien été supprimé de notre base de donnée", "success");
            e.preventDefault();
            axios.delete('http://localhost:3000/api/auth/me', {
                headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
              })
              .then(function (response) {
                console.log(response);
                setData(response.data);
                window.location.href = "http://localhost:8000/";
              })
              .catch(function (error) {
                console.log(error);
              });
            break;
       
          default:
            swal("Votre compte reste en sécurité 🙂 !");
        }
      });

    };
   

    const changeHandlerBio = (e) => {
      setBio(e.target.value);
    };

    const changeHandlerProfilePicture = (e) => {
      setPicture(e.target.files[0])

    };
    console.log("log de picture");
    console.log(picture);

    const updateBio = (e) => {
      e.preventDefault()
        const formData = new FormData();
        formData.append('bio', bio);

      axios.patch('http://localhost:3000/api/auth/me', formData ,
      {
        headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
      })
      .then(function (response) {
        console.log(response);
        window.location.reload();
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    const updateProfilPicture = (e) => {
      e.preventDefault();
     
        const formData = new FormData();
        formData.append('image', picture);
        axios.patch('http://localhost:3000/api/auth/me', formData ,
        {
          headers: { 'Authorization': 'Bearer '+ JSON.parse(localStorage.getItem('token')),"Content-Type": "multipart/form-data" },
        })
        .then(function (response) {
          console.log(response);
          window.location.reload();
        })
        .catch(function (error) {
          console.log(error);
        });
        
      
    }





    return (
        <div>
            <h1>Dashboard</h1>

            <div>
                <img src={data.profilPicture} alt="profil picture"  width={100} />
                
                <label>
                    <form>
                      <input type="file" hidden onChange={changeHandlerProfilePicture}/>
                      <i class="fas fa-upload"></i>
                      <input type="submit" onClick={updateProfilPicture} />
                    </form>
                 </label> 
            </div>

            <h2>Bonjour {data.username}</h2>

            <div className='container-info-user'>
               <p>Status : {data.isAdmin == 1 ? "ADMIN" : "TWEETOS"} </p>
            </div>
           
            {!data.bio ? "Votre biographie est actuellement vide " : "BIOGRAPHIE :   " + data.bio}
         

            <form >
              <label htmlFor="bio">Mettre à jour votre Bio !</label>
               <textarea type="text" id='bio' placeholder='Veuillez écrire votre Bio 😎' onChange={changeHandlerBio}/>
               <input type="submit" onClick={updateBio}/>
            </form>

            <input type="submit" id='deleteAccount' value="Supprimer sont compte " onClick={onDelete}></input>




        </div>
    );
};

export default Dashboard;


