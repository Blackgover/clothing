// import { getAnalytics } from "firebase/analytics";
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';
import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
} from 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyDRjNIThMYN2uxZfw3HIaa_T2Ve5mvwwl0",
    authDomain: "clothing-db-4d142.firebaseapp.com",
    projectId: "clothing-db-4d142",
    storageBucket: "clothing-db-4d142.appspot.com",
    messagingSenderId: "1060373995228",
    appId: "1:1060373995228:web:77f9e732bd73a6b3a51e19",
    measurementId: "G-JMZ8BZ0WVG"
};

const firebaseApp = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);

export const db = getFirestore();

export const createUserAuth = async (userAuth, additionalInformation = {}) => {

    if (!userAuth) return;

    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);

    // if user does not exist
    if(!userSnapshot.exists()) {
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        }
        catch(error){
            console.log('error creating the user', error.message)
        }
    }

    // if user exists
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {

    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async ( email, password ) => {
    if(!email || !password) return;

    return await signInWithEmailAndPassword (auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)