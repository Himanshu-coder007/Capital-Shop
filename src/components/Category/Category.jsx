import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../apis/axiosClient";

const CategoryBanner = () => {
  const [Category, setCategorys] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const getCategory = async () => {
      const category = await axiosClient.get('categories?limit=4');
      setCategorys(category);
    };
    getCategory();
  }, []);
  
  return (
    <>
      <p className="text-xl md:text-3xl font-jost text-center pt-6 font-medium">
        Category
      </p>
      <div className="px-2 md:px-20 pt-7 pb-44 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 font-jost gap-5">
        {Category.map((item) => (
          <div
            className={`${
              item.id === 5 ? "hidden" : ""
            } grid-cols-1 relative group overflow-hidden`}
            key={item.id}
            onClick={() => {
              navigate(`/category/${item.id}`);
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="group-hover:scale-110 transition-all duration-500"
            />
            <div className="absolute w-full p-1 flex flex-col items-center justify-center bottom-0 z-40 group-hover:bottom-3 md:group-hover:bottom-10 transition-all duration-500">
              <p className="font-bold text-lg md:text-2xl mb-4 text-center cursor-pointer text-white">
                {item.name}
              </p>
              <p className="text-center cursor-pointer opacity-0 text-base text-[#cebd9c] p-[1px] border-b hover:scale-x-110 group-hover:opacity-100 transition-all duration-300">
                Shop now
              </p>
            </div>
            <div className="absolute w-full h-[50%] bottom-0 bg-gradient-to-t from-[#292621] to-[#29262100]"></div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategoryBanner;