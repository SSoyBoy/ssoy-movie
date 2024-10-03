import React, { useEffect, useState } from "react";
import ListMovies from "../components/ListMovies";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Filters from "../components/Filters";

const SkeletonItem = () => {
  return (
    <div className="flex gap-2 cursor-pointer group relative px-3 py-1 animate-pulse">
      <div className="w-20 h-32 bg-[#3a3939] rounded-lg"></div>
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-[#3a3939] rounded w-full"></div>
        <div className="h-4 bg-[#3a3939] rounded w-3/4"></div>
      </div>
    </div>
  );
};

const MoviesModel = ({ title, slug }) => {
  const [dataUpcoming, setDataUpcoming] = useState([]);
  const [dataNew, setDataNew] = useState([]);
  const [loadingUpcoming, setLoadingUpcoming] = useState(true);
  const [loadingNew, setLoadingNew] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  const { id } = useParams();

  const navigate = useNavigate();

  const location = useLocation();

  const searchParams = new URLSearchParams(location?.search);
  const keyword =
    location.pathname === "/tim-kiem"
      ? searchParams.get("keyword")
        ? searchParams.get("keyword")
        : ""
      : null;

  useEffect(() => {
    const fetchApiUpcoming = async () => {
      try {
        const response = await axios.get(
          `https://ophim1.com/v1/api/danh-sach/phim-sap-ra-mat?&page=1`
        );
        setDataUpcoming(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingUpcoming(false);
      }
    };

    const fetchApiTopRated = async () => {
      try {
        const response = await axios.get(
          `https://ophim1.com/v1/api/danh-sach/phim-moi?&page=2`
        );
        setDataNew(response.data.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingNew(false);
      }
    };

    fetchApiUpcoming();
    fetchApiTopRated();
  }, []);

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <div>
      <div className="movies text-white w-full min-h-[100vh] px-4 md:px-[6%]">
        <div className="title flex bg-[#181818] p-2.5 mt-7 mb-2.5 uppercase items-center">
          <a className="p-1 hover:bg-[#333333]" href="/">
            {" "}
            SSOY /
          </a>{" "}
          {keyword ? (
            <p className="pl-1 text-[#cccccc]">
              Kết quả tìm kiếm cho từ khoá: {keyword}
            </p>
          ) : (
            <p className="pl-1 text-[#cccccc]">
              {id && location.state
                ? title + " - " + location?.state?.name
                : id
                ? title + " - " + id
                : title}
            </p>
          )}
        </div>
        <div>
          <Filters />
          <div className="w-full flex flex-col lg:flex-row gap-2.5 pt-4">
            <ListMovies slug={slug} keyword={keyword} id={id} />
            <div className="w-full lg:w-[35%] lg:pl-2.5">
              <div className="">
                <div className="flex">
                  <h2 className="uppercase text-lg font-bold bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent mb-5">
                    Phim sắp ra mắt
                  </h2>
                </div>
                <div className="flex flex-col gap-2 bg-gradient-to-r from-[#181818] to-[#0c0c0c]">
                  {loadingUpcoming
                    ? Array(6)
                        .fill(0)
                        .map((_, idx) => <SkeletonItem key={idx} />)
                    : dataUpcoming.items &&
                      dataUpcoming.items.slice(0, 6).map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-2 cursor-pointer group relative px-3 py-1`}
                          onClick={() => navigate(`/chi-tiet/${item?.slug}`)}
                        >
                          <div className="w-20 h-32 boder rounded-lg overflow-hidden z-10">
                            <img
                              className={`w-20 h-32 cursor-pointer boder rounded-lg group-hover:scale-105 transition-all ${
                                imageLoaded[idx]
                                  ? "opacity-100 blur-none"
                                  : "opacity-0 blur-md transition-all duration-500"
                              }`}
                              src={
                                `https://img.ophim.live/uploads/movies/` +
                                item.thumb_url
                              }
                              alt=""
                              onLoad={() => handleImageLoad(idx)}
                            />
                          </div>
                          <div className="z-10 flex-1">
                            <h3 className="cursor-pointer mb-1 text-base font-semibold group-hover:text-orange-600">
                              {item?.name}
                            </h3>
                            <p className="text-[#999696] text-sm">
                              {item?.origin_name}
                            </p>
                          </div>
                          <div className="w-0 z-0 absolute group-hover:w-full top-0 bottom-0 right-0 bg-[rgba(0,0,0,0.6)] transition-all ease-linear"></div>
                        </div>
                      ))}
                </div>
              </div>
              <div className="mt-4">
                <h2 className="uppercase text-lg font-bold bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent mb-5">
                  Phim đang thịnh hành
                </h2>
                <div className="flex flex-col gap-2 bg-gradient-to-r from-[#181818] to-[#0c0c0c]">
                  {loadingNew
                    ? Array(6)
                        .fill(0)
                        .map((_, idx) => <SkeletonItem key={idx} />)
                    : dataNew.items &&
                      dataNew.items.slice(0, 6).map((item, idx) => (
                        <div
                          key={idx}
                          className={`flex gap-2 cursor-pointer group relative px-3 py-1`}
                          onClick={() => navigate(`/chi-tiet/${item?.slug}`)}
                        >
                          <div className="w-20 h-32 boder rounded-lg overflow-hidden z-10">
                            <img
                              className={`w-20 h-32 cursor-pointer boder rounded-lg group-hover:scale-105 transition-all ${
                                imageLoaded[idx]
                                  ? "opacity-100 blur-none"
                                  : "opacity-0 blur-md transition-all duration-500"
                              }`}
                              src={
                                `https://img.ophim.live/uploads/movies/` +
                                item.thumb_url
                              }
                              alt=""
                              onLoad={() => handleImageLoad(idx)}
                            />
                          </div>
                          <div className="z-10 flex-1">
                            <h3 className="cursor-pointer mb-1 text-base font-semibold group-hover:text-orange-600">
                              {item?.name}
                            </h3>
                            <p className="text-[#999696]">
                              {item?.origin_name}
                            </p>
                          </div>
                          <div className="w-0 z-0 absolute group-hover:w-full top-0 bottom-0 right-0 bg-[rgba(0,0,0,0.6)] transition-all ease-linear"></div>
                        </div>
                      ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoviesModel;
