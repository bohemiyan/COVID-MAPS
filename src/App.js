import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/navbar';
import SideNavbar from './components/navbar/sidenav';
import ContactForm from './components/contacts/contactForm/ContactForm';
import ContactDetails from './components/contacts/contactDetails/contactDetails';
import ContactEditForm from './components/contacts/contactForm/ContactEditForm';
import Chart from './components/chart/Chart';
import CovidMap from './components/chart/CovidMap';
import LineGraph from './components/chart/LineGraph';

const App = () => {
  return (
    <>
    <Navbar name="navbar" />
    
    <div className="App">
    <SideNavbar />
      <div className='resultbox'>
      <Routes>
          <Route path="/" element={<ContactDetails />} />
          <Route path='/add' element={<ContactForm/>}/>
          <Route path='/edit/:id' element={<ContactEditForm/>}/>
          <Route path='/GRAPH' element={<LineGraph/>}/>
          <Route path='/MAP' element={<CovidMap/>}/>
          {/* Add your other routes here */}
        </Routes>
      </div>
    </div>
   
    </>
  );
};

export default App;
