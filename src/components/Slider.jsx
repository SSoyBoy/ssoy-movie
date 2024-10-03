import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Slider = () => {
  const [counter, setCounter] = useState(0);
  const [size, setSize] = useState(null);
  const [slider, setSlider] = useState([]);

  const slideRef = useRef(null);

  const fetchData = async () => {
    const response = await axios.get(
      `https://ophim1.com/v1/api/danh-sach/phim-bo?page=1`
    );
    setSlider(response.data.data.items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (slideRef.current && slideRef.current.children.length > 0) {
      setSize(slideRef.current.children[0].offsetParent.clientWidth);
    }
  }, [counter, size, slider, slideRef.current]);

  const nextSlide = () => {
    if (counter > slider.length - 4) return;
    setCounter(counter + 1);
  };

  const prevSlide = () => {
    if (counter <= -1) return;
    setCounter(counter - 1);
  };

  return (
    <>
      <div className="relative">
        <div className="select-none m-auto overflow-hidden">
          <div
            className="flex w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 transition-all duration-300 ease-in-out"
            ref={slideRef}
            style={{ transform: `translateX(${-size * counter}px)` }}
          >
            {slider.map((item, index) => {
              return (
                <div key={index} className={`min-w-full pr-4 text-white`}>
                  <Link
                    to={`/product/${item._id}`}
                    className="text-gray-700 cursor-pointer"
                  >
                    <div className="relative group rounded-md">
                      <div className="overflow-hidden rounded-md">
                        <img
                          src={
                            `https://img.ophim.live/uploads/movies/` +
                            item.thumb_url
                          }
                          className="group-hover:scale-110 transition ease-in-out duration-500 rounded-md"
                          alt=""
                        />
                      </div>
                      <div className="">
                        <p className="text-sm font-semibold text-center text-[#999696] truncate pt-3 px-2 pb-1 hover:text-orange-600">
                          {item.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
        <button
          disabled={counter === 0}
          className="absolute text-black disabled:opacity-60 disabled:cursor-not-allowed p-2 rounded-full bg-gradient-to-r from-yellow-600 to-orange-600 left-3 top-[45%] text-2xl select-none"
          onClick={prevSlide}
        >
          <img src={assets.dropdown_icon} className="h-6 rotate-180" alt="" />
        </button>
        <button
          disabled={counter === slider.length - 4}
          className="absolute text-black disabled:opacity-60 disabled:cursor-not-allowed p-2 rounded-xl bg-gradient-to-r from-yellow-600 to-orange-600 right-3 top-[45%] text-2xl select-none"
          onClick={nextSlide}
        >
          <img src={assets.dropdown_icon} className="h-6 rotate-360" alt="" />
        </button>
      </div>
    </>
  );
};
export default Slider;
