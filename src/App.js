import logo from './logo.svg';
import './App.css';
import { Button } from "@mui/material"
import { useEffect, useRef, useState } from 'react';


import styles from "./styles.css"
// Modal.setAppElement("#root");


function App() {

  const [isOpen, setIsOpen] = useState(false);
  const modalRef = useRef();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [formError, setFormError] = useState(false);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone:'',
    dob:''
  })
 

  function openModal() {
    setIsOpen(true);
    document.body.classList.add('modal-open')
  }

  function closeModal() {
    setIsOpen(false);
    document.body.classList.remove("modal-open");
  }

  // checks if email is valid
function isEmail(email) {
  const regx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  return regx.test(email);
}

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    const formdob = new Date(dob);
    const currentDate = new Date();
    console.log(formdob);
    console.log(currentDate);
    // const invalidEmail = !isEmail(formData.email);
    // console.log("invalidEmail", invalidEmail)
    if(username.trim() === '') {
      setFormError(true);
      return;
    }
    if (!email.includes("@")) {
      setError(
        `Please include an '@' in the email address. ${email} is missing an '@'.`
      );
      return;
    }
    if(phone && phone.length!==10) {
      alert('Invalid phone number. Please enter a 10-digit phone number');
      return;
    }
    else if(formdob>currentDate) {
      alert('Invalid date of birth. Date of birth cannot be in the future.');
      return;
    }

    setUsername("");
    setEmail("");
    setDob("");
    setPhone("");
    setError(null);
    setIsOpen(false);

  }

  const handleChange = (e) => {
    const name = e.target.name;
    setFormData((prevValue) => ({ ...prevValue, [name]: e.target.value}))
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if(modalRef.current && !modalRef.current.contains(e.target)) {
          closeModal();
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick)
    }
  })

  return (

   
    <div className="modal">
     <h1>User Details Modal</h1>
     <button style={{backgroundColor:"blue", color:'white', borderRadius:'5px', padding:'10px', border:'0px'}} onClick={openModal}>Open Form</button>
        
        { isOpen && 
          <div className="modal modal-content" ref={modalRef}>
          <h2 style={{textAlign:'center'}}>Fill Details</h2>
          
            <form onSubmit={handleSubmit}>
          
              <div >
                <label htmlFor='username' >Username:</label> 
                <input type='text' id='username' name='username' value={username} required 
                onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='email'>Email Address:</label>
                <input type='email' id='email' name='email' value={email} onChange={(e) => setEmail(e.target.value)}/>
                {error && error.includes("email") && 
                (<p>{error}</p>)
                }
                <label htmlFor='phone'>Phone Number:</label>
                <input type='tel' id='phone' name='phone' value={phone} 
                  onChange={(e) => setPhone(e.target.value)} />
                <label>Date of Birth:</label>
                <input type='date' id='dob' name='dob' value={dob}  onChange={(e) => setDob(e.target.value)}/>
                <button className='submit-button' onClick={handleSubmit} type='submit' >Submit</button>
              </div>
            </form>
         
          </div>
        }
    </div>
   
   
  );
}

export default App;
