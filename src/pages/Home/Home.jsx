import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import CategoryBanner from "../../components/Category/Category";
import Hero from "../../components/Hero/Hero";
import Card from "../../components/Card/Card";
import axiosClient from "../../apis/axiosClient";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Image imports
import CustomerImage from "../../assets/images/customer.webp";
import Delivery from "../../assets/images/services1.png";
import Secure from "../../assets/images/services2.png";
import Money from "../../assets/images/services3.png";
import Support from "../../assets/images/services4.png";

const Home = () => {
  document.title = "Capital Shop";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [itemActive, setItemActive] = useState(0);
  const location = useLocation();

  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const getCategory = async () => {
      try {
        const category = await axiosClient.get("categories?limit=4");
        setCategories(category);
        if (category.length > 0) {
          setItemActive(category[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    getCategory();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axiosClient.get(
          `categories/${itemActive}/products?offset=0&limit=10`
        );
        setProducts(res);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    if (itemActive !== 0) {
      fetchProducts();
    }
  }, [itemActive]);

  return (
    <div className="font-jost">
      <Hero />
      <CategoryBanner />

      {/* Trending Section */}
      <div className="px-2 md:px-20">
        <div className="flex justify-between items-center border-b border-gray-300 md:mb-9">
          <p className="text-xl md:text-3xl font-medium pb-4">
            Trending This Week
          </p>
          <div className="hidden md:grid grid-cols-4 gap-5">
            {categories.map((item) => (
              <button
                key={item.id}
                className={`${
                  item.id === 122 ? "hidden" : ""
                } ${itemActive === item.id ? "border-b-4 border-primary" : ""} pb-4 text-center transition-all duration-200`}
                onClick={() => setItemActive(item.id)}
              >
                <p className="text-lg font-medium">{item.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Product Swiper */}
      <div className="md:px-20">
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          navigation={true}
          spaceBetween={10}
          rewind={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="py-7">
                <Card product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Testimonial Section */}
      <div className="mt-10 bg-[#f3ead8] px-2 py-6 md:p-20 flex flex-col items-center justify-center">
        <p className="text-xl md:text-3xl font-semibold">Customer Testimonial</p>
        <p className="text-lg md:text-2xl font-normal md:px-[25%] text-center mt-3 md:mt-10 mb-6">
          Everybody is different, which is why we offer styles for every body.
          Laborum fuga incidunt laboriosam voluptas iure, delectus dignissimos
          facilis neque nulla earum.
        </p>
        <div className="flex items-center">
          <img src={CustomerImage} alt="Customer" className="mr-6" />
          <div>
            <p className="text-base">Petey Cruiser</p>
            <p className="text-lg">Designer at Colorlib</p>
          </div>
        </div>
      </div>

      {/* You May Like Section */}
      <div className="px-2 md:px-20 py-10">
        <p className="text-xl md:text-3xl font-bold text-center">You May Like</p>
        <Swiper
          breakpoints={{
            320: { slidesPerView: 1 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
          }}
          navigation={true}
          spaceBetween={10}
          rewind={true}
          modules={[Navigation, Autoplay]}
          autoplay={{
            delay: 8000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {products.map((item) => (
            <SwiperSlide key={item.id}>
              <div className="py-7">
                <Card product={item} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Services Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 px-2 md:px-20 py-32 bg-[#f6f6f6]">
        {[
          { icon: Delivery, title: "Fast & Free Delivery" },
          { icon: Secure, title: "Secure Payment" },
          { icon: Money, title: "Money Back" },
          { icon: Support, title: "Online Support" },
        ].map((service, index) => (
          <div key={index} className="flex flex-col items-center">
            <img src={service.icon} alt={service.title} />
            <p className="text-base md:text-xl font-medium mt-6">{service.title}</p>
            <p className="text-sm md:text-base font-normal text-[#57667e] mt-2">
              Free delivery on all orders
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
