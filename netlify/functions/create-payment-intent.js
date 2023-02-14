const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET);
// const stripe = require("stripe")(
//   "sk_test_51Mb5DBHW96TYmkBq4TtggVugNyZ2iDwcE2Bs7ebKt6TeHzkjuzIzEsGhS6lOWCNDX5isaMaghTyPRsAqam3nlVTB00fW7JUGTD"
// );

exports.handler = async (event) => {
  try {
    const { amount } = JSON.parse(event.body);
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      payment_method_types: ["card"],
    });
    return {
      statusCode: 200,
      body: JSON.stringify({ paymentIntent }),
    };
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 400,
      body: JSON.stringify({
        error,
        process: process.env,
      }),
    };
  }
};
