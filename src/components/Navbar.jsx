import React, { useContext, useEffect, useRef, useState } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import Select from "./Select";
import { MovieContext } from "../context/MovieContext";
import { auth, logout } from "../firebase";
import { signOut } from "firebase/auth";
import { FaHome } from "react-icons/fa";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { AiOutlinePlaySquare } from "react-icons/ai";
import { MdLiveTv } from "react-icons/md";
import { AiFillHeart } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { MdTravelExplore } from "react-icons/md";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const NavBar = () => {
  const { setShowSearch, user, categories, country } = useContext(MovieContext);
  const [visible, setVisible] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showCountry, setShowCountry] = useState(false);
  const [showCategoriesMobile, setShowCategoriesMobile] = useState(false);
  const [showCountryMobile, setShowCountryMobile] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [active, setActive] = useState("");

  const location = useLocation();
  const navRef = useRef();
  const categoryRef = useRef();
  const countryRef = useRef();

  const navigate = useNavigate();

  const handleSelectCategory = (categorySlug) => {
    setSelectedCategory(categorySlug);
  };
  const handleSelectCountry = (countrySlug) => {
    setSelectedCountry(countrySlug);
  };

  const handleLogOut = () => {
    logout();
    signOut(auth);
    localStorage.removeItem("email");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => {
      if (navRef.current) {
        if (window.scrollY >= 80) {
          navRef.current.classList.add("bg-black");
        } else {
          navRef.current.classList.remove("bg-black");
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setShowCategories(false);
      }
      if (countryRef.current && !countryRef.current.contains(event.target)) {
        setShowCountry(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [categoryRef, countryRef]);

  useEffect(() => {
    if (!location.pathname.includes("/the-loai")) {
      setSelectedCategory(null);
    } else {
      setActive(location.pathname.split("/")[2]);
    }
    if (!location.pathname.includes("/quoc-gia")) {
      setSelectedCountry(null);
    } else {
      setActive(location.pathname.split("/")[2]);
    }
  }, [location.pathname]);

  return (
    <div
      ref={navRef}
      className="bg-[linear-gradient(180deg,rgba(0,0,0,0.7)_10%,transparent)] fixed top-0 left-0 right-0 px-4 md:px-[6%] z-50 cur"
    >
      <div className="flex items-center justify-between py-2 font-medium">
        <div className="flex items-center">
          <Link to={"/"}>
            <img
              src={assets.logo_ssoy}
              className="w-20 bg-cover object-cover"
              alt=""
            />
          </Link>
          <ul className="hidden lg:flex pl-10 lg:pl-20 text-sm md:text-base text-[#e5e5e5]">
            <NavLink
              to={"/"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 hover:text-orange-600 ${
                  isActive ? "text-orange-600 border-b border-orange-600" : ""
                }`
              }
            >
              <p>Trang chủ</p>
            </NavLink>
            <NavLink
              to={"/phim-bo"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 hover:text-orange-600 ${
                  isActive ? "text-orange-600 border-b border-orange-600" : ""
                }`
              }
            >
              <p>Phim bộ</p>
            </NavLink>
            <NavLink
              to={"/phim-le"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 hover:text-orange-600 ${
                  isActive ? "text-orange-600 border-b border-orange-600" : ""
                }`
              }
            >
              <p>Phim lẻ</p>
            </NavLink>
            <NavLink
              to={"/tv-shows"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 hover:text-orange-600 ${
                  isActive ? "text-orange-600 border-b border-orange-600" : ""
                }`
              }
            >
              <p>Tv show</p>
            </NavLink>
            <NavLink
              to={"/hoat-hinh"}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 py-1 px-2 hover:text-orange-600 ${
                  isActive ? "text-orange-600 border-b border-orange-600" : ""
                }`
              }
            >
              <p>Anime</p>
            </NavLink>
            <button
              ref={categoryRef}
              onClick={() => setShowCategories(!showCategories)}
              className={`flex flex-col items-center relative gap-1 py-1 px-2 ${
                selectedCategory
                  ? "text-orange-600 border-b border-orange-600"
                  : ""
              }`}
            >
              <p>Thể loại</p>
              <div
                className={`absolute left-0 top-full mt-1 ${
                  showCategories ? "block" : "hidden"
                }`}
              >
                <Select
                  data={categories}
                  name={"/the-loai"}
                  selected={selectedCategory}
                  onSelect={handleSelectCategory}
                />
              </div>
            </button>
            <button
              ref={countryRef}
              onClick={() => setShowCountry(!showCountry)}
              className={`flex flex-col items-center relative gap-1 py-1 px-2 ${
                selectedCountry
                  ? "text-orange-600 border-b border-orange-600"
                  : ""
              }`}
            >
              <p>Quốc gia</p>
              <div
                className={`absolute left-0 top-full mt-1 ${
                  showCountry ? "block" : "hidden"
                }`}
              >
                <Select
                  data={country}
                  name={"/quoc-gia"}
                  selected={selectedCountry}
                  onSelect={handleSelectCountry}
                />
              </div>
            </button>
          </ul>
        </div>

        <div className="flex items-center gap-6 text-sm text-[#e5e5e5]">
          <div className="flex gap-2 items-center">
            <img
              onClick={() => setShowSearch(true)}
              src={assets.search_icon1}
              className="w-6 cursor-pointer"
              alt=""
            />
          </div>

          <div className="flex gap-2 cursor-pointer relative group">
            <img
              src={assets.profile_img}
              alt=""
              className="w-7 cursor-pointer"
            />
            <img src={assets.caret_icon} alt="" />
            <div className="dropdown absolute top-full rounded-md right-0 w-[max-content] bg-[#191919] p-2 hidden group-hover:block">
              {!user ? (
                <div className="cursor-pointer text-xs px-4 py-3 hover:bg-[#333] rounded-md hover:text-orange-600">
                  <p onClick={() => navigate("/login")}>Đăng nhập</p>
                </div>
              ) : (
                <div>
                  <p
                    className="cursor-pointer text-xs px-4 py-3 hover:bg-[#333] rounded-md hover:text-orange-600"
                    onClick={() => handleLogOut()}
                  >
                    Đăng xuất
                  </p>
                  <p
                    className="cursor-pointer text-xs px-4 py-3 hover:bg-[#333] rounded-md hover:text-orange-600"
                    onClick={() => navigate("/phim-yeu-thich")}
                  >
                    Phim yêu thích
                  </p>
                </div>
              )}
            </div>
          </div>
          <img
            onClick={() => setVisible(true)}
            src={assets.menu_icon_white}
            className="w-7 cursor-pointer lg:hidden"
            alt=""
          />
        </div>
        {/* Sidebar small */}
        <div
          onClick={() => setVisible(false)}
          className={`fixed top-0 right-0 bottom-0 bg-[#000] bg-opacity-50 transition-all flex justify-end ${
            visible ? "left-0" : ""
          }`}
        ></div>
        <div
          className={`fixed top-0 right-0 bottom-0 overflow-y-auto transition-all bg-[#181818] ${
            visible ? "w-full min-[350px]:w-[320px] sm:w-[400px] p-5" : "w-0"
          }`}
        >
          <IoMdCloseCircleOutline
            onClick={() => setVisible(false)}
            className={`w-8 h-8 text-white absolute top-4 right-4 cursor-pointer select-none ${
              visible ? "block" : "hidden"
            }`}
          />

          <div className="flex flex-col text-[#989899] ">
            <img
              // onClick={() => setVisible(false)}
              src={assets.logo_ssoy}
              className="w-20 cursor-pointer mb-4"
              alt=""
            />
            <div className="w-full h-auto flex flex-col gap-1">
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2  flex gap-1 items-center rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                    isActive ? "text-orange-600 bg-[#000]" : ""
                  }`
                }
                to={"/trang-chu"}
              >
                <FaHome className="w-5 text-inherit" />

                <p>Trang chủ</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 flex gap-1 items-center rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                    isActive ? "text-orange-600 bg-[#000]" : ""
                  }`
                }
                to={"/phim-bo"}
              >
                <BsFillCameraVideoFill className="w-5 text-inherit" />

                <p>Phim bộ</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 flex gap-1 items-center rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                    isActive ? "text-orange-600 bg-[#000]" : ""
                  }`
                }
                to={"/phim-le"}
              >
                <AiOutlinePlaySquare className="w-5 text-inherit" />

                <p>Phim lẻ</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 flex gap-1 items-center rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                    isActive ? "text-orange-600 bg-[#000]" : ""
                  }`
                }
                to={"/tv-shows"}
              >
                <MdLiveTv className="w-5 text-inherit" />

                <p>Tv show</p>
              </NavLink>
              <NavLink
                onClick={() => setVisible(false)}
                className={({ isActive }) =>
                  `py-2 flex gap-1 items-center rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                    isActive ? "text-orange-600 bg-[#000]" : ""
                  }`
                }
                to={"/hoat-hinh"}
              >
                <AiFillHeart className="w-5 text-inherit" />

                <p>Anime</p>
              </NavLink>
              <button
                onClick={() => setShowCategoriesMobile(!showCategoriesMobile)}
                className={`py-2 w-full flex gap-1 items-center justify-between rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                  showCategoriesMobile ||
                  location.pathname.includes("/the-loai")
                    ? "text-orange-600 bg-[#000]"
                    : ""
                }`}
                to={"/the-loai"}
              >
                <div className="flex items-center gap-1">
                  <BiCategory className="w-5 text-inherit" />
                  <p>Thể loại</p>
                </div>
                <IoIosArrowDown
                  className={`w-5 transition-all duration-300 ${
                    showCategoriesMobile ? "rotate-180" : ""
                  }`}
                />
              </button>
              {showCategoriesMobile ? (
                <div className="flex flex-col gap-2 p-3 overflow-y-scroll max-h-[400px] bg-[#111]">
                  {categories &&
                    categories.map((item) => (
                      <div
                        key={item?._id}
                        onClick={() => {
                          navigate(`/the-loai/${item?.slug}`, {
                            state: { name: item?.name },
                          });
                          setVisible(false);
                          setShowCategoriesMobile(false);
                        }}
                        className={`px-3 py-2 hover:px-2 transition-all duration-200 hover:text-orange-600 hover:border-r-2 hover:border-orange-600 rounded-r-lg cursor-pointer ${
                          active === item?.slug
                            ? "text-orange-600 border-r-2 border-orange-600 rounded-r-lg"
                            : ""
                        }`}
                      >
                        {item?.name}
                      </div>
                    ))}
                </div>
              ) : null}
              <button
                onClick={() => setShowCountryMobile(!showCountryMobile)}
                className={`py-2 w-full flex gap-1 items-center justify-between rounded-md px-3 hover:text-orange-600 transition-all duration-300 ${
                  showCountryMobile || location.pathname.includes("/quoc-gia")
                    ? "text-orange-600 bg-[#000]"
                    : ""
                }`}
                to={"/quoc-gia"}
              >
                <div className="flex items-center gap-1">
                  <MdTravelExplore className="w-5 text-inherit" />
                  <p>Quốc gia</p>
                </div>
                <IoIosArrowDown className="w-5" />
              </button>
              {showCountryMobile ? (
                <div className="flex flex-col gap-2 p-3 overflow-y-scroll max-h-[400px] bg-[#111]">
                  {country &&
                    country.map((item) => (
                      <div
                        key={item?._id}
                        onClick={() => {
                          navigate(`/quoc-gia/${item?.slug}`, {
                            state: { name: item?.name },
                          });
                          setVisible(false);
                          setShowCountryMobile(false);
                        }}
                        className={`px-3 py-2 hover:px-1 transition-all duration-200 ease-linear hover:text-orange-600 hover:border-r-2 hover:border-orange-600 rounded-r-lg cursor-pointer ${
                          active === item?.slug
                            ? "text-orange-600 border-r-2 border-orange-600 rounded-r-lg"
                            : ""
                        }`}
                      >
                        {item?.name}
                      </div>
                    ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
