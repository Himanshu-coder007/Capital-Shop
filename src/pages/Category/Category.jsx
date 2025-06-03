import { useEffect, useLayoutEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";
import Card from "../../components/Card/Card";

const CategoryPage = () => {
  document.title = "Capitl Shop - CategoryPage";
  const { id } = useParams();
  const [fromMoney, setFromMoney] = useState("0");
  const [toMoney, setToMoney] = useState("");
  const [category, setCategory] = useState(id ? id.toString() : "");
  const [reloadData, setReloadData] = useState("1");
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([
    {
      id: 1,
      title: "Loading",
      price: 1,
      description: "Loading",
      category: {},
      images: ["test"],
    },
  ]);
  const location = useLocation();

  useEffect(() => {
    const getCategory = async () => {
      const category = await axiosClient.get('categories?limit=4');
      setCategories(category);
    };
    getCategory();
  }, []);

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const getData = async () => {
      const res = await axiosClient.get(`categories/${category}/products`);
      const result = res.filter(
        (product) =>
          product.price.toString() >= fromMoney &&
          product.price.toString() <= (toMoney === "" ? "999999999" : toMoney)
      );
      setProducts(result);
    };
    getData();
  }, [reloadData]);

  if (localStorage.getItem("test") !== id) {
    localStorage.setItem("test", id || "");
    setReloadData((prep) => prep + 1);
    setCategory(id || "");
  }

  return (
    <div className="font-jost">
      <div className="bg-[#F3EAD8] py-10 flex items-center justify-center flex-col">
        <p className="text-4xl font-semibold">Category</p>
        <div className="flex mt-5">
          <Link
            to="/home"
            className="text-[#74706B] text-sm border-r border-gray-400 pr-3"
          >
            Home
          </Link>
          <p className="pl-3 text-[#74706B] text-sm ">Category</p>
        </div>
      </div>
      <div className="px-20 py-10 grid grid-cols-4">
        <div className=" border border-gray-400 py-20 px-12">
          <select
            id="countries"
            onChange={(e) => {
              setCategory(e.target.value);
            }}
            value={category}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm px-3 rounded-full focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
          >
            <option value={"0"}>Choose a category</option>
            {categories.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
          <div>
            <p className="text-base font-bold mt-7">Filter by Price</p>
            <div className="mt-4 flex">
              <input
                value={fromMoney}
                onChange={(e) => {
                  setFromMoney(e.target.value);
                }}
                type="text"
                className="text-sm p-1 border border-gray-400 max-w-[45%]"
                placeholder="From"
              />
              <p className="text-gray-500 font-bold text-center scale-x-150 px-3">
                -
              </p>
              <input
                value={toMoney}
                onChange={(e) => {
                  setToMoney(e.target.value);
                }}
                type="text"
                className="text-sm p-1 border border-gray-400 max-w-[45%]"
                placeholder="To"
              />
            </div>
            <div
              onClick={() => {
                setReloadData((prep) => prep + 1);
              }}
              className="relative max-w-max px-10 py-2.5 overflow-hidden group bg-primary hover:bg-gradient-to-r hover:from-primary hover:to-primary text-white hover:ring-2 hover:ring-offset-2 hover:bg-primary cursor-pointer flex mx-auto my-6 rounded-full transition-all ease-out duration-300"
            >
              <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
              <span className="relative font-bold">Apply</span>
            </div>
          </div>
        </div>
        <div className="col-span-3 grid-cols-3 grid gap-3 pl-3 ">
          {products.map((item) => (
            <Card product={item} key={item.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;