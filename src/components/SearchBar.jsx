import React, { useContext, useEffect, useState } from "react";
import { assets } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";
import axios from "axios";

const SearchBar = () => {
  const { showSearch, setShowSearch, search, setSearch, urlImage } =
    useContext(MovieContext);
  const [searchData, setSearchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState({});

  const navigate = useNavigate();

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSearch(false);
      navigate(`/tim-kiem?keyword=${search}`);
    }
  };

  const fetchSearchValue = async () => {
    setLoading(true);
    const response = await axios.get(
      `https://ophim1.com/v1/api/tim-kiem?keyword=${search}&page=1`
    );
    setSearchData(response.data.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchSearchValue();
  }, [search]);

  return showSearch ? (
    <>
      <div
        style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
        onClick={() => setShowSearch(false)}
        className="fixed top-0 left-0 bottom-0 right-0 z-40 cursor-pointer"
      ></div>
      <div className="fixed top-[8%] left-[6%] bottom-[8%] right-[6%] sm:top-[10%] sm:left-[20%] sm:bottom-[10%] sm:right-[20%] flex z-50 items-center justify-center">
        <div className="bg-[#181818] w-full h-full rounded-lg">
          <div className="flex justify-between items-center rounded-xl m-2 border border-gray-300">
            <div className="inline-flex w-full text-white items-center justify-center  px-3 py-2 ">
              <img className="w-4 mr-2" src={assets.search_icon1} alt="" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="flex-1 outline-none w-full bg-inherit text-sm border-none"
                type="text"
                onKeyDown={handleKeyDown}
                placeholder="Tìm kiếm theo tên"
              />
            </div>
            {loading ? (
              <img
                className="w-5 h-5 animate-spin mr-2"
                src={assets.loading_icon}
                alt=""
              />
            ) : (
              <div
                onClick={() => setSearch("")}
                className="px-2 py-2 flex items-center justify-center"
              >
                <img
                  src={assets.cross_icon}
                  className="inline w-4 cursor-pointer"
                  alt=""
                />
              </div>
            )}
          </div>
          <div className="w-full h-[90%] overflow-y-scroll sm:px-2">
            {searchData.items && searchData?.items?.length > 0 ? (
              searchData?.items.map((item, index) => (
                <div
                  key={index}
                  onClick={() => {
                    navigate(`/chi-tiet/${item?.slug}`);
                    setShowSearch(false);
                    setSearch("");
                  }}
                  className="flex p-2 mx-2 rounded-lg items-center cursor-pointer hover:shadow-lg transition-all hover:mx-0 hover:shadow-gray-700"
                >
                  <div>
                    <img
                      className={`w-14 sm:w-20 rounded-md ${
                        imageLoaded[index]
                          ? "opacity-100 blur-none"
                          : "opacity-0 blur-md transition-all duration-500"
                      }`}
                      src={`${urlImage}` + item?.thumb_url}
                      alt=""
                      loading="lazy"
                      onLoad={() => handleImageLoad(index)}
                    />
                  </div>
                  <div className="w-[80%] text-xs sm:text-sm md:text-base px-4">
                    <p className="text-white">{item?.name}</p>
                    <p className="text-[#989899]">{item?.origin_name}</p>
                    <p className="text-[#989899]">{item?.content}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full flex justify-center text-white pt-4">
                Không tìm thấy kết quả nào.
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default SearchBar;
