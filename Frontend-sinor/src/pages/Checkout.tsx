import React from "react";
import "@stripe/stripe-js";
import { Stripe, loadStripe } from "@stripe/stripe-js";
import { PaymentElement, Elements } from "@stripe/react-stripe-js";

// Stripe
// let stripePromise;
// let stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY || '');
// let stripePromise: Promise<Stripe | null> = loadStripe(stripeKey);
const stripeKey = process.env.REACT_APP_STRIPE_KEY || " ";
const paypalClientId = process.env.PAYPAL_CLIENT_ID || "";
console.log("Paypal", paypalClientId);

// const getStripe = () => {
//   if (!stripePromise) {
//     stripePromise = loadStripe(process.env.STRIPE_KEY);

//     return stripePromise;
//   }
// };
// const stripeKey = process.env.REACT_APP_STRIPE_KEY;

let stripePromise = stripeKey ? loadStripe(stripeKey) : null;

const getStripe = () => {
  if (!stripePromise) {
    const stripeKey = process.env.REACT_APP_STRIPE_KEY;
    if (!stripeKey) {
      console.error("Stripe key is not defined in environment variables");
      // Further error handling here
      return null;
    }
    stripePromise = loadStripe(stripeKey);
  }
  return stripePromise;
};

const Checkout: React.FC = () => {
  //   const item: Item = {
  //   price: "price_1ODZMHDrMP3AyWH7nrkwR1TV", // Replace with your price ID
  // };
  type Item = {
    price: string;
  };

  const item: Item = {
    price: "price_1ODZMHDrMP3AyWH7nrkwR1TV", // Replace with your price ID
  };

  const redirectToCheckout = async () => {
    console.log("Redirecting to checkout");

    const stripe = await getStripe();
    if (stripe) {
      const { error } = await stripe.redirectToCheckout(checkoutOptions);
      if (error) {
        console.error("Stripe checkout error", error);
      }
    } else {
      console.error("Stripe.js hasn't loaded yet.");
    }
  };

  const checkoutOptions = {
    lineItems: [{ price: item.price, quantity: 1 }], // Ensure quantity is set
    mode: "payment" as const,
    successUrl: `${window.location.origin}/success`,
    cancelUrl: `${window.location.origin}/cancel`,
  };

  // const redirectToCheckout = async () => {
  //   console.log("Redirecting to checkout");
  
  //   // Send a POST request to your server to create a Stripe checkout session
  //   try {
  //     const response = await fetch('/create-checkout-session', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ priceId: item.price }),
  //     });
  
  //     const session = await response.json();
  
  //     // Get Stripe instance
  //     const stripe = await getStripe();
  
  //     // Redirect to Stripe Checkout
  //     if (stripe) {
  //       const { error } = await stripe.redirectToCheckout({ sessionId: session.sessionId });
  //       if (error) {
  //         console.error("Stripe checkout error", error);
  //       }
  //     } else {
  //       console.error("Stripe.js hasn't loaded yet.");
  //     }
  //   } catch (error) {
  //     console.error("Error creating checkout session", error);
  //   }
  // };
  

  return (
    <div>
      <h1>Checkout</h1>
      <button onClick={redirectToCheckout}>Checkout</button>
      
    </div>
  );
};

export default Checkout;
