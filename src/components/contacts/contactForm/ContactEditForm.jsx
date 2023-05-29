import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { editContact } from '../../../redux/reduxStore';
import './contactform.css';

const ContactEditForm = () => {
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [isActive, setIsActive] = useState(false);


  const location = useLocation();
  const Id = location.pathname.split('/')[2];


  const contacts = useSelector((state) => state.contacts.contacts);
  const navigate = useNavigate();

  useEffect(() => {
    const contact = contacts.find((item) => item.id == Id);
    if (contact) {
      // console.log(contact)
      setFirstName(contact.firstName);
      setLastName(contact.lastName);
      setEmail(contact.email);
      setPhone(contact.phone);
      setIsActive(contact.isActive);
      
    }
  }, [contacts]);

  const handleSubmit = async(e) => {
    e.preventDefault();
    const payload = {
      id: Id,
      firstName,
      lastName,
      phone,
      email,
      isActive
    };
    // console.log(payload)
    dispatch(editContact(payload));
    navigate('/');
  };

  return (
    <div>
      {contacts ? (
        <form className="form-container" onSubmit={handleSubmit}>
          <h2>Edit Contact</h2>
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
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
              />
            </label>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      ) : (
        <h6>Loading.....</h6>
      )}
    </div>
  );
};

export default ContactEditForm;
