/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useSelector } from "react-redux";
import useMovieTrailer from "../customHooks/useMovieTrailer";
import { useState } from "react";

const VideoBackground = ({ movieId }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);

  //fetch trailer video from movie id and updating store with trailer video data.
  useMovieTrailer(movieId);

  const [audio, setAudio] = useState(0);

  const handleAudioPlay = () => {
    if (audio) setAudio(0);
    else setAudio(1);
  };

  return (
    <div className="  ">
      <iframe
        className="w-[100%] h-[50%] aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=" +
          audio
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
      ></iframe>

      <div className=" absolute right-[8%] top-[15%] sm:right-[2%] sm:top-[5%]  md:right-[3%] md:top-[73%]">
        <button
          onClick={handleAudioPlay}
          className="text-md md:text-lg bg-red-500 w-10 h-10 md:w-18 md:h-18 rounded-full hover:bg-red-600"
        >
          🔉
        </button>
      </div>
    </div>
  );
};

export default VideoBackground;
