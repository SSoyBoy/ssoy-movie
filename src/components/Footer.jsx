import React from "react";
import { assets } from "../assets/assets";
import { AiFillYoutube, AiOutlineTwitter } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { TbBrandSlack } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";

const Services = [
  "Home - Trang chủ",
  "Tv Series -Phim bộ",
  "Movie - Phim lẻ",
  "Anime - Hoạt hình",
];

const Footer = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="w-full px-4 md:px-[6%]">
        {/*  */}
        <div className="px-0 pt-10">
          <div
            className=" mx-auto w-full justify-center m-0 
             "
          >
            <div className="flex flex-wrap">
              <div className="w-1/4 text-gray-300 text-base px-3 mb-10 max-lg:w-1/2 max-sm:w-full">
                <div className="block">
                  <img
                    onClick={() => navigate("/")}
                    src={assets.logo_ssoy}
                    className="mb-5 w-20 h-10 bg-cover object-cover cursor-pointer"
                    alt=""
                  />
                  <p className="mt-7 mr-5 block ">
                    Tất cả nội dung của trang web này không cung cấp phát trực
                    tuyến chính hãng. Nếu quyền lợi của bạn bị vi phạm, vui lòng
                    thông báo cho chúng tôi!
                  </p>
                </div>
                <div className="mt-6 flex flex-wrap -m-2">
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-white border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <FaLinkedinIn className="text-white h-4 w-4 hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-white border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <AiOutlineTwitter className="text-white hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-white border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <AiFillYoutube className="text-white hover:scale-105" />
                  </Link>
                  <Link
                    // to="/"
                    className="border-2 rounded-full border-white border-solid h-9 w-9 m-2 items-center 
                            flex justify-center duration-300 ease-linear hover:scale-105 hover:border-orange-600 text-xl font-medium"
                  >
                    <TbBrandSlack className="text-white hover:scale-105" />
                  </Link>
                </div>
              </div>
              <div className="w-1/4 text-gray-300 text-base px-3 mb-10 max-lg:w-1/2 max-sm:w-full">
                <div className="block">
                  <h2 className="text-xl mb-9 text-white font-bold">
                    Sản phẩm
                  </h2>
                  <ul className="m-0 p-0">
                    {Services.map((e, idx) => {
                      return (
                        <li key={idx} className="mb-5 hover:text-orange-600">
                          <Link to={`/${e}`} className="">
                            {e}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
              <div className="w-1/4 text-gray-300 text-base px-3 mb-10 max-lg:w-1/2 max-sm:w-full">
                <div className="block">
                  <h2 className="text-xl mb-9 text-white font-bold">Liên hệ</h2>
                  <ul className="m-0 p-0">
                    <li className="mb-5">+88 888 8888 8888</li>
                    <li className="mb-5">ssoy@phimhay.com</li>
                    <li className="mb-5">
                      50 Đường ABC, phim hay
                      <br />
                      City, Việt Nam
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-1/4 text-gray-300 text-base px-3 mb-10 max-lg:w-1/2 max-sm:w-full">
                <div className="block">
                  <h2 className="text-xl mb-9 text-white font-bold">
                    Subscribe
                  </h2>
                  <div className="mt-1.5 block ">
                    <form className="relative block">
                      <input
                        type="email"
                        placeholder="ssoy@phimhay.com"
                        className="bg-black rounded-xl text-white h-12 py-1.5 pl-4 pr-22 w-full outline-0
                                  max-lg:pr-20"
                      ></input>
                      <div className="absolute right-1 top-1">
                        <button
                          className="bg-orange-600 rounded-xl text-white font-semibold overflow-hidden py-2 px-6 group cursor-pointer
                                   max-lg:w-16 max-lg:px-4 relative"
                        >
                          <span>Send</span>
                          <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-full transition-all rounded-xl bg-[rgba(0,0,0,0.3)]"></div>
                        </button>
                      </div>
                    </form>
                    <div className="mt-6 block ">
                      Nếu quyền lợi của bạn bị vi phạm chúng tôi sẽ xóa nội dung
                      vi phạm kịp thời, cảm ơn sự hợp tác của bạn!
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*  */}
        {/*  */}
        <div className="max-w-7xl mx-auto w-full block px-3 max-2xl:max-w-7xl max-xl:max-w-5xl max-lg:max-w-3xl max-md:max-w-xl">
          <div
            className="border-t border-solid border-gray-400 flex flex-wrap justify-between py-5
              max-md:items-center max-md:flex-col max-md:justify-center max-md:text-center"
          >
            <div className="py-1 block ">
              <div className="text-gray-300 text-base">
                Copyright © 2024 Ssoy.
              </div>
            </div>
            <div className="py-1 block text-gray-300 text-base">
              <ul className="flex flex-wrap m-0 p-0">
                <li className="pr-3 hover:text-orange-600">
                  <Link to="">Terms of Use</Link>
                </li>
                |
                <li className="pl-3 hover:text-orange-600">
                  <Link to="">Privacy Policy</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default Footer;
