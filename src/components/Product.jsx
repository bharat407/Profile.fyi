/* eslint-disable jsx-a11y/img-redundant-alt */
import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const Product = ({ product }) => {
  const { cart } = useSelector((state) => state);
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(product));
    toast.success("Item Added To Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(product.id));
    toast.success("Item Removed From Cart");
  };

  return (
    <div className="flex flex-col items-center justify-between bg-white transition-transform transform duration-300 ease-in-out gap-5 p-4 w-[90%] mt-10 ml-3 rounded-xl shadow-[rgba(0,_0,_0,_0.64)_0px_3px_8px] hover:scale-105 hover:shadow-[0px_0px_45px_23px_#00000044]">
      <div>
        <h1 className="text-gray-700 font-semibold text-lg text-left truncate mt-1 w-40">
          {product.title}
        </h1>
      </div>
      <div>
        <p className="w-40 text-gray-400 font-normal text-[10px] text-left">
          {product.description.split(" ").slice(0, 10).join(" ") + "..."}
        </p>
      </div>
      <div className="h-[180px]">
        <img
          alt="Product Image"
          src={product.image}
          className="h-full w-full"
        />
      </div>
      <div className="flex justify-between items-center w-full mt-5">
        <p className="text-green-600 font-semibold">${product.price}</p>
        {cart.some((p) => p.id === product.id) ? (
          <button
            className="border-2 border-gray-700 text-gray-700 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-gray-700"
            onClick={removeFromCart}
          >
            Remove Item
          </button>
        ) : (
          <button
            className="border-2 border-gray-700 text-gray-700 uppercase font-semibold px-3 py-1 rounded-full text-[12px] transition-all duration-300 ease-in hover:text-white hover:bg-gray-700"
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
      </div>
    </div>
  );
};

export default Product;
