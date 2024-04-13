"use client";
import React, { useEffect, useState } from "react";
import Banner from "./_components/Banner";
import Details from "./_components/Details";
import BreadCrumb from "../../_components/BreadCrumb";
import { usePathname } from "next/navigation";
import {
  useGetProductByIdQuery,
  useGetProductsByCategoryQuery,
} from "../../_state/_services/ProductApi";
import ProductsList from "../../_components/ProductsList";
import { BallTriangle } from "react-loader-spinner";

const ProductDetails = ({ params }) => {
  const path = usePathname();
  const [productDetails, setProductDetails] = useState({});
  const [productsList, setProductsList] = useState([]);

  const { data: productData, isSuccess: productSuccess } =
    useGetProductByIdQuery(params?.productId);
  const { data: similarProductsData, isSuccess: similarProductsSuccess } =
    useGetProductsByCategoryQuery(productDetails?.attributes?.category);

  useEffect(() => {
    if (productSuccess) {
      setProductDetails(productData.data);
    }
  }, [productSuccess, productData]);

  useEffect(() => {
    if (similarProductsSuccess) {
      setProductsList(similarProductsData.data);
    }
  }, [similarProductsSuccess, similarProductsData]);

  return (
    <div className="bg-gray-900 text-white min-h-screen px-10 py-8 md:px-28">
      <BreadCrumb PathName="Product" Path={path} />
      <div className="grid justify-around grid-cols-1 gap-5 mt-10 md:gap-0 md:grid-cols-2">
        <Banner product={productDetails} />
        <Details product={productDetails} />
      </div>
      <div>
        <h2 className="mt-24 mb-4 text-2xl font-medium">Similar Products</h2>
        {similarProductsSuccess ? (
          <ProductsList products={productsList} />
        ) : (
          <div className="w-full h-[400px] flex justify-center items-center">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
