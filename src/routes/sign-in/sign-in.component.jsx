import "./sign-in.styles.scss";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
const SignIn = () => {
  const sigInGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in">
      <button onClick={sigInGoogleUser}>Sign in with google popup</button>
    </div>
  );
};

export default SignIn;
