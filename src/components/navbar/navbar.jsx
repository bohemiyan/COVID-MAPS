import React,{useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import './navbar.css';


const Navbar = () => {
  const [header, setheader] = useState("Contacts")

     //code to get id from url
     const location = useLocation();
     const loc = location.pathname.split("/")[1];
      // console.log(loc)


      useEffect(() => {
        if(loc )
        {
        setheader(loc)}
        else
        setheader("Contacts")
      }, [loc])
      
  
  return (
    <div className='upperNav'>
      <h1> {header}</h1>
    </div>
  );
};

export default Navbar;
