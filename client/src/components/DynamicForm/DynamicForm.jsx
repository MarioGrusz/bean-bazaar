import { useReducer } from 'react';
import './index.scss';

//Buttons https://www.phind.com/search?cache=pi7i3f3dln74u1rdacej0ycn

const DynamicForm = (props) => {


  const { inputFields, handleSubmit, formType } = props

  const formReducer = (state, action) => {
      switch(action.type) {
        case 'SET_FIELD':
          return {
            ...state,
            [action.fieldName]: action.value
          };
        default:
          return state;
      }
  };

  const [formData, dispatch] = useReducer(formReducer, {});

  const handleInputChange = (e) => {
      const { name, value } = e.target;
      dispatch({ type: 'SET_FIELD', fieldName: name, value });
  };


  const handleFormSubmit = (e) => {
      e.preventDefault();
      handleSubmit(formData); // Pass the form data to the submit function
    
  };

  const handleInputFocus = (e) => {
      e.target.classList.add('active');
  };
  
  const handleInputBlur = (e) => {
      if (e.target.value !== "") return;
      e.target.classList.remove("active");
  };

  return (

    <form onSubmit={handleFormSubmit}>

      {inputFields.map((field) => (
        <div key={field.name} className='input-wrap'>
          <input
            type={field.type}
            name={field.name}
            className='input-field'
            autoComplete='off'
            required={field.required}
            value={formData[field.name] || ''}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
          />
          <label>{field.label}</label>
        </div>
      ))}

      {formType === 'signin' ? (
      <button onClick={handleFormSubmit}>Sign In</button>
      ) : (
      <>
        <button onClick={handleFormSubmit}>Log In</button>
        <button onClick={handleFormSubmit}>Forgot Password</button>
        <button onClick={handleFormSubmit}>Log In with Google</button>
      </>
      )}

    </form>
  ); 
}

export default DynamicForm






















// import { useState } from 'react';
// import './index.scss';


// const DynamicForm = ({ inputFields, handleSubmit }) => {

//     const [formData, setFormData] = useState({});

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };


//     const onSubmit = (e) => {
//         e.preventDefault();
//         handleSubmit(formData); // Pass the form data to the submit function
     
//     };

//     const handleOnBlur = (e) => {
//         if (e.target.value !== "") return;
//         e.target.classList.remove("active");
//     };

//     return (
//         <form onSubmit={onSubmit}>

//           {inputFields.map((field) => (
//             <div key={field.name} className='input-wrap'>
//               <input
//                 type={field.type}
//                 name={field.name}
//                 className='input-field'
//                 autoComplete='off'
//                 required={field.required}
//                 value={formData[field.name] || ''}
//                 onChange={handleChange}
//                 onFocus={(e) => {
//                   e.target.classList.add('active');
//                 }}
//                 onBlur={handleOnBlur}
//               />
//               <label>{field.label}</label>
//             </div>
//           ))}

//           <button onClick={onSubmit}>Submit</button>
    

//         </form>
//     ); 
// }

// export default DynamicForm