import { useState } from 'react';

import FormInput from '../form-input/form-input.component';

import { createAuthUserWithEmailAndPassword, createUserAuth } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';

import './sign-up-form.styles.scss';

const defaultFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: '',
}

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFields);
    const { displayName, email, password, confirmPassword } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFields)
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password !== confirmPassword) {
            alert("passwords do not match");
            return;
        }

        try {
            const { user } = await createAuthUserWithEmailAndPassword(email, password);

            await createUserAuth(user, { displayName });
            resetFormFields();

        } catch(error) {
            if(error.code === "auth/email-already-in-use") {
                alert('Cannot create user, email already in use');
            } else {
                console.log(error)
            }
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
      <div className='sign-up-container'>
        <h2>Don't have an account?</h2>
        <span>Sign up with your email & password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label='Display Name'
            inputOptions={{
                required: true,
                type: "text",
                onChange: handleChange,
                name:"displayName",
                value: displayName,
            }}
          />

          <FormInput
            label='Email'
            inputOptions={{
                required: true,
                type:"email",
                onChange: handleChange,
                name: "email",
                value: email,
            }}
          />

          <FormInput 
            label='Password'
            inputOptions={{
                required: true,
                type: "password", 
                onChange: handleChange, 
                name: "password", 
                value: password,
            }}
          />

          <FormInput 
            label='Confirm Password'
            inputOptions={{
                required: true,
                type: "password", 
                onChange: handleChange, 
                name: "confirmPassword", 
                value: confirmPassword, 
            }}
          />

          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    );
};

export default SignUpForm;