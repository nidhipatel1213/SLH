import React, { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";

// Define the structure of the product prop
interface Product {
  id: string;
  name: string;
  price: number;
  // Add other product properties here
}

interface Props {
  product: Product;
}

const PaypalCheckoutButton: React.FC<Props> = ({ product }) => {
  const [paidFor, setPaidFor] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleApprove = (orderID: string) => {
    //call backend functions to fulfill order

    //if response is success
    setPaidFor(true);
    // Refresh user's account or subscription status

    //if the response is error
    //setError('Your payment was processed successfully.However, we are unable to purchase. Please contact us for assistance.)
  };
  if (paidFor) {
    // Display success message, modal  or redirect user to success page.
    alert("Thank you for your purchase!");
  }

  if (error) {
    // Display error message, modal or redirect user to error page
    alert(error);
  }

  return (
    <PayPalButtons
      style={{
        height: 38,
        tagline: false,
      }}
      // onClick={(data, actions) => {
      //   // validate on button click, client or server side
      //   const hasAlreadyBought = false;
      //   if (!hasAlreadyBought) {
      //     setError("You already bought this.");
      //     return actions.reject();
      //   } else {
      //     return actions.resolve();
      //   }
      // }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              // description: product.description || 'Product Description',
              amount: {
                value: product.price.toString(),
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        try {
          const order = await actions.order?.capture();
          if (order) {
            console.log("Order", order);
            handleApprove(data.orderID);
          } else {
            // Handle the case where order is undefined
            console.error("Order object is undefined.");
          }
        } catch (err) {
          setError('Error capturing order.');
          console.error("Order capture error", err);
        }
      }}
      onCancel={() => {
        // Display cancel message, modal
        setError("Transaction cancelled");
      }}
      onError={(err) => {
        setError("Error during payment process.");
        console.error("PayPal Checkout on Error", err);
      }}
    />
  );
};
// <div>
//     <h1>Payment Gateway</h1>
//   <p>Product Name: {product.name}</p>
//   <p>Product Price: ${product.price}</p>
// </div>

export default PaypalCheckoutButton;
