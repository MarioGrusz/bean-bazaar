import { useState } from 'react';
import './index.scss';

//https://www.phind.com/search?cache=mmh77fw6ioy26rbi1k0atqpq
const DynamicForm = ({ inputFields, handleSubmit }) => {

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

          <button onClick={handleFormSubmit}>Submit</button>
    

        </form>
    ); 
}

export default DynamicForm