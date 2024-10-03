import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
import TitleCards from "../components/TitleCards";
import Slider from "../components/Slider";
import SliderImage from "../components/SliderImage";
import axios from "axios";

const Home = () => {
  const [slider, setSlider] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(
      `https://ophim1.com/v1/api/danh-sach/phim-moi-cap-nhat?page=1`
    );
    setSlider(response.data.data.items);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="">
      <div className="w-full h-auto flex relative mt-[-80px] lg:mb-80">
        <img src={assets.hero_banner1} alt="" className="banner-img" />
        {/* <div className="absolute w-full bottom-0 lg:bottom-[-25%] xl:bottom-[-10%] pl-[6%]"> */}
        <div className="absolute w-full top-[40%] sm:top-[20%] pl-[6%]">
          <img
            src={assets.hero_title}
            alt=""
            className=" hidden sm:block w-[40%] md:w-[90%] max-w-[420px] mb-7"
          />
          <p className="max-w-[700px] hidden min-[420px]:block text-xs sm:text-sm md:text-base pb-3 sm:pb-5 text-white">
            After lesbian couple Meg and Kayla split following a traumatic
            homophobic incident, their three friends are intent on mending the
            rift during the wedding of Lizzie at a paradise resort. But a
            pre-wedding boat excursion turns to disaster and the wedding
            breakfast is likely to be the five girls!
          </p>
          <div className="hidden min-[420px]:flex gap-2.5 mb-7">
            <Link
              to={`/chi-tiet/lan-nuoc-tu-than`}
              className=" bg-white flex items-center px-3 sm:px-5 py-2 rounded text-sm sm:text-base font-semibold sm:font-bold hover:bg-[#ffffffbf]"
            >
              <img className="w-4 sm:w-6 mr-1" src={assets.play_icon} alt="" />
              Play
            </Link>
            <Link
              to={`/chi-tiet/lan-nuoc-tu-than`}
              className=" bg-[#6d6d6eb3] flex items-center px-3 sm:px-5 py-2 rounded ml-5 text-sm sm:text-base font-semibold sm:font-bold text-white hover:bg-[#6d6d6e66]"
            >
              <img className="w-4 sm:w-6 mr-1" src={assets.info_icon} alt="" />
              More Info
            </Link>
          </div>
          <div className="pr-[6%] hidden lg:block">
            <SliderImage slider={slider} title={"Phim mới cập nhật"} />
          </div>
        </div>
      </div>
      <div className="px-4 md:px-[6%] lg:hidden">
        <SliderImage slider={slider} title={"Phim mới cập nhật"} />
      </div>
      <div className="pl-4 md:pl-[6%] pb-20">
        <TitleCards url={"phim-moi-cap-nhat"} title={"phim hot"} />
        <TitleCards url={"phim-le"} title={"Phim lẻ"} />
        <TitleCards url={"tv-shows"} title={"tv show"} />
        <TitleCards url={"hoat-hinh"} title={"hoạt hình"} />
        <TitleCards url={"phim-bo"} title={"phim bộ"} />
      </div>
    </div>
  );
};

export default Home;
