import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Select = ({ data, selected, onSelect, name }) => {
  const navigate = useNavigate();

  const handleSelect = (item) => {
    onSelect(item.slug);
    if (name === "/quoc-gia") {
      navigate(`/quoc-gia/${item?.slug}`, { state: { name: item?.name } });
    } else {
      navigate(`/the-loai/${item?.slug}`, { state: { name: item?.name } });
    }
  };

  return (
    <div className="w-96 grid grid-cols-3 rounded-b-lg bg-[#181818] p-2 pb-4">
      {data &&
        data.map((item) => (
          <div
            key={item._id}
            onClick={() => handleSelect(item)}
            className={`w-full p-2 text-sm ${
              selected === item.slug
                ? "text-orange-600 border-r-2 border-orange-600 rounded-r-lg"
                : "text-[#989899]"
            } hover:text-orange-600 hover:scale-105 hover:border-r-2 border-orange-600 rounded-r-lg`}
          >
            {item.name}
          </div>
        ))}
    </div>
  );
};

export default Select;
