import DynamicForm from '../components/DynamicForm/DynamicForm';
import { UserAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import Button from '../components/Button/Button';
import ReturnArrow from '../components/ReturnArrow/ReturnArrow';


const LoginPage = () => {

    const { googleSignIn, signIn, showSnackbar } = UserAuth();
    const navigate = useNavigate();


    const inputFields = [
        { name: 'email', type: 'email', placeholder: 'Email address', required: true, showEye: false },
        { name: 'password', type: 'password', placeholder: 'Password', required: true, showEye: true },
        
    ];

    const handleSubmitwithEmail = async (formData) => {
        try{
            const { email, password } = formData;
            await signIn(email, password);
            showSnackbar( 'Logged in successfully' , 'success' );
            navigate('/');

        } catch (error) {
            console.log(error.message);
            showSnackbar( 'Fail to log in' , 'error' );
        }
        
    }

    const handleGoogleSignIn = async () => {
        try {
          await googleSignIn();
          showSnackbar( 'Logged in successfully' , 'success' );
          navigate('/');
        } catch (error) {
          console.log(error.message);
          showSnackbar( 'Fail to log in' , 'error' );
        }
    };


    return (
        <main className="authorization">

            <ReturnArrow to='/' />
            
            <section className="authorization__container">
               <div className="authorization__form-wrapper">
                    <h4>Log in</h4>
                    <DynamicForm 
                        inputFields={inputFields} 
                        handleSubmit={handleSubmitwithEmail} 
                        showForgotPassword={true} 
                        buttonText='Log in' 
                        backgroundColor= 'black'
                        color= 'white'
                    />
                    <Button onClick={handleGoogleSignIn} type='submit' text={'Sign in with Google'} showGoogleIcon={true} />
                    <div className='authorization__redirect'>
                        <p>Not have any account?</p>
                        <Link className='redirect-link' to="/signup">Sign Up</Link>
                    </div>
               </div>
            </section>
            
        </main>
    )
}

export default LoginPage
