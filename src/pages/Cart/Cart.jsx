import { useDispatch, useSelector } from "react-redux";
import { getAllItemFromCart } from "../../redux/selectors";
import axiosClient from "../../apis/axiosClient";
import { useEffect, useState } from "react";
import CartSlice from "../../components/Cart/CartSlice";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const CartPage = () => {
  document.title = "Capitl Shop - CartPage";

  const [items, setItems] = useState([]);
  const item = useSelector(getAllItemFromCart);
  const dispatch = useDispatch();

  useEffect(() => {
    setItems([]);
    const getItemFromId = (item) => {
      item.forEach(async (element) => {
        const res = await axiosClient.get(`products/${element.id}`);
        setItems((prep) => [
          ...prep,
          {
            id: res.id,
            name: res.title,
            price: res.price,
            quantity: element.quantity,
          },
        ]);
      });
    };
    getItemFromId(item);
  }, [item]);

  return (
    <div className="font-jost min-h-[150vh]">
      <div className="bg-[#F3EAD8] py-10 flex items-center justify-center flex-col">
        <p className="text-4xl font-semibold">Cart</p>
        <div className="flex mt-5">
          <Link
            to="/home"
            className="text-[#74706B] text-sm border-r border-gray-400 pr-3"
          >
            Home
          </Link>
          <p className="pl-3 text-[#74706B] text-sm">Cart</p>
        </div>
      </div>
      <div className="px-2 md:px-20 py-6 grid grid-cols-12 bg-white">
        <div className="col-span-7 text-sm font-medium">
          <p>Product</p>
        </div>
        <div className="col-span-2 text-sm font-medium">
          <p>Price</p>
        </div>
        <div className="col-span-2 text-sm font-medium">
          <p>Quantity</p>
        </div>
        <div className="col-span-1 text-sm font-medium">
          <p>Total</p>
        </div>
      </div>
      {item.length === 0 ? (
        <div className="flex h-[100vh] py-32 justify-center">
          <p className="text-5xl font-medium text-gray-400">Cart Empty</p>
        </div>
      ) : (
        ""
      )}
      {items.map((item) => (
        <div
          key={item.id}
          className="mx-2 md:mx-20 grid grid-cols-12 bg-white py-4 border-b border-gray-200"
        >
          <div className="col-span-7 text-sm md:text-base font-normal md:pl-3 border-l border-gray-200 flex items-center">
            <p>{item.name}</p>
          </div>
          <div className="col-span-2 text-sm md:text-base font-normal flex items-center">
            <p>{item.price + "$"}</p>
          </div>
          <div className="col-span-2 text-sm md:text-base font-normal flex max-h-[80%]">
            <div className="border border-gray-300 min-w-[50%] flex items-center justify-center">
              {item.quantity}
            </div>

            <div className="max-w-[50%] flex flex-col">
              <button
                className="border border-gray-300 min-h-[50%] md:px-4"
                onClick={(e) => {
                  dispatch(
                    CartSlice.actions.addCart({
                      id: item.id.toString(),
                      quantity: 1,
                    })
                  );
                }}
              >
                +
              </button>
              <button
                className="border border-gray-300 min-h-[50%] md:px-4"
                onClick={() => {
                  dispatch(
                    CartSlice.actions.delCart({
                      id: item.id.toString(),
                      quantity: 1,
                    })
                  );
                }}
              >
                -
              </button>
            </div>
          </div>
          <div className="col-span-1 text-sm md:text-base font-normal flex items-center">
            <p>{item.quantity * item.price + "$"}</p>
          </div>
        </div>
      ))}
      {item.length !== 0 ? (
        <div className="flex w-full justify-end md:px-20 pt-7 md:pt-20">
          <button
            onClick={() => {
              dispatch(CartSlice.actions.checkout());
              toast.success("Payment is Successful.", {
                position: "top-right",
                autoClose: 3000,
              });
            }}
            className="px-6 py-3 rounded-md bg-primary cursor-pointer text-white"
          >
            Checkout
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default CartPage;