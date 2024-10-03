import React from "react";

const Download = ({ data }) => {
  return (
    <div className="px-4 md:px-[6%]">
      <div className="downloads mt-4 max-h-72 overflow-y-scroll">
        <table className="min-w-full bg-inherit border border-[#282828] text-sm text-white">
          <thead>
            <tr>
              <th className="border-b w-[50%] border-[#282828] px-4 py-2">
                Liên kết tải về
              </th>
              <th className="border-b w-[25%] border-[#282828] px-4 py-2">
                Chất lượng
              </th>
              <th className="border-b w-[25%] border-[#282828] px-4 py-2">
                Ngôn ngữ
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.item?.episodes[0]?.server_data?.map((episode, index) => (
              <tr key={index} className="hover:bg-[#131313]">
                <td className=" px-4 py-2 text-start">
                  <a
                    href={episode?.link_m3u8}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-orange-500 hover:underline"
                  >
                    {episode?.filename || "N/A"}
                  </a>
                </td>
                <td className="px-4 py-2 text-[#989899]">
                  <div className="p-1 flex items-center justify-center">
                    <span className="border border-[#989899] rounded-sm px-2 py-1">
                      1080p
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2 text-center text-[#989899]">
                  {episode ? data?.item?.lang : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Download;
