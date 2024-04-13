"use client";
import { AlertOctagon, BadgeCheck, ShoppingCart } from "lucide-react";
import SkeletonProductInfo from "./SkeletonProductInfo";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import {
  useAddToCartMutation,
  useGetCartItemsQuery,
} from "../../../_state/_services/CartApi";

const Details = ({ product }) => {
  const { user } = useUser();
  const router = useRouter();
  const [addToCart] = useAddToCartMutation();
  const { refetch: refetchCart } = useGetCartItemsQuery(
    user?.primaryEmailAddress?.emailAddress
  );

  const handleAddToCart = async () => {
    if (!user) {
      router.push("/sign-in");
    } else {
      await addToCart({
        data: {
          username: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress,
          products: [product?.id],
        },
      });
      refetchCart();
    }
  };
  return (
    <div>
      {product?.id ? (
        <div>
          <h2 className="text-[22px] font-medium">
            {product?.attributes?.title}
          </h2>
          <h2 className="text-[15px] my-2 text-gray-400">
            {product?.attributes?.category}
          </h2>
          <h2 className="text-[14px]">
            {product?.attributes?.description[0]?.children[0].text}
          </h2>
          <h2 className="text-[11px] text-gray-500 flex gap-2 my-3 items-center">
            {product?.attributes?.instantDelivery ? (
              <BadgeCheck className="w-5 h-5 text-green-600" />
            ) : (
              <AlertOctagon />
            )}{" "}
            Eligible For Instant Delivery
          </h2>
          <h2 className="text-[24px] text-primary mb-4">
            $ {product?.attributes?.price}
          </h2>
          <button
            onClick={() => handleAddToCart()}
            className="inline-flex items-center gap-2 rounded px-8 py-3 text-white bg-teal-600 hover:bg-teal-700 transition"
          >
            <ShoppingCart size={20} />
            <span className="text-sm font-medium"> Add To Cart </span>
          </button>
        </div>
      ) : (
        <SkeletonProductInfo />
      )}
    </div>
  );
};

export default Details;
