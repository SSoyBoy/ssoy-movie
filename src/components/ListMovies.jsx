import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { GrNext } from "react-icons/gr";

const SkeletonItem = () => (
  <div className="w-full flex flex-col h-max bg-[#2e2e2e] rounded cursor-pointer relative flex-1 animate-pulse">
    <div className="w-full h-[250px] sm:h-[280px] bg-[#3a3939] rounded-tl-lg rounded-tr-lg"></div>
    <div className="flex flex-col text-sm px-2 py-2">
      <div className="w-3/4 h-4 bg-[#3a3939] rounded-sm mb-1"></div>
      <div className="w-1/2 h-4 bg-[#3a3939] rounded-sm"></div>
    </div>
  </div>
);

const ListMovies = ({ slug, keyword, slice, id }) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState({});

  const searchParams = new URLSearchParams(location?.search);
  const format = searchParams.get("format");
  const time = searchParams.get("sort_field");
  const category = searchParams.get("category");
  const country = searchParams.get("country");
  const year = searchParams.get("year");
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const navigate = useNavigate();

  const handleImageLoad = (index) => {
    setImageLoaded((prev) => ({ ...prev, [index]: true }));
  };

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      const response = await axios.get(
        location.pathname.includes("/quoc-gia") && id
          ? `https://ophim1.com/v1/api/quoc-gia/${id}?page=${currentPage}`
          : location.pathname.includes("/the-loai") && id
          ? `https://ophim1.com/v1/api/the-loai/${id}?page=${currentPage}`
          : location.pathname === "/loc-phim"
          ? `https://ophim1.com/v1/api/danh-sach/${
              format ? format : ""
            }?category=${category ? category : ""}&country=${
              country ? country : ""
            }&year=${year ? year : ""}&sort_field=${
              time ? time : ""
            }&page=${currentPage}`
          : keyword !== null
          ? `https://ophim1.com/v1/api/tim-kiem?keyword=${keyword}&page=${currentPage}`
          : `https://ophim1.com/v1/api/danh-sach/${
              slug ? slug : "phim-bo"
            }?page=${currentPage}`
      );
      setData(response.data.data);
      const pagination = response.data.data.params.pagination;

      setTotalPages(
        Math.ceil(pagination.totalItems / pagination.totalItemsPerPage)
      );
      setLoading(false);
    };
    fetchApi();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [
    location.pathname,
    id,
    format,
    category,
    country,
    year,
    time,
    keyword,
    slug,
    currentPage,
  ]);

  const generatePagination = () => {
    const pages = [];
    if (totalPages <= 6) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages
        );
      } else {
        pages.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }
    return pages;
  };

  const handlePageChange = (page) => {
    // Cập nhật URL khi trang thay đổi
    searchParams.set("page", page);
    navigate(`${location.pathname}?${searchParams.toString()}`);
  };

  if (loading) {
    return (
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 min-[2000px]:grid-cols-6 my-2.5 gap-2.5 h-max">
        {Array(15)
          .fill(0)
          .map((_, idx) => (
            <SkeletonItem key={idx} />
          ))}
      </div>
    );
  }

  return data.items && data.items.length > 0 ? (
    <div className="w-full">
      <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 min-[2000px]:grid-cols-6 my-2.5 gap-2.5">
        {data.items &&
          data.items.slice(0, slice).map((item, idx) => (
            <div
              className="w-full flex flex-col group bg-[#181818] rounded cursor-pointer relative hover:text-[#c8c8ca] flex-1"
              key={idx}
              onClick={() => navigate(`/chi-tiet/${item.slug}`)}
            >
              <div className="absolute top-1 left-1 z-10 p-1 rounded-tr-lg rounded-tl-lg rounded-br-lg bg-gradient-to-tr from-orange-600 to-red-600">
                <p className="text-white text-sm">
                  {item?.quality}+{item?.lang}
                </p>
              </div>

              <div className="flex overflow-hidden w-full relative rounded-tl-lg rounded-tr-lg flex-1">
                <img
                  className={`w-full h-full max-h-[300px] sm:max-h-[350px] min-h-[250px] sm:min-h-[280px] transition-all group-hover:scale-105 object-cover ${
                    imageLoaded[idx]
                      ? "opacity-100 blur-none"
                      : "opacity-0 blur-md transition-all duration-500"
                  }`}
                  width={300}
                  height={400}
                  src={
                    `https://img.ophim.live/uploads/movies/` + item.thumb_url
                  }
                  srcSet={`https://img.ophim.live/uploads/movies/${item.thumb_url}?w=300 300w, https://img.ophim.live/uploads/movies/${item.thumb_url}?w=500 500w, https://img.ophim.live/uploads/movies/${item.thumb_url}?w=800 800w`}
                  sizes="(max-width: 600px) 300px, (max-width: 1200px) 500px, 200px"
                  alt={item.thumb_url}
                  loading="lazy"
                  onLoad={() => handleImageLoad(idx)}
                />
                <div className="absolute bottom-0 right-0 z-10 p-1 bg-gradient-to-tr from-orange-600 to-yellow-600">
                  <p className="text-white text-xs">
                    {item.sub_docquyen
                      ? item?.lang + " Độc Quyền"
                      : item?.episode_current === "Full"
                      ? item?.time
                      : item?.episode_current}
                  </p>
                </div>
              </div>
              <div className="flex flex-col text-sm">
                <p className=" text-white text-center font-semibold truncate pt-1 hover:text-orange-600">
                  {item.name}
                </p>
                <span className="text-[#999696] text-center truncate">
                  {item.origin_name}
                </span>
              </div>
            </div>
          ))}
      </div>
      <div
        className={`flex flex-wrap items-center justify-center my-5 gap-1 select-none ${
          data.length === 9 || slice ? "hidden" : ""
        }`}
      >
        <button
          className={`py-1 px-2 border-none bg-[#3a3939] text-white cursor-pointer rounded-lg transition-all hover:bg-orange-600 ${
            currentPage === 1 ? "hidden" : ""
          }`}
          onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
          disabled={currentPage === 1}
        >
          <GrNext className="h-6 rotate-180" />
        </button>
        {generatePagination().map((page, index) =>
          page === "..." ? (
            <span key={index}>...</span>
          ) : (
            <button
              key={index}
              onClick={() => handlePageChange(page)}
              className={`py-1 px-2 border-none bg-[#3a3939] text-white cursor-pointer rounded-lg transition-all hover:bg-orange-600 ${
                currentPage === page ? "bg-orange-600" : ""
              }`}
            >
              {page}
            </button>
          )
        )}
        <button
          className={`py-1 px-2 border-none bg-[#3a3939] text-white cursor-pointer rounded-lg transition-all hover:bg-orange-600 ${
            currentPage === totalPages ? "hidden" : ""
          }`}
          onClick={() =>
            handlePageChange(Math.min(currentPage + 1, totalPages))
          }
        >
          <GrNext className="h-6" />
        </button>
      </div>
    </div>
  ) : (
    <div className="w-full">
      <div className="no-items w-full bg-[#181818] border border-[#e8a568] p-2.5">
        Rất tiếc, chúng tôi không có phim cho mục này...
      </div>
    </div>
  );
};

export default ListMovies;
