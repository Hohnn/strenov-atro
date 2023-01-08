import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './EmailContactForm.scss';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
 
const EmailContactForm = () => {
    const toastOptions = {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        }
    const notify = () => toast.success('Email bien envoyé', toastOptions);
 const form = useRef();
 
 const sendEmail = (e) => {
   e.preventDefault();
   spinner.classList.remove('d-none')
    // prevents the page from reloading when you hit “Send”
   emailjs.sendForm(import.meta.env.PUBLIC_EMAILJS_SERVICE_ID, import.meta.env.PUBLIC_EMAILJS_TEMPLATE_ID, form.current, import.meta.env.PUBLIC_EMAILJS_PUBLIC_KEY)
     .then((result) => {
         // show the user a success message
         toast.success('Email bien envoyé', toastOptions);
         spinner.classList.add('d-none')
         resetForm()
         console.log('SUCCESS!', result.status, result.text);
     }, (error) => {
         // show the user an error
         toast.error('Veuillez ressayer plus tard', toastOptions);
         spinner.classList.add('d-none')
         console.log('FAILED...', error);
     });
 };

 function testMail(e) {
    e.preventDefault();
    console.log('SUCCESS!');
    notify()
    spinner.classList.remove('d-none')
 }

 function resetForm (){
    const inputName = document.getElementById('name')
    inputName.value = ''
    const inputEmail = document.getElementById('email')
    inputEmail.value = ''
    const inputMsg = document.getElementById('floatingTextarea2')
    inputMsg.value = ''
 }

 

 return (
  <>
   <form ref={form} onSubmit={sendEmail}>
        <div className="mb-3">
            <label htmlFor="name" className="form-label">Nom</label>
            <input type="text" id="name" name="name" className="form-control" placeholder="John Doe"/>
        </div>

        <div className="mb-3">
            <label htmlFor="email" className="form-label">Adresse email</label>
            <input type="email" className="form-control" id="email" name="email" placeholder="hello@example.com"/>
        </div>

        <div className="mb-3">
            <label htmlFor="floatingTextarea2" className="form-label">Message</label>
            <textarea name="message" className="form-control" placeholder="Votre message ici..." id="floatingTextarea2" style={{height: 100 + 'px'}}></textarea>
        </div>
        <div className='contact-btn'>
            <button type='submit' className='btn-action' >Envoyer</button>
            <div id='spinner' class="lds-ring d-none"><div></div><div></div><div></div><div></div></div>
        </div>
        
   </form>
   <ToastContainer />
   </>
 );
};
 
export default EmailContactForm;