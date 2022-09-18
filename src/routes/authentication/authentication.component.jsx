import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
import {
  auth,
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";
import SignInForm from "../../components/sign-in-form/sign-in-form";
import "./authentication.styles.scss";
const Authentication = () => {
  {
    /* just to demonstrate an other way for signin */
  }
  //   useEffect(() => {
  //     const refetchUser = async () => {
  //       const response = await getRedirectResult(auth);
  //       if (response) {
  //         const userRef = await createUserDocumentFromAuth(response.user);
  //         console.log(response.user);
  //         console.log(userRef);
  //       }
  //     };
  //     refetchUser();
  //   }, []);

  const sigInGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="authentication-container">
      {/* <button onClick={sigInGoogleUser}>Sign in with google popup</button> */}
      {/* just to demonstrate an other way for signin */}
      {/* <button onClick={signInWithGoogleRedirect}>
        Sign in with Google Redirect
      </button> */}

      <SignInForm />
      <SignUpForm />
    </div>
  );
};

export default Authentication;
