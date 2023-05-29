import { configureStore, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  contacts: [],
};

const contactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    addContact: (state, action) => {
      state.contacts.push(action.payload);
    },
    editContact: (state, action) => {
      const { id, firstName, lastName,phone,email,isActive } = action.payload;
      const contact = state.contacts.find((c) => c.id == id);
      if (contact) {
        contact.firstName = firstName;
        contact.lastName = lastName;
        contact.phone = phone;
        contact.email = email;
        contact.isActive = isActive;
      }
    },
    deleteContact: (state, action) => {
      const id = action.payload;
      state.contacts = state.contacts.filter((contact) => contact.id !== id);
    },
  },
});

export const { addContact, editContact, deleteContact } = contactSlice.actions;

export default configureStore({
  reducer: {
    contacts: contactSlice.reducer,
  },
});
