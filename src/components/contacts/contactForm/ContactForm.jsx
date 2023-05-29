import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addContact } from '../../../redux/reduxStore';
import './contactform.css'
import { useNavigate } from 'react-router-dom';

let contactIdCounter = 0;
const ContactForm = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(false);

  const navigate=useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      id: contactIdCounter++,
      firstName,
      lastName,
      phone,
      email,
      isActive,
    };
    dispatch(addContact(newContact));
    setFirstName('');
    setLastName('');
    setIsActive(false);

    navigate('/')

  };

  return (
    <form className="form-container" onSubmit={handleSubmit}>
      <h2>Contact Form</h2>
      <div>
        <label>
          First Name:
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Last Name:
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
      </div>
      <div>
      <label>
          Phone:
          <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          />
          </label>
        </div>
        <div>
          <label>
            Email:
            <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
          </label>
        </div>
      <div>
        <label>
          Active:
          <input
            type="radio"
            value="active"
            checked={isActive}
            onChange={() => setIsActive(true)}
          />
        </label>
       
        <label>
          Inactive:
          <input
            type="radio"
            value="inactive"
            checked={!isActive}
            onChange={() => setIsActive(false)}
          />
        </label>
      </div>
      <button type="submit">Add Contact</button>
    </form>
  );
};

export default ContactForm;
