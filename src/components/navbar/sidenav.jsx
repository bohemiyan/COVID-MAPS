import React from 'react';
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import logo from './logo.png'

const SideNavbar = () => {
  const navigate=useNavigate();

  const handleContact=()=>{
navigate('/')
  }

  return (
    <div className='sidenav'>
      <div className='logocontainer'>
      <img src={logo} alt="Logo" style={{width:'40%'}}/>
      </div>
      <div className='buttoncontainer'>
        <button className='sidebutton' onClick={handleContact}>
          CONTACT
        </button>
        <button className='sidebutton'  onClick={(e)=>{navigate('/GRAPH')}}>
          GRAPH
        </button>
        <button className='sidebutton'  onClick={(e)=>{navigate('/MAP')}}>
          MAP 
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
