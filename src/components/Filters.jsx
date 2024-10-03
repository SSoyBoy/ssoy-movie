import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MovieContext } from "../context/MovieContext";

const fil = {
  time: [
    { name: "Thời gian đăng", slug: "_id" },
    { name: "Thời gian cập nhật", slug: "modified.time" },
    { name: "Năm sản xuất", slug: "year" },
  ],
  format: [
    { name: "Phim Mới", slug: "phim-moi" },
    { name: "Phim Bộ", slug: "phim-bo" },
    { name: "Phim Lẻ", slug: "phim-le" },
    { name: "TV Shows", slug: "tv-shows" },
    { name: "Hoạt Hình", slug: "hoat-hinh" },
    { name: "Phim Vietsub", slug: "phim-vietsub" },
    { name: "Phim Thuyết Minh", slug: "phim-thuyet-minh" },
    { name: "Phim Lồng Tiếng", slug: "phim-long-tieng" },
    { name: "Phim Bộ Đang Chiếu", slug: "phim-bo-dang-chieu" },
    { name: "Phim Trọn Bộ", slug: "phim-bo-hoan-thanh" },
    { name: "Phim Sắp Chiếu", slug: "phim-sap-chieu" },
    { name: "subteam", slug: "Subteam" },
  ],
};

const Filters = () => {
  const { categories, country } = useContext(MovieContext);
  const [filters, setFilters] = useState({
    time: "modified.time",
    format: "phim-moi",
    category: "",
    country: "",
    year: "",
  });

  const navigate = useNavigate();
  const handleFilter = () => {
    navigate(
      `/loc-phim?format=${filters.format}&sort_field=${filters.time}&category=${filters.category}&country=${filters.country}&year=${filters.year}&page=1`
    );
  };

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 py-3 w-full">
      <select
        name="time"
        value={filters.time}
        className="arrange bg-[#383838] p-1 rounded-lg hover:bg-[#4a4a4a] outline-none  cursor-pointer"
        onChange={onChangeHandler}
      >
        {fil.time.map((item, index) => (
          <option key={index} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="format"
        value={filters.format}
        className="arrange bg-[#383838] p-1 rounded-lg hover:bg-[#4a4a4a] outline-none  cursor-pointer"
        onChange={onChangeHandler}
      >
        {fil.format.map((item, index) => (
          <option key={index} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="category"
        value={filters.category || "Tất cả thể loại"}
        className="arrange bg-[#383838] p-1 rounded-lg hover:bg-[#4a4a4a] outline-none  cursor-pointer"
        onChange={onChangeHandler}
      >
        <option value="">Tất cả thể loại</option>
        {categories.map((item, index) => (
          <option key={index} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="country"
        value={filters.country || "Tất cả quốc gia"}
        className="arrange bg-[#383838] p-1 rounded-lg hover:bg-[#4a4a4a] outline-none  cursor-pointer"
        onChange={onChangeHandler}
      >
        <option value="">Tất cả quốc gia</option>
        {country.map((item, index) => (
          <option key={index} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        name="year"
        value={filters.year || "Tất cả năm"}
        className="arrange bg-[#383838] p-1 rounded-lg hover:bg-[#4a4a4a] outline-none  cursor-pointer"
        onChange={onChangeHandler}
      >
        <option value="">Tất cả năm</option>
        {Array.from({ length: 2025 - 2010 + 1 }, (_, i) => 2010 + i).map(
          (year) => (
            <option key={year} value={year}>
              {year}
            </option>
          )
        )}
      </select>
      <button
        onClick={handleFilter}
        className="bg-gradient-to-r from-orange-600 to-red-600 px-2 py-1 rounded-lg hover:from-orange-700 hover:to-red-700"
      >
        Lọc phim
      </button>
    </div>
  );
};

export default Filters;
