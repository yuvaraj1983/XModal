import logo from './logo.svg';
import './App.css';
import { Button } from "@mui/material"
import { useState } from 'react';
import Modal from "react-modal";

import styles from "./styles.css"
Modal.setAppElement("#root");


function App() {

  const [modalIsOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phonenumber:'',
    dob:''
  })
  const customStyles ={
    content: {
     width: '40%',
     height:"55%",
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#EFEFEF',
        borderRadius: '15px'
    }}

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const formdob = new Date(formData.dob);
    const currentDate = new Date();
    console.log(formdob);
    console.log(currentDate);
    if(formData.phonenumber && formData.phonenumber.length<10) {
      alert('Invalid phone number. Please enter a 10-digit phone number');
      return;
    }
    else if(formdob>currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    setFormData({
      username: '',
      email: '',
      phonenumber:'',
      dob:''
    })

  }

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prevValue) => ({ ...prevValue, [name]: e.target.value}))
  }

  return (
    <>
   
    <div className="modal">
     <h1>User Details Modal</h1>
     <Button variant='contained' onClick={openModal}>Open Form</Button>
    <div className="modal-content">
    <Modal
    
style={customStyles}
isOpen={modalIsOpen}

onRequestClose={closeModal}

contentLabel="Example Modal"
    >
    
      <form onSubmit={handleSubmit}>
      <h2 style={{textAlign:'center'}}>Fill Details</h2>
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
          <label >Username:</label> 
          <input type='text' name='username' value={formData.username} required style={{width:'100%'}} 
          onChange={handleChange}
          />
          <label>Email Address:</label>
          <input type='email' name='email' value={formData.email}  required style={{width:'100%'}}  onChange={handleChange}/>
          <label>Phone Number:</label>
          <input type='number' name='phonenumber' value={formData.phonenumber}  required style={{width:'100%'}}  onChange={handleChange}/>
          <label>Date of Birth:</label>
          <input type='date' name='dob' value={formData.dob}  required style={{width:'100%'}}  onChange={handleChange}/>
          <Button type='submit' sx={{margin:'10px'}} variant='contained'>Submit</Button>
        </div>
      </form>
    </Modal>
    </div>
    </div>
   
    </>
  );
}

export default App;
