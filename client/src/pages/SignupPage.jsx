import DynamicForm from "../components/DynamicForm/DynamicForm";
import { UserAuth } from "../context/AuthContext";
import { useNavigate, Link } from 'react-router-dom';
import ReturnArrow from "../components/ReturnArrow/ReturnArrow";

const SignupPage = () => {

    const { createUser, showSnackbar } = UserAuth();


    const inputFields = [
        { name: 'name', type: 'name', placeholder: 'Your Name', required: true },
        { name: 'email', type: 'email', placeholder: 'Email', required: true },
        { name: 'password', type: 'password', placeholder: 'Password', required: true, showEye: true  },       
    ];

    const handleCreateUserWithEmail = async (formData) => {

        console.log(formData)
        try{
            const { email, password, name } = formData;
            await createUser(email, password, name);
            showSnackbar( 'Account created successfully. Please log in.' , 'success' );
           
        } catch (error) {      
            console.log(error.message);
            showSnackbar( 'Failed to create an account.' , 'error' );
        }
        
    }

    return (
        <main className="authorization">

            <ReturnArrow to="/login" />


            <section className="authorization__container">
                <h4>New User</h4>
                <DynamicForm 
                    inputFields={inputFields} 
                    handleSubmit={handleCreateUserWithEmail}  
                    buttonText='Sign Up' 
                    showPrivacyPolicy={true}
                />
            </section>

            <div className='authorization__redirect signup'>
                <p>Already have any account?</p>
                <Link className='redirect-link' to="/login">Sign In</Link>
            </div>
            
        </main>
    )
}

export default SignupPage