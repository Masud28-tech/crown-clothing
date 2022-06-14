import { signInWithGooglePopup } from "../../utils/firebase/firebase.util";

const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        console.log(response);
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Sign In with Google</button>
        </div>

    );
}

export default SignIn;