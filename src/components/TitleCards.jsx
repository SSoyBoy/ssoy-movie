import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SkeletonCard = () => {
  return (
    <div className="relative w-40 md:w-[200px] overflow-hidden rounded-md animate-pulse">
      <div className="bg-gray-700 rounded-md w-full h-60 md:h-[300px]"></div>
      <div className="absolute bottom-0 right-0 left-0 py-1 px-2 flex justify-end text-end text-white">
        <div className="bg-gray-700 h-4 w-3/4 rounded"></div>
      </div>
    </div>
  );
};

const TitleCards = ({ title, url }) => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  const cardsRef = useRef();
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://ophim1.com/v1/api/danh-sach/${url}?page=1`
      );
      setApiData(response.data.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  };

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    fetchData();
    cardsRef.current.addEventListener("wheel", handleWheel);
  }, []);

  return (
    <div className="title-cards text-white mt-12">
      <div className="flex mb-2 justify-between pr-[2%] items-center">
        <h2 className="text-sm sm:text-xl font-bold uppercase bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent">
          {title ? title.slice("-") : "Phim hot"}
        </h2>
        <p
          onClick={() => navigate(`/${url}`)}
          className="text-base rounded-full cursor-pointer px-7 bg-gradient-to-r from-transparent to-gray-800 hover:from-gray-800 hover:to-transparent"
        >
          Xem tất cả
        </p>
      </div>
      <div
        className="card-list py-2 flex gap-2.5 overflow-x-scroll"
        ref={cardsRef}
      >
        {loading
          ? Array(7)
              .fill(0)
              .map((_, index) => <SkeletonCard key={index} />)
          : apiData.items &&
            apiData.items.map((card, index) => {
              return (
                <div className="list relative" key={index}>
                  <div className="w-40 md:w-[200px] overflow-hidden rounded-md">
                    <div
                      onClick={() =>
                        navigate(`/chi-tiet/${card.slug}`, {
                          state: { type: card?.media_type },
                        })
                      }
                      className="card relative inline"
                      key={index}
                    >
                      <img
                        className={`rounded-md object-cover w-40 md:w-[200px] h-60 md:h-[300px] cursor-pointer transition-all duration-500 ease-in-out hover:scale-110 ${
                          imageLoaded[index]
                            ? "opacity-100 blur-none"
                            : "opacity-0 blur-md transition-all duration-500"
                        }`}
                        src={
                          `https://img.ophim.live/uploads/movies/` +
                          card.thumb_url
                        }
                        loading="lazy"
                        alt="img"
                        onLoad={() => handleImageLoad(index)}
                      />
                      <div className="absolute bottom-0 right-0 left-0 py-1 px-2 flex justify-end text-end text-white select-none cursor-pointer">
                        <p className="truncate">{card.name}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default TitleCards;
