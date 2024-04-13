"use client";
import React from "react";
import ProductsList from "./ProductsList";
import { ArrowRight } from "lucide-react";
import { useGetLatestProductsQuery } from "../_state/_services/ProductApi";
import { BallTriangle } from "react-loader-spinner";

const ProductsSection = () => {
  const { data, isLoading, isSuccess } = useGetLatestProductsQuery();

  return (
    <div className="p-10 md:px-20 bg-gray-900 text-white">
      <div className="pb-10 flex justify-between items-center">
        <h2 className="font-bold text-2xl">Brand New</h2>
        <span
          className="font-normal text-[14px]
         float-right text-primary flex 
         items-center cursor-pointer hover:text-teal-600"
        >
          View All Collection <ArrowRight className="h-4" />
        </span>
      </div>
      {isSuccess ? (
        <ProductsList products={data?.data} />
      ) : (
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
      )}
    </div>
  );
};

export default ProductsSection;
