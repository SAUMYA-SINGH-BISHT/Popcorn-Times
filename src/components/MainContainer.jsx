// import { useState, useEffect } from "react";

import { useSelector } from "react-redux";
import VideoTitle from "./VideoTitle";
import VideoBackground from "./VideoBackground";

const MainContainer = () => {
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  if (!movies) return null;
  const mainMovie = movies[0];

  if (!mainMovie) return null;

  // Destructure the required properties
  const { original_title, overview, id } = mainMovie;

  return (
    <div className="invisible sm:visible sm:pt-0">
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
