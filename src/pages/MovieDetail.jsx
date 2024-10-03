import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { assets } from "../assets/assets";
import ListMovies from "../components/ListMovies";
import Download from "../components/Download";
import Trailer from "../components/Trailer";
import { addToWatchlist, getWatchlist } from "../firebase";
import { toast } from "react-toastify";
import { MovieContext } from "../context/MovieContext";
import { FaGooglePlay } from "react-icons/fa";

const MovieDetail = () => {
  const { loading, watchList, setWatchList } = useContext(MovieContext);
  const { id } = useParams();
  const [data, setData] = useState({});
  const [addingToWatchlist, setAddingToWatchlist] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(`https://ophim1.com/v1/api/phim/${id}`);
      setData(response.data.data);
    };
    fetchData();
  }, [id]);

  const handleAddToWatch = async () => {
    if (addingToWatchlist) return;

    setAddingToWatchlist(true);

    try {
      const isMovieInWatchlist = watchList.some(
        (item) => item?.movieId === data?.item?._id
      );

      if (!isMovieInWatchlist) {
        await addToWatchlist(
          data?.item?._id,
          data?.item?.name,
          data?.item?.thumb_url,
          data?.item?.year,
          data?.item?.content,
          data?.item?.slug
        );

        const updatedWatchList = await getWatchlist();
        setWatchList(updatedWatchList);
      } else {
        toast.success("Phim đã có trong danh sách!");
      }
    } catch (error) {
      toast.error("Lỗi khi thêm vào danh sách theo dõi:", error);
    } finally {
      setAddingToWatchlist(false);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="w-full h-screen flex items-center justify-center">
          <img className="w-16" src={assets.netflix_spinner} alt="" />
        </div>
      ) : (
        <div className="text-white -mt-20">
          {showTrailer === true && (
            <Trailer
              trailer_url={data?.item?.trailer_url}
              setShowTrailer={setShowTrailer}
            />
          )}
          <div
            className="relative bg-center bg-no-repeat bg-cover w-full px-4 md:px-[6%]"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,.88), rgba(0,0,0,.88)), url(https://img.ophim.live/uploads/movies/${data?.item?.poster_url})`,
            }}
          >
            <div className="detail w-[100%] h-auto relative flex z-10 flex-col lg:flex-row pt-20 pb-12 justify-center">
              <div className="image-detail w-full sm:w-3/4 lg:w-[30%] relative flex mx-auto">
                <img
                  src={
                    `https://img.ophim.live/uploads/movies/` +
                    data?.item?.thumb_url
                  }
                  className="w-full h-auto my-auto rounded-lg"
                  alt=""
                />
                <div className="absolute flex bottom-[2%] left-[4%] right-[4%] justify-center items-center gap-[4%]">
                  <button
                    onClick={() => {
                      setShowTrailer(!showTrailer);
                    }}
                    className="border-none rounded-lg w-full bg-gradient-to-r from-yellow-600 to-orange-600 py-2 hover:from-yellow-700 hover:to-orange-700 flex items-center justify-center gap-2"
                  >
                    <img src={assets.trailer_icon} className="w-5" alt="" />
                    <span>Trailer</span>
                  </button>
                  <button
                    onClick={() => navigate(`/xem-phim/${data?.item?.slug}`)}
                    className="border-none rounded-lg w-full bg-gradient-to-r from-orange-600 to-red-600 py-2 hover:from-orange-700 hover:to-red-700 flex items-center justify-center gap-2"
                  >
                    <FaGooglePlay className="w-5 text-white" />
                    <span>Xem phim</span>
                  </button>
                </div>
              </div>
              <div className="description w-full lg:px-7 py-2.5">
                <h2 className="font-medium text-lg flex items-center py-2.5">
                  {data?.item?.name}
                  <p className="text-[#989899] px-1">{data?.item?.year}</p>
                </h2>
                <div className="release_date flex ">
                  <img
                    src={assets.calendar_icon}
                    alt=""
                    className="icon w-5 "
                  />
                  <p className="text-sm pl-1">{data?.item?.created?.time}</p>
                </div>
                <div className="user-score text-sm py-2">
                  {data?.item?.view.toLocaleString()} Lượt xem
                  {!watchList.some(
                    (item) => item?.movieId === data?.item?._id
                  ) ? (
                    <button
                      className="btn-add p-2.5 rounded-md bg-[rgba(0, 0, 0, 0.1)] ml-5 border text-white cursor-pointer hover:bg-[#b3afaf4d]"
                      onClick={handleAddToWatch}
                      disabled={addingToWatchlist}
                    >
                      {addingToWatchlist ? "Đang thêm..." : "Theo dõi"}
                    </button>
                  ) : (
                    <button className="btn p-2.5 rounded-md border border-[greenyellow] bg-[rgba(0, 0, 0, 0.1)] ml-5 text-[greenyellow]">
                      Đã theo dõi
                    </button>
                  )}
                </div>
                <i className="text-[#989899] text-sm">
                  {data?.item?.origin_name}
                </i>
                <div className="flex flex-col gap-2 pt-2 text-sm">
                  <p>
                    Thời lượng:{" "}
                    <span className="text-[#989899]">{data?.item?.time}</span>
                  </p>
                  <p>
                    Tập mới nhất:{" "}
                    <span className="text-[#989899]">
                      {data?.item?.episode_current}
                    </span>
                  </p>
                  <p>
                    Đạo diễnt:{" "}
                    <span className="text-[#989899]">
                      {data?.item?.director.join(",") || "Chưa cập nhật"}
                    </span>
                  </p>
                  <p>
                    Diễn viên:{" "}
                    <span className="text-[#989899]">
                      {data?.item?.actor.join(",") || "Chưa cập nhật"}
                    </span>
                  </p>
                </div>

                <div className="overview overflow-hidden">
                  <h3 className="text-base py-2.5 font-semibold">
                    Nội dung phim
                  </h3>
                  <p className="text-sm overflow-auto">{data?.item?.content}</p>
                </div>
                <div className="genres pt-2.5 flex flex-wrap gap-1">
                  {data?.item && data?.item?.category?.length > 0
                    ? data?.item?.category.map((item) => (
                        <button
                          key={item?.id}
                          className="btn-genres p-2 border-none text-sm uppercase text-white bg-[#9ca3af35] cursor-pointer"
                        >
                          {item?.name}
                        </button>
                      ))
                    : null}
                </div>
              </div>
            </div>
          </div>
          <Download data={data} />
          <div className="videos px-4 md:px-[6%] pt-5 w-full">
            <h2 className="text-xl pb-4 font-bold bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent">
              Có thể phù hợp với bạn
            </h2>
            <ListMovies slug={"phim-moi"} keyword={null} slice={10} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
