
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

import {
    getFirestore,
    doc,
    getDoc,
    setDoc
} from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-vpBRe9wCDBh4BDG82ieLklWNtTh1KN8",
  authDomain: "crwn-clothing-db-5e42f.firebaseapp.com",
  projectId: "crwn-clothing-db-5e42f",
  storageBucket: "crwn-clothing-db-5e42f.firebasestorage.app",
  messagingSenderId: "40200113010",
  appId: "1:40200113010:web:fd61fe4b08b1f5d722ebeb"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
    prompt: "select_account"
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);


export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshopt = await getDoc(userDocRef);
    console.log(userSnapshopt);

    // if user data does not exist
    // create / set the document with the data from userAuth in my collection

    if(!userSnapshopt.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt
            });
        } catch (e) {
            console.log('error creating the user', e.message);
        }
    }



    // if user data exists
    // return userDocRef

    return userDocRef;

}