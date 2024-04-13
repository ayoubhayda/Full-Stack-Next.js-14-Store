import { List } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ product }) => {
  return (
    <Link
      href={`/product-details/${product?.id}`}
      className="bg-gray-800 transition ease-in-out  rounded-lg overflow-hidden text-white hover:scale-105 shadow-md hover:cursor-pointer"
    >
      <div className="relative h-[170px]">
        <Image
          src={product?.attributes?.banner?.data?.attributes?.url}
          alt="banner-card"
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{
            objectFit: "cover",
          }}
        />
      </div>

      <div className="p-3">
        <div>
          <h2 className="text-[14px] font-medium line-clamp-1">
            {product?.attributes?.title}
          </h2>
          <div className="flex items-center justify-between mt-2">
            <h2 className="text-[12px] text-gray-400 flex  gap-1 items-center">
              <List className="w-4 h-4" /> {product?.attributes?.category}
            </h2>
            <h2>${product?.attributes?.price}</h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
