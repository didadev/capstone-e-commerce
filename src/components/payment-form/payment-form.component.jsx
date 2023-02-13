import {
  PaymentElement,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import { FormContainer, PaymentFormContainer } from "./payment-form.styles";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const paymentHandler = async (evt) => {
    evt.preventDefault();
    if (!stripe || !elements) return;

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: 10000 }),
    })
      .then((res) => res.json())
      .catch((err) => console.log(err));
    console.log(response);
  };

  return (
    <PaymentFormContainer>
      <FormContainer onSubmit={paymentHandler}>
        <CardElement />
        <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
