"use client";
import { useRouter } from "next/navigation";
import React from "react";

const Cart = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className="absolute top-14 right-1 w-screen h-[300px] z-10 overflow-y-auto max-w-sm shadow-lg rounded-lg  bg-gray-800 border border-gray-900 text-white px-4 py-8 sm:px-6 lg:px-8"
      aria-modal="true"
      role="dialog"
      tabIndex="-1"
    >
      <div className="mt-4 space-y-6">
        <ul className="space-y-4">
          {data?.map((item) => (
            <li key={item.id} className="flex items-center gap-4">
              <img
                src={
                  item?.attributes?.products?.data[0]?.attributes?.banner?.data
                    ?.attributes?.url
                }
                alt=""
                className="h-16 w-[6rem] rounded object-cover"
              />
              <div className="flex flex-col items-start">
                <h3 className="text-sm text-start text-gray-900 dark:text-white line-clamp-1">
                  {item?.attributes?.products?.data[0]?.attributes?.title}
                </h3>
                <dl className="mt-0.5 space-y-px text-[11px] text-gray-600 dark:text-gray-300">
                  <dd className="capitalize text-start">
                    {item?.attributes?.products?.data[0]?.attributes?.category}
                  </dd>
                  <dd>
                    ${item?.attributes?.products?.data[0]?.attributes?.price}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
        <div className="space-y-4 text-center">
          <a
            href="/cart"
            className="block rounded border  border-gray-300 px-5 py-3 text-sm text-gray-300 transition hover:ring-1 hover:ring-gray-400"
          >
            View my cart ({data?.length})
          </a>
          <button
            onClick={() => router.push(`/checkout`)}
            className="w-full rounded text-center bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
