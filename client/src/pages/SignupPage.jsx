import DynamicForm from "../components/DynamicForm/DynamicForm";
import { UserAuth } from '../context/AuthContext';


const SignupPage = () => {

    const { createUser } = UserAuth();


    const inputFields = [
        { name: 'name', type: 'name', label: 'Your Name', required: true },
        { name: 'email', type: 'email', label: 'Email', required: true },
        { name: 'password', type: 'password', label: 'Password', required: true },
        
    ];

    const handleCreateUserWithEmail = async (formData) => {

        console.log(formData)
        try{
            const { email, password, name } = formData;
            await createUser(email, password, name);
           
        } catch (error) {
           
            console.log(error.message);
        }
        
    }

    return (
        <div>
            <DynamicForm formType='signin' inputFields={inputFields} handleSubmit={handleCreateUserWithEmail} />
        </div>
    )
}

export default SignupPage