"use client";
import React, { useEffect, useState } from "react";
import {
  useDeleteCartMutation,
  useGetCartItemsQuery,
} from "../_state/_services/CartApi";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { BallTriangle } from "react-loader-spinner";

const Page = () => {
  const { user } = useUser();
  const router = useRouter();
  const [total, setTotal] = useState(0);
  const { data, isSuccess, isLoading, refetch } = useGetCartItemsQuery(
    user?.primaryEmailAddress?.emailAddress
  );
  const [deleteCart] = useDeleteCartMutation();

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      await deleteCart(id);
      refetch();
    }
  };

  useEffect(() => {
    if (isSuccess) {
      const Total = data?.data.reduce(
        (accumulator, currentValue) =>
          Number(accumulator) +
          Number(
            currentValue?.attributes?.products?.data[0]?.attributes?.price
          ),
        0
      );
      setTotal(Total);
    }
  }, [data, isSuccess]);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <section>
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-white sm:text-3xl">
                Your Cart
              </h1>
            </header>

            <div className="mt-8">
              {isSuccess ? (
                <ul className="space-y-4">
                  {data?.data?.map((item) => (
                    <li key={item.id} className="flex items-center gap-4">
                      <img
                        src={
                          item?.attributes?.products?.data[0]?.attributes
                            ?.banner?.data?.attributes?.url
                        }
                        alt=""
                        className="h-16 w-[6rem] rounded object-cover"
                      />

                      <div className="flex flex-col items-start">
                        <h3 className="text-sm text-start text-white line-clamp-1">
                          {
                            item?.attributes?.products?.data[0]?.attributes
                              ?.title
                          }
                        </h3>
                        <dl className="mt-0.5 space-y-px text-[11px] text-gray-300">
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

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <button
                          onClick={() => handleDelete(item?.id)}
                          className="text-gray-300 transition hover:text-red-600"
                        >
                          <span className="sr-only">Remove item</span>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-5 w-5"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            ></path>
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : isLoading ? (
                <div className="w-full h-[400px] flex justify-center items-center">
                  <BallTriangle
                    height={80}
                    width={80}
                    radius={5}
                    color="#319795"
                    ariaLabel="ball-triangle-loading"
                    wrapperStyle={{}}
                    wrapperClass=""
                    visible={true}
                  />
                </div>
              ) : null}

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-200">
                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>${total}</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <button
                      onClick={() => router.push(`/checkout`)}
                      className="block rounded bg-teal-600 px-5 py-3 text-sm text-white transition hover:bg-teal-700"
                    >
                      Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Page;
