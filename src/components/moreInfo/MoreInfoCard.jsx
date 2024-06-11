/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import useMovieTrailer from "../../customHooks/useMovieTrailer";

const MoreInfoCard = ({ movieId, title, desc }) => {
  const video = useSelector((store) => store.movies?.trailerVideo);

  useMovieTrailer(movieId);

  const play = 1;

  return (
    <div
      className={`md:flex-col md:bg-black/[0.7] text-white md:w-[70vh] md:h-[70vh] md:fixed md:top-[10%] md:right-[37%]
    transition-opacity duration-500 ease-in-out transform`}
    >
      <div>
        <iframe
          className="w-[100%] h-[100%] aspect-video"
          src={
            "https://www.youtube.com/embed/" +
            video?.key +
            "?&autoplay=" +
            play +
            "&mute=1"
          }
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>
      <div className="flex px-4 bg-black/[0.7]">
        <div>
          <h1 className="py-4 text-xl">{title}</h1>
          <p className="text-sm mb-5">{desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MoreInfoCard;
