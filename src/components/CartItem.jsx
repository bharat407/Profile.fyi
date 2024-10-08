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
    <div className="flex flex-col p-4 md:p-5 justify-between mt-2 mb-2 mx-2 md:mx-5 border-b-[2px] border-slate-300 md:border-slate-500">
      <div className="flex flex-col md:flex-row items-start md:items-center md:gap-6">
        <div className="w-full md:w-[35%] flex justify-center mb-4 md:mb-0">
          <img
            alt=""
            src={item.image}
            className="w-[50%] h-auto object-cover"
          />
        </div>
        <div className="w-full md:w-[60%] md:ml-6">
          <h1 className="text-lg md:text-xl text-slate-800 font-semibold mb-2">
            {item.title}
          </h1>
          <p className="text-sm md:text-base text-slate-600 mb-2">
            {truncateText(item.description, 80)}{" "}
            {/* Adjust 80 to your preferred length */}
          </p>
          <p className="text-green-600 font-bold text-base md:text-lg mb-2">
            ${item.price}
          </p>
          <div className="flex items-center justify-between mt-3 md:mb-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleQuantityChange(quantity - 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm md:text-base"
              >
                -
              </button>
              <p className="text-base md:text-lg font-medium">{quantity}</p>
              <button
                onClick={() => handleQuantityChange(quantity + 1)}
                className="px-2 py-1 bg-gray-200 text-gray-700 rounded-md text-sm md:text-base"
              >
                +
              </button>
            </div>
            <button
              className="text-red-700 bg-red-200 hover:bg-red-400 transition-transform duration-300 cursor-pointer rounded-full p-2 md:p-3"
              onClick={removeFromCart}
            >
              <AiFillDelete className="text-lg md:text-xl" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
