import './index.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Button/Button';
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const DynamicForm = (props) => {

  const { inputFields, handleSubmit, showForgotPassword, showPrivacyPolicy, buttonText, showLogin, backgroundColor, color } = props;

 const [formData, setFormData] = useState({});
 const [visible, setVisible] = useState(false);

 const handleChange = (e) => {
   const { name, value } = e.target;
   setFormData({ ...formData, [name]: value });
 };

 const onSubmit = (e) => {
   e.preventDefault();
   handleSubmit(formData); // Pass the form data to the submit function
 };

 return (
   <form className='form' onSubmit={onSubmit}>
     {inputFields.map((field) => (
       <div key={field.name} className='form__input-wrapper'>
         {field.type === 'textarea' ? (
           <textarea
             className='textarea'
             name={field.name}
             required={field.required}
             value={formData[field.name] || ''}
             onChange={handleChange}
             placeholder={field.placeholder}
             onFocus={(e) => e.target.placeholder = ''}
             onBlur={(e) => e.target.placeholder = field.placeholder}
           />
         ) : (
           <input
             type={field.type === 'password' && visible ? 'text' : field.type} 
             name={field.name}
             required={field.required}
             value={formData[field.name] || ''}
             onChange={handleChange}
             placeholder={field.placeholder}
             onFocus={(e) => e.target.placeholder = ''}
             onBlur={(e) => e.target.placeholder = field.placeholder}
           />
         )}
         {field.showEye && (
           visible ? (
             <AiOutlineEye
               className="form__password-eye"
               onClick={() => setVisible(false)}
             />
           ) : (
             <AiOutlineEyeInvisible
               className="form__password-eye"
               onClick={() => setVisible(true)}
             />
           )
         )}
       </div>
     ))}

     {showForgotPassword && (
       <p className="forgot-password">
         <Link to="/reset-password" className="forgot-password-link">Forgot Your Password?</Link>
       </p>
     )}

     {showPrivacyPolicy && (
       <div className='privacy-policy'>
         <Link className='privacy-policy-link' to="/privacy-policy">Privacy Policy</Link>
       </div>
     )}

     {showLogin && (
       <p className="forgot-password">
         <Link to="/login" className="forgot-password-link">Log in</Link>
       </p>
     )}

     <Button onClick={onSubmit} type='submit' text={buttonText} marginTop={'3rem'} backgroundColor={backgroundColor} color={color} />
   </form>
 );
}

export default DynamicForm;
