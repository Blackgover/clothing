import { 
    signInWithGooglePopup,
    createUserAuth,
    auth,
} from '../../utils/firebase/firebase.utils';
import SignUpForm from '../../components/sign-up-form/sign-up-form.component';


import './sign-in.styles.scss';

const SignIn = () => {

    const logGoogleUser = async () => {
        const { user } = await signInWithGooglePopup();
        const userDocRef = await createUserAuth(user);
    };

    return (
      <div>
        <h1> Sign In Page</h1>
        <button onClick={logGoogleUser}>Sign in with google popup</button>
        <SignUpForm />
      </div>
    );
};

export default SignIn;