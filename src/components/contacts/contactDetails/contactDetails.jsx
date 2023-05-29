import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteContact } from '../../../redux/reduxStore';
import { useNavigate } from 'react-router-dom';
import "./contactDetails.css"

const Dashboard = () => {
  const [datas, setdatas] = useState();
  const contacts = useSelector((state) => state.contacts);

  useEffect(() => {
    // console.log(contacts.contacts)
    setdatas(contacts.contacts)
  }, []);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleEdit = (id) => {
  navigate(`./edit/${id}`);
  };

  const handleDelete = (id) => {
    const contact = datas.find((item) => item.id !== id);
    setdatas(contact);
    dispatch(deleteContact(id));
  };

  return (
    <div className='ContactDetails'>
      <div className='header'>
      <h2>Dashboard</h2>
        <button className='addcontactbtn' onClick={() => navigate('/add')}>
          ADD CONTACT
        </button>
      </div>
      <div className='cardsholder'>
      {datas && datas.length>0 ? (
        datas.map((contact) => (
          <div key={contact.id} className='contact-card'>
          <div className="contact-details">
            <h3 className="contact-name">
              {contact.firstName} {contact.lastName}
            </h3>
            <p className="contact-info">
              <span className="contact-label">Email:</span> {contact.email}
            </p>
            <p className="contact-info">
              <span className="contact-label">Phone:</span> {contact.phone}
            </p>
            <p className="contact-status">
              <span className="contact-label">Status:</span>{' '}
              {contact.isActive ? 'Active' : 'Inactive'}
            </p>
          </div>
          <div className="contact-actions">
            <button onClick={() => handleEdit(contact.id)}>Edit</button>
            <button onClick={() => handleDelete(contact.id)}>Delete</button>
          </div>
        </div>
        
        ))
      ) : (
        <p>No contacts found.</p>
      )}
      </div>
    </div>
  );
};

export default Dashboard;
