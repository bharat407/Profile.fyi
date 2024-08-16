import { AiFillDelete } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { remove, updateQuantity } from "../redux/Slices/cartSlice";

// Utility function to truncate text
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const removeFromCart = () => {
    dispatch(remove(item.id));
    toast.success("Item Removed From Cart");
  };

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart();
    } else {
      setQuantity(newQuantity);
      dispatch(updateQuantity({ id: item.id, quantity: newQuantity }));
    }
  };

  return (
    <div className="flex flex-col p-5 justify-between mt-2 mb-2 mx-5 border-b-[3px] border-slate-500 sm:mx-3">
      <div className="flex flex-col sm:flex-row sm:gap-5 items-center">
        <div className="w-full sm:w-[35%] mb-4 sm:mb-0">
          <img alt="" src={item.image} className="w-full h-auto object-cover" />
        </div>
        <div className="w-full sm:w-[65%] ml-0 sm:ml-5">
          <h1 className="text-lg sm:text-xl text-slate-700 font-semibold">
            {item.title}
          </h1>
          <p className="text-sm sm:text-base text-slate-700 font-medium">
            {truncateText(item.description, 80)}{" "}
            {/* Adjust 80 to your preferred length */}
          </p>
          <p className="text-green-600 font-bold text-base sm:text-lg">
            ${item.price}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5 mt-2">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm sm:text-base"
              >
                -
              </button>
              <p className="text-base sm:text-lg font-medium">{quantity}</p>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm sm:text-base"
              >
                +
              </button>
            </div>

            <button
              className="text-red-800 bg-red-200 group hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-2 sm:p-3 mr-3"
              onClick={removeFromCart}
            >
              <AiFillDelete className="text-lg sm:text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
