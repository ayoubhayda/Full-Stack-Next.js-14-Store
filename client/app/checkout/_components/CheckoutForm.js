"use client";
import { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import axios from "axios";
import { useUser } from "@clerk/nextjs";
import { useCreateOrderMutation } from "../../_state/_services/OrderApi";
import {
  useDeleteCartMutation,
  useGetCartItemsQuery,
} from "../../_state/_services/CartApi";

const CheckoutForm = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useUser();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { data, isSuccess, refetch } = useGetCartItemsQuery(
    user?.primaryEmailAddress?.emailAddress
  );
  const [createOrder] = useCreateOrderMutation();
  const [deleteCart] = useDeleteCartMutation();

  // Function to create order and update cart
  const createOrderAndUpdateCart = async () => {
    await createOrder({
      data: {
        email: user?.primaryEmailAddress?.emailAddress,
        username: user?.fullName,
        amount,
        products,
      },
    });

    await Promise.all(
      data?.data?.map((item) => {
        deleteCart(item?.id);
      })
    );

    refetch();
  };

  const sendEmail = async () => {
    await axios.post("/api/send", {
      email: user.primaryEmailAddress.emailAddress,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    await createOrderAndUpdateCart();
    await sendEmail();

    const handleError = (error) => {
      setLoading(false);
      setErrorMessage(error.message);
    };

    const { error: submitError } = await elements.submit();
    if (submitError) {
      handleError(submitError);
      return;
    }

    try {
      const { data } = await axios.post("/api/create-payment-intent", {
        data: { amount: Number(amount) },
      });
      const clientSecret = data;

      const result = await stripe.confirmPayment({
        clientSecret,
        elements,
        confirmParams: {
          return_url: "http://localhost:3000/payment-confirm",
        },
      });

      if (result.error) {
        console.log(result.error.message);
      } else {
        // Call the function here
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    }
  };

  useEffect(() => {
    const ProductsList = data?.data?.map(
      (item) => item?.attributes?.products?.data[0]?.id
    );
    setProducts(ProductsList);
    console.log("Products: ", ProductsList);
  }, [data]);

  return (
    <form onSubmit={handleSubmit} className="mt-8">
      <PaymentElement />
      <button
        type="submit"
        className="w-full p-2 mt-4 text-white rounded-md bg-teal-600"
      >
        Submit
      </button>
    </form>
  );
};

export default CheckoutForm;
