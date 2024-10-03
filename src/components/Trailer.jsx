import React from "react";

const Trailer = ({ trailer_url, setShowTrailer }) => {
  // Convert regular YouTube URL to embed URL
  const getEmbedUrl = (url) => {
    const videoId = url.split("v=")[1];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <div
      onClick={() => setShowTrailer(false)}
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
    >
      <iframe
        className="w-[80vw] min-h-[80vh] xl:px-[6%] z-40"
        src={getEmbedUrl(trailer_url)}
        title="Trailer"
        frameBorder="0"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default Trailer;
