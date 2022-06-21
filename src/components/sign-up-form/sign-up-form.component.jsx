import { useState } from "react";

import { createUserAuthWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.util";

import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-up-form.styles.scss';


const defaultFormFields = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: ""
}


const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match!");
            return;
        }

        try {
            const { user } = await createUserAuthWithEmailAndPassword(email, password);
            await createUserDocumentFromAuth(user, { displayName });  // DisplayName is passed additionally cause, it may not gotten automaticy by 'createUserAuthDocument' methode
        }
        catch (error) {
            console.log("Account creation encountered and error", error);
        }

        resetFormFields();
    }

    return (
        <div className="sign-up-form-container">

            <h2>Don't have an account?</h2>
            <span>Sign up with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput
                    label="Display Name"
                    type='text'
                    name="displayName"
                    value={displayName}
                    onChange={handleChange}
                    required
                />

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

                <FormInput
                    label="Confirm Password"
                    type='password'
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={handleChange}
                    required
                />

                <Button type="submit">SIGN UP</Button>
            </form>
        </div>
    );
}

export default SignUpForm;