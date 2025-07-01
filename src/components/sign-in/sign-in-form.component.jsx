
import { useState } from "react";

import FormInput from "../form-input/form-input.component";

import { signInWithGooglePopup, signInAuthUserWithEmailAndPassword } from '../../utils/firebase/firebase.utils';

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";

import { SignInContainer, ButtonsContainer } from './sign-in-form.styles';

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
        await signInWithGooglePopup();
    };

    const handleSubmitForm = async (event) => {
        event.preventDefault();

        try {
            await signInAuthUserWithEmailAndPassword(email, password);

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

        setSignInInfos({...signInInfos, [name]: value});
    };

    return (
        <SignInContainer>
            <h1>Already have an account?</h1>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmitForm}>
                <FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email}  />

                <FormInput label="Password" type="password" required onChange={handleChange} name="password" value={password}  />

                <ButtonsContainer>
                <Button type="submit">Sign in</Button>
                <Button type="button" buttonType={ BUTTON_TYPE_CLASSES.google } onClick={signInWithGoogle}>Sign in with Google</Button>
                </ButtonsContainer>
            </form>
        </SignInContainer>
    );
}

export default SignInForm;