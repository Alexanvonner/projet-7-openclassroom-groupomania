import React from 'react';
import Navigation from '../components/Navigation';
import PostTweet from '../components/PostTweet';
import DisplayAllTweet from '../components/DisplayAllTweet';
import '../styles/Home.css';
import { useState, useEffect} from 'react';
import axios from 'axios';




const Home = () => {


    const [data , setData] = useState([]);
    

    useEffect(() => {
        axios.get('http://localhost:3000/api/post/')
        .then(function (response) 
        {
           console.log(response.data);
           setData(response.data) 
        })
        .catch(function (error) {
           console.log(error);
        });
    },[])
  
    console.log("log de DATA")
    console.log(data);


    return (
        <div className='home'>
             <div id='block-left'>
                 <Navigation/>
             </div>
             
            <div id='block-middle'> 
             <PostTweet data={data} setData={setData}/>       
             <DisplayAllTweet data={data} setData={setData} />
            </div>




        <div id='block-right'></div>
            
        </div>
    );
};

export default Home;