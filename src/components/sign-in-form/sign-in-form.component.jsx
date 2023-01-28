import FormInput from '../form-input/form-input.component';
import { useState } from 'react';
import { signInWithGooglePopup, createUserAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';
import Button from '../button/button.component';


import './sign-in-form.styles.scss';

const defaultFields = {
    email: '',
    password: '',
}

const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFields);
    const { email, password } = formFields;


    const resetFormFields = () => {
        setFormFields(defaultFields)
    };

    const signInWithGoogle = async () => {
      await signInWithGooglePopup();

    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
          await signInAuthUserWithEmailAndPassword(email, password);
          resetFormFields();
        } 
        catch(error) {
          switch(error.code) {
            case 'auth/wrong-password':
              alert('Incorrect password for email');
              break;
            case 'auth/user-not-found':
              alert(' no user associated with this email');
              break;
            default:
              console.log(error)
          }
          console.log(error)
        }
    }

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value })
    }

    return (
      <div className="sign-up-container">
        <h2>Already have an account?</h2>
        <span>Sign in with your email & password</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Email"
            inputOptions={{
              required: true,
              type: "email",
              onChange: handleChange,
              name: "email",
              value: email,
            }}
          />

          <FormInput
            label="Password"
            inputOptions={{
              required: true,
              type: "password",
              onChange: handleChange,
              name: "password",
              value: password,
            }}
          />

          <div className='buttons-container' >
            <Button type="submit">Sign In</Button>
            <Button type="button" buttonType='google' onClick={signInWithGoogle} >Google sign in</Button>
          </div>

        </form>
      </div>
    );
};

export default SignInForm;