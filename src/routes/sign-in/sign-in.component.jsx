
import { useEffect } from 'react';
import { getRedirectResult } from 'firebase/auth';

import { auth, signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from '../../utils/firebase/firebase.utils';

import SignUpForm from '../../components/sign-up/sign-up-form.component';
import Button from '../../components/button/button.component';



const SignIn = () => {

    useEffect(() => {
        async function getResponse() {
            const res = await getRedirectResult(auth);
    
            console.log(res);
    
            if(res) {
                const userDocRef = await createUserDocumentFromAuth(res.user);
            }
        }

        getResponse();

    }, []);

    const logGoogleUser = async() => {
        const { user } = await signInWithGooglePopup();

        const userDocRef = await createUserDocumentFromAuth(user);
    }


    return (
        <div>
            <h1>Sign In Page</h1>
            <Button onClick={logGoogleUser} >Sign in with Google popup</Button>
            <Button buttonType='google' onClick={signInWithGoogleRedirect}>Sign in with Google redirect</Button>
            <SignUpForm />
        </div>
    )
}

export default SignIn;