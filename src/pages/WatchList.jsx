import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deleteFromWatchList, getWatchlist } from "../firebase";
import { assets } from "../assets/assets";
import { MovieContext } from "../context/MovieContext";

const WatchList = () => {
  const { urlImage, loading, watchList, setWatchList } =
    useContext(MovieContext);
  const navigate = useNavigate();

  const handleRemove = async (id) => {
    await deleteFromWatchList(id);

    const updatedWatchList = await getWatchlist();
    setWatchList(updatedWatchList);
  };

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <img className="w-16" src={assets.netflix_spinner} alt="" />
      </div>
    );
  }

  console.log("loading", loading);

  return (
    <>
      <div className="w-full px-4 md:px-[6%] text-white">
        <h2 className="text-sm sm:text-xl font-bold uppercase bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent mb-4">
          Danh sách yêu thích
        </h2>
        {watchList && watchList.length > 0 ? (
          watchList.map((item, index) => (
            <div
              key={index}
              className="flex relative xp-2 py-3 mx-1 rounded-lg cursor-pointer hover:shadow-lg transition-all hover:mx-0 hover:shadow-gray-700"
            >
              <div
                className="remove absolute top-2.5 right-2.5 sm:top-5 sm:right-5 p-1 group rounded-md flex cursor-pointer items-center justify-center"
                onClick={() => handleRemove(item.movieId)}
              >
                <div className="w-4 h-1 sm:w-5 sm:h-1.5 bg-white group-hover:bg-green-500"></div>
              </div>
              <div
                className="w-[15%] flex justify-center items-center"
                onClick={() => navigate(`/chi-tiet/${item.slug}`)}
              >
                <img
                  className="w-full sm:w-full rounded-md"
                  src={`${urlImage}` + item?.thumb_url}
                  alt=""
                  loading="lazy"
                />
              </div>
              <div className="w-[85%] text-xs sm:text-sm md:text-base lg:text-lg px-2 sm:px-4">
                <h2
                  className="cursor-pointer flex hover:text-orange-600 p-0 text-white text-sm sm:text-base lg:text-xl sm:mb-2 lg:mb-4 font-semibold"
                  onClick={() => navigate(`/chi-tiet/${item.slug}`)}
                >
                  {item?.title}{" "}
                  <p className="text-[#989899] ml-1">({item?.year})</p>
                </h2>
                <p>{item?.releaseDate?.split("-")[0]}</p>
                <div className="overview">
                  <h3 className="sm:mb-1 lg:mb-2">Overview</h3>
                  <p className=" sm:text-sm md:text-base text-[#989899] truncate md:whitespace-normal">
                    {item?.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full bg-[#181818] border border-[#e8a568] p-2.5">
            Danh sách của bạn đang trống!
          </div>
        )}
      </div>
    </>
  );
};

export default WatchList;
