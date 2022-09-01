import React from 'react';
import Navigation from '../components/Navigation';
import Dashboard from '../components/Dashboard';

import '../styles/Dashboard.css';

const dashboard = () => {
    return (
        <div className='home'>
             <div id='block-left'>
                 <Navigation/>
             </div>
             
            <div id='block-middle'> 
                <Dashboard/>
            </div>




        <div id='block-right'></div>
            
        </div>
   
    );
};

export default dashboard;