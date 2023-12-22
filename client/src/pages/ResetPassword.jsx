import { useState } from 'react';
import { UserAuth } from "../context/AuthContext";
import ReturnArrow from '../components/ReturnArrow/ReturnArrow';
import DynamicForm from '../components/DynamicForm/DynamicForm';

const ResetPassword = () => {

    const inputFields = [
        { name: 'email', type: 'email', placeholder: 'Email Address', required: true },      
    ];

    const { resetPassword, showSnackbar } = UserAuth();


    const handleResetPassword = async (e) => { 
        e.preventDefault();

       try {
            const { email  } = formData;
            await resetPassword(email); 
            showSnackbar( 'Check your email inbox for instructions' , 'success' );
                  
        } catch (error) {
            console.log(error)
            showSnackbar( 'Faild to reset password' , 'error' );
       }
    }


    return (
        <main className='authorization'>

            <ReturnArrow to="/" />

            <section className="authorization__container">
                <div className="authorization__form-wrapper">
                    <h4>Reset Password</h4>
                    <DynamicForm 
                        inputFields={inputFields} 
                        handleSubmit={handleResetPassword}  
                        buttonText='Reset' 
                        showLogin={true}
                    />
                </div>
            </section>
        </main>
    )
}


export default ResetPassword;