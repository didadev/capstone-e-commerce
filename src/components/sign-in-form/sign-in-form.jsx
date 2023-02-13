import { useState } from "react";
import FormInput from "../form-input/form-input.component";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import {
  signInWithGooglePopUp,
  signInWithCredentials,
} from "../../utils/firebase/firebase";
import {
  googleSignInStart,
  emailSignInStart,
} from "../../store/user/user.action";
import "./sign-in-form.styles.scss";
import { useDispatch } from "react-redux";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const dispatch = useDispatch();

  const formFieldsHandler = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };
  const submitHandler = async (event) => {
    event.preventDefault();
    try {
      //const { user } = await signInWithCredentials(email, password);
      dispatch(emailSignInStart(email, password));
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
    //const { user } = await signInWithGooglePopUp();
    dispatch(googleSignInStart());
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
          <Button
            type="button"
            buttonType={BUTTON_TYPE_CLASSES.google}
            onClick={signInGoogleUser}
          >
            google sign in
          </Button>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
