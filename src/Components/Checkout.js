import React, { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const stripePromise = loadStripe(
  "pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3"
);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();

  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    // Handle payment processing with Stripe
    const { token, error } = await stripe.createToken(
      elements.getElement(CardElement)
    );

    if (error) {
      console.error(error);
      // Handle payment error (you can show an error toast here if needed)
      toast.error("Payment failed. Please check your card details.");
    } else {
      // Send token and shipping info to your client-side logic
      const orderData = {
        token: token.id,
        shippingInfo,
      };

      // Your client-side logic here
      handleClientOrderProcessing(orderData);
    }
  };

  const handleClientOrderProcessing = (orderData) => {
    console.log("Order data:", orderData);

    toast.success("Payment successful! Your order has been placed.");
  };

  return (
    <form onSubmit={handleSubmit}>
      <VStack spacing={4}>
        <Heading as="h2">Checkout</Heading>
        <FormControl>
          <FormLabel>Name:</FormLabel>
          <Input
            type="text"
            value={shippingInfo.name}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, name: e.target.value })
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Address:</FormLabel>
          <Input
            type="text"
            value={shippingInfo.address}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, address: e.target.value })
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>City:</FormLabel>
          <Input
            type="text"
            value={shippingInfo.city}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, city: e.target.value })
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>State:</FormLabel>
          <Input
            type="text"
            value={shippingInfo.state}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, state: e.target.value })
            }
            required
          />
        </FormControl>
        <FormControl>
          <FormLabel>Postal Code:</FormLabel>
          <Input
            type="text"
            value={shippingInfo.postalCode}
            onChange={(e) =>
              setShippingInfo({ ...shippingInfo, postalCode: e.target.value })
            }
            required
          />
        </FormControl>

        <FormControl>
          <FormLabel>Card Details:</FormLabel>
          <Box borderWidth="1px" borderRadius="md" p={4}>
            <CardElement />
          </Box>
        </FormControl>
        <Button type="submit" disabled={!stripe}>
          Pay
        </Button>
      </VStack>
    </form>
  );
};

const Checkout = () => {
  return (
    <>
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>
      <ToastContainer />
    </>
  );
};

export default Checkout;
