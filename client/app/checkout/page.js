"use client";
import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { useGetCartItemsQuery } from "../_state/_services/CartApi";
import { useUser } from "@clerk/nextjs";
import { BallTriangle } from "react-loader-spinner";
import CheckoutForm from "./_components/CheckoutForm";

// Load Stripe with public key
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHER_KEY);

export default function Checkout() {
  // Hooks
  const { user } = useUser();
  const [total, setTotal] = useState(0);
  const [options, setOptions] = useState({});
  const { data, isSuccess } = useGetCartItemsQuery(
    user?.primaryEmailAddress?.emailAddress
  );

  // Calculate total price
  useEffect(() => {
    if (isSuccess) {
      const totalAmount = data?.data.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) +
          Number(
            currentValue?.attributes?.products?.data[0]?.attributes?.price
          ),
        0
      );
      setTotal(totalAmount);
      setOptions({
        appearance: {
          theme: "night",
          labels: "floating",
        },
        mode: "payment",
        currency: "usd",
        amount: totalAmount * 100,
      });
    }
  }, [data]);

  return (
    <div className="App">
      <div className="relative mx-auto w-full bg-gray-900 text-white">
        <div className="grid min-h-screen grid-cols-10">
          {/* Checkout Form */}
          <div className="col-span-full py-6 px-4 sm:py-12 lg:col-span-6 lg:py-24">
            <div className="mx-auto w-full max-w-lg">
              <h1 className="relative text-2xl font-medium text-gray-200 sm:text-3xl">
                Secure Checkout
                <span className="mt-2 block h-1 w-10 bg-teal-600 sm:w-20"></span>
              </h1>

              {/* Display checkout form */}
              {total > 0 ? (
                <Elements stripe={stripePromise} options={options}>
                  <CheckoutForm amount={Number(total)} />
                </Elements>
              ) : (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <BallTriangle
                    height={50}
                    width={50}
                    radius={5}
                    color="#319795"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Order Summary */}
          <div className="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24">
            <h2 className="sr-only">Order summary</h2>
            <div>
              <img
                src="https://images.unsplash.com/photo-1581318694548-0fb6e47fe59b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                alt=""
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 h-full w-full bg-gradient-to-t from-teal-900 to-teal-600 opacity-95"></div>
            </div>

            {/* Display order items */}
            <div className="relative">
              {isSuccess ? (
                <ul className="space-y-5">
                  {data?.data?.map((item) => (
                    <li key={item.id} className="flex justify-between">
                      <div className="inline-flex">
                        <img
                          src={
                            item?.attributes?.products?.data[0]?.attributes
                              ?.banner?.data?.attributes?.url
                          }
                          alt=""
                          className="h-16 w-[6rem] rounded object-cover"
                        />
                        <div className="ml-3 marker:flex flex-col items-start">
                          <h3 className="text-sm font-medium text-start text-white line-clamp-1">
                            {
                              item?.attributes?.products?.data[0]?.attributes
                                ?.title
                            }
                          </h3>
                          <dl className="mt-0.5 space-y-px font-medium text-[12px] text-gray-100">
                            <dd className="capitalize text-start">
                              {
                                item?.attributes?.products?.data[0]?.attributes
                                  ?.category
                              }
                            </dd>
                            <dd>
                              $
                              {
                                item?.attributes?.products?.data[0]?.attributes
                                  ?.price
                              }
                            </dd>
                          </dl>
                        </div>
                      </div>
                      <p className="text-sm font-semibold text-white">
                        $
                        {item?.attributes?.products?.data[0]?.attributes?.price}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="w-full h-[300px] flex justify-center items-center">
                  <BallTriangle
                    height={80}
                    width={80}
                    radius={5}
                    color="#ffffff"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              )}

              {/* Total price */}
              <div className="my-5 h-0.5 w-full bg-white bg-opacity-30"></div>
              <div className="space-y-2">
                <p className="flex justify-between text-lg font-bold text-white">
                  <span>Total price:</span>
                  <span>${total}</span>
                </p>
              </div>
            </div>

            {/* Support Contact */}
            <div className="relative mt-10 text-white">
              <h3 className="mb-5 text-lg font-bold">Support</h3>
              <p className="text-sm font-semibold">
                +01 653 235 211{" "}
                <span className="font-light">(International)</span>
              </p>
              <p className="mt-1 text-sm font-semibold">
                support@nanohair.com <span className="font-light">(Email)</span>
              </p>
              <p className="mt-2 text-xs font-medium">
                Call us now for payment related issues
              </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="relative mt-10 flex">
              <p className="flex flex-col">
                <span className="text-sm font-bold text-white">
                  Money Back Guarantee
                </span>
                <span className="text-xs font-medium text-white">
                  within 30 days of purchase
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
