import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import {
  signInWithGooglePopUp,
  createUserDocumentFromAuth,
  signInWithCredentials,
} from "../../utils/firebase/firebase";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const formFieldsHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      const userRef = await signInWithCredentials(email, password);
      setFormFields(defaultFormFields);
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          alert("Wrong password provided");
          break;
        case "auth/user-not-found":
          alert("email not found");
          break;
        default:
          console.log("error signing user : ", error.message);
      }
    }
  };
  const signInGoogleUser = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentFromAuth(user);
  };

  return (
    <div className="sign-in-form-container">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={submitHandler}>
        <FormInput
          label="email"
          required
          type="email"
          name="email"
          value={email}
          onChange={formFieldsHandler}
        />
        <FormInput
          label="password"
          required
          type="password"
          name="password"
          value={password}
          onChange={formFieldsHandler}
        />
        <div className="buttons-container">
          <Button type="submit">Sign in</Button>
          <Button type="button" buttonType="google" onClick={signInGoogleUser}>
            google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
