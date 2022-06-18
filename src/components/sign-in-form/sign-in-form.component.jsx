import { useState, useContext } from "react";

import {signInWithGooglePopup, signInUserAuthWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.util";

import { UserContext } from "../../context/user.context";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.styles.scss';


const defaultFormFields = {
    email: "",
    password: "",
}


const SignInForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;
    const {setCurrentUser} = useContext(UserContext);

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const signInWithGoogle = async () => {
        const { user } = await signInWithGooglePopup();
        await createUserDocumentFromAuth(user);
        setCurrentUser(user);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInUserAuthWithEmailAndPassword(email, password);
            setCurrentUser(user);
        }
        catch (error) {
            switch(error.code){
                case "auth/wrong-password" :
                    alert("Incorrect password for the email.")
                    break;
                
                    case "auth/user-not-found" :
                        alert("No user associated with this email.")
                        break;

                    default : console.log(error);
            }
        }

        resetFormFields();
    }

    return (
        <div className="sign-in-form-container">

            <h2>Already have an account?</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>

                <FormInput
                    label="Email"
                    type='email'
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                />

                <FormInput
                    label="Password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={handleChange}
                    required
                />

                <div className="buttons-container">
                    <Button type="submit">
                        SIGN IN
                    </Button>

                    <Button type="button" onClick={signInWithGoogle} buttonType="google">
                        GOOGLE SIGN IN
                    </Button>
                </div>

            </form>
        </div>
    );
}

export default SignInForm;