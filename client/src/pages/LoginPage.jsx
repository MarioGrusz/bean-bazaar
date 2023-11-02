import DynamicForm from "../components/DynamicForm/DynamicForm";
import { UserAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

//PROTECTED ROUTES -----> https://www.phind.com/search?cache=e92hc4m6x6fxxc2di4l6ejzx


const LoginPage = () => {

    const { googleSignIn,  signIn, user} = UserAuth();
    const navigate = useNavigate();


    const inputFields = [
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
        
    ];

    const handleSubmitwithEmail = async (formData) => {
        try{
            const { email, password } = formData;
            await signIn(email, password);
            navigate('/');

        } catch (error) {
            console.log(error.message);
        }
        
    }


    return (
        <div>
            <DynamicForm formType='login' inputFields={inputFields} handleSubmit={handleSubmitwithEmail} />
        </div>
    )
}

export default LoginPage