
import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import Button from "../button/button.component";

import './sign-in.styles.scss';

const defaultSignIn = {
    email: '',
    password: ''
}

const SignInForm = () => {

    const [signInInfos, setSignInInfos] = useState(defaultSignIn);
    
    const { email, password } = signInInfos;

    const resetSignInInfos = () => {
        setSignInInfos(defaultSignIn);
    };

    const signInWithGoogle = async() => {
        const { user } = await signInWithGooglePopup();

        await createUserDocumentFromAuth(user);
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {

            const response = await signInAuthUserWithEmailAndPassword(email, password);

            console.log(response);

            resetSignInInfos();
            
        } catch (error) {

            switch(error.code) {
                case 'auth/wrong-password': 
                alert('Incorrect password for email');
                break;

                case 'auth/user-not-found':
                    alert('no user associated with this email');
                break;

                default: 
                console.log(error);
            }
            
        }
    };

    const handleChange = (event) => {
        const {name, value} = event.target;

        setSignInInfos({...defaultSignIn, [name]: value});
    };

    return (
        <div className="sign-in-container">
            <h1>Already have an account?</h1>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmitForm}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}  />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}  />

                <div className="buttons-container">
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType="google" onClick={signInWithGoogle}>Sign in with Google</Button>
                </div>
            </form>
        </div>
    );
}

export default SignInForm;