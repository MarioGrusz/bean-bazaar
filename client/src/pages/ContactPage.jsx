import DynamicForm from "../components/DynamicForm/DynamicForm";
import ReturnArrow from "../components/ReturnArrow/ReturnArrow";
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from "react-router-dom";
import { receiveUserEmail } from "../api/apiEmail";

const ContactPage = () => {

  const { showSnackbar } = UserAuth();
  const navigate = useNavigate();
 

  const inputFields = [
    { name: 'name', type: 'text', placeholder: 'Your name', required: true},
    { name: 'email', type: 'text', placeholder: 'Your email', required: true},
    { name: 'message', type: 'textarea', placeholder: 'Your message', required: true },
      
  ];

  const handlePasswordReset = async (formData) => {

    try{
      const { name, email, message } = formData;
      await receiveUserEmail(name, email, message);
      showSnackbar( 'Go to your mailbox' , 'success' );
      navigate('/login');

    } catch (error) {
      console.log(error.message);
      showSnackbar( 'Fail to reset password' , 'error' );
    }
    
}
  

  return (

    <>
    <header className="contact-form__return-arrow-container">
        <ReturnArrow to='/' />            
    </header>

    <main className='contact-form'>           

      <div className='contact-form__left-side'>
          <h1 className='contact-form__header'>Hey!</h1>
          <p className='contact-form__paragraph'>
            Have a question for us? Fill out the form and we'll get back to you as soon as possible.
          </p>
      </div>

      <div className='contact-form__right-side'>
            <DynamicForm 
                inputFields={inputFields}  
                buttonText='Send an email' 
                handleSubmit={handlePasswordReset} 
            />
      </div>
    </main>
    </>
    )
}

export default ContactPage