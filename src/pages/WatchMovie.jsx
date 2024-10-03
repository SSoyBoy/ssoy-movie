import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Download from "../components/Download";
import ListMovies from "../components/ListMovies";

const WatchMovie = () => {
  const { id } = useParams();
  const [data, setData] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const episodeFromUrl = parseInt(queryParams.get("episode")) || 1;
  const [currentEpisode, setCurrentEpisode] = useState(episodeFromUrl - 1);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://ophim1.com/v1/api/phim/${id}`
        );
        const movieData = response.data.data;
        if (
          episodeFromUrl > movieData?.item?.episodes[0]?.server_data.length ||
          episodeFromUrl < 1
        ) {
          navigate("/");
        } else {
          setData(movieData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        navigate("/");
      }
    };

    fetchData();
  }, [id, episodeFromUrl, navigate]);

  const handleEpisodeClick = (episodeIndex) => {
    setCurrentEpisode(episodeIndex);
    navigate(`${location.pathname}?episode=${episodeIndex + 1}`);
  };

  return (
    <>
      {data && data?.item ? (
        <div className="w-full">
          <iframe
            className="w-full min-h-[80vh] xl:px-[6%]"
            src={
              data?.item?.episodes
                ? data?.item?.episodes[0]?.server_data[currentEpisode]
                    ?.link_embed
                : `https://vip.opstream11.com/share/ad337bfc90f0e6826f3c6329a5eb0ad1`
            }
            title={
              data?.item?.episodes[0]?.server_data[currentEpisode]?.filename
            }
            // frameborder="0"
            allowFullScreen
          ></iframe>

          {/* button */}
          <div className="w-full pt-4 text-white flex items-center justify-center gap-2">
            <button
              onClick={() =>
                handleEpisodeClick(
                  currentEpisode > 0 ? currentEpisode - 1 : currentEpisode
                )
              }
              className="p-2 rounded-md bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              Tập trước
            </button>
            <button className="p-2 rounded-md bg-orange-600">Server HĐ</button>
            <button
              onClick={() =>
                handleEpisodeClick(
                  currentEpisode < data.item.episodes[0].server_data.length - 1
                    ? currentEpisode + 1
                    : currentEpisode
                )
              }
              className="p-2 rounded-md bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            >
              Tập sau
            </button>
          </div>

          {/* model */}
          <div className="w-full text-white pt-4 px-4 md:px-[6%]">
            <div className="text-xl font-bold mb-4">
              <p>
                {data?.item?.name} ({data?.item?.year})
              </p>
              <p className="text-[#989899]">{data?.item?.origin_name}</p>
              <div className="py-2">
                <span className="text-base">Nội dung phim</span>
                <p className="text-sm overflow-auto text-[#989899] pt-2">
                  {data?.item?.content}
                </p>
              </div>
            </div>
            <button className="p-2.5 rounded-md bg-[rgba(0, 0, 0, 0.1)] border text-white cursor-pointer hover:bg-[#b3afaf4d]">
              Theo dõi
            </button>
            <div className="w-full flex flex-col mt-4">
              <div className="flex">
                <span className="bg-[#181818] p-3 rounded-t-sm uppercase text-sm font-bold">
                  {data?.item?.episodes[0]?.server_name}
                </span>
              </div>
              <div className="w-full bg-[#181818] p-3 flex flex-wrap gap-1 rounded-b-sm rounded-tr-sm">
                {data?.item?.episodes[0]?.server_data &&
                  data?.item?.episodes[0]?.server_data.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleEpisodeClick(index)}
                      className={`px-2 py-1 rounded-sm text-center transition-all duration-300 ${
                        currentEpisode === index
                          ? "bg-orange-600"
                          : "bg-[#000] hover:bg-orange-600"
                      }`}
                    >
                      {item?.name || NaN}
                    </button>
                  ))}
              </div>
            </div>
          </div>
          <Download data={data} />
          <div className="videos px-4 md:px-[6%] pt-7 w-full">
            <h2 className="text-xl pb-4 font-bold bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 text-transparent">
              Có thể phù hợp với bạn
            </h2>
            <ListMovies slug={"phim-moi"} keyword={null} slice={10} />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default WatchMovie;
