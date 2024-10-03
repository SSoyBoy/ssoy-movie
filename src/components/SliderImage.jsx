import React, { useState } from "react";
import Carousel from "react-multi-carousel";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 7,
  },
  desktopx: {
    breakpoint: { max: 3000, min: 2000 },
    items: 6,
  },
  desktop: {
    breakpoint: { max: 2000, min: 1024 },
    items: 5,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 4,
  },
  mobileX: {
    breakpoint: { max: 768, min: 640 },
    items: 3,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 2,
  },
};

const CustomLeftArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute left-0 top-1/2 transform -translate-y-1/2 hover:bg-gradient-to-r from-gray-700 to-black select-none bg-gray-800  p-2 rounded-xl z-10"
    >
      <img src={assets.dropdown_icon} className="h-6 rotate-180" alt="" />
    </button>
  );
};

const CustomRightArrow = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 hover:bg-gradient-to-r from-black to-gray-700 select-none p-2 rounded-xl z-10"
    >
      <img src={assets.dropdown_icon} className="h-6 rotate-360" alt="" />
    </button>
  );
};

const SliderImage = ({ slider, title }) => {
  const [imageLoaded, setImageLoaded] = useState({});

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return slider ? (
    <>
      <div className="flex py-4 items-center">
        <h2 className="text-sm sm:text-xl font-bold uppercase bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent">
          {title ? title : "Phim hot"}
        </h2>
      </div>
      <Carousel
        swipeable={false}
        draggable={true}
        responsive={responsive}
        ssr={true}
        infinite={true}
        autoPlaySpeed={3000}
        keyBoardControl={true}
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        autoPlay={true}
      >
        {slider.map((item, index) => {
          return (
            <div
              key={index}
              className={`px-1 2xl:px-2 cursor-ew-resize h-full`}
            >
              <Link
                to={`/chi-tiet/${item.slug}`}
                className="text-gray-700 cursor-pointer block h-full"
              >
                <div className="relative group rounded-md h-full flex flex-col">
                  <div className="overflow-hidden rounded-md flex-1">
                    <img
                      src={
                        `https://img.ophim.live/uploads/movies/` +
                        item.thumb_url
                      }
                      className={`group-hover:scale-110 transition-all ease-in-out duration-500 rounded-md h-full w-full object-cover ${
                        imageLoaded[index]
                          ? "opacity-100 blur-none"
                          : "opacity-0 blur-md transition-all duration-500"
                      }`}
                      alt=""
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className="mt-auto flex flex-col text-sm">
                    <p className=" text-white text-center font-semibold truncate pt-3 hover:text-orange-600">
                      {item.name}
                    </p>
                    <span className="text-[#999696] text-center truncate">
                      {item.origin_name}
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </Carousel>
    </>
  ) : null;
};
export default SliderImage;
