import React from 'react';
import {loadStripe} from '@stripe/stripe-js';

const stripeKey = process.env.STRIPE_KEY || "your_stripe_public_key_here";

// let stripePromise: Promise<Stripe | null> = loadStripe(stripeKey);

// const getStripe = () => stripePromise;

// interface Item {
//   price: string;
// }

const StripeComponent: React.FC = () => {
//   const item: Item = {
//     price: "price_1ODZMHDrMP3AyWH7nrkwR1TV", // Replace with your price ID
//   };

//    const checkoutOptions = {
//     lineItems: [{ price: item.price }], // Ensure quantity is set
//     mode: "payment" as const,
//     successUrl: `${window.location.origin}/success`,
//     cancelUrl: `${window.location.origin}/cancel`,
//   };

  const redirectToCheckout = async () => {
//     console.log("Redirecting to checkout");

//     const stripe = await getStripe();
//     if (stripe) {
//       const { error } = await stripe.redirectToCheckout(checkoutOptions);
//       if (error) {
//         console.error("Stripe checkout error", error);
//       }
//     } else {
//       console.error("Stripe.js hasn't loaded yet.");
//     }
  };

  return (
    <button onClick={redirectToCheckout}>
      Checkout
    </button>
  );
};

export default StripeComponent;