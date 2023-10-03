import React, {useState} from 'react';
import FormAction from './FormAction';
import {AiOutlineClose} from 'react-icons/ai';
import '../style/box.css';

export  const UpdateBox = ({defaultValue, onSubmit, closeBox, fields}) => {
    const [formState, setFormState] = useState(defaultValue);
    const [errors, setErrors] = useState("");

    const validateForm = () => {
        //call the update API
    };
     const handleChange = (e) => {
        setFormState({...formState, [e.target.id]:e.target.value});

     };
     const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formState);
        closeBox();
     };
     return (
        <div
         className="modal-container" > 
         <div className="modal">
            <AiOutlineClose size="38px" onClick={closeBox}/>
            <form>
                {fields.map((field,index) => {
                    return (
                        <div className="form-group">
                          <label>{field.name}</label>
                          <input 
                            id={field.id} 
                            type={field.type}
                            onChange={handleChange}
                            value={formState[field.id]}
                          />
                        </div>
                    )
                })}
                <FormAction handleSubmit={handleSubmit} text="Appliquer"/>
            </form>
         </div>
        </div>
     );
};

