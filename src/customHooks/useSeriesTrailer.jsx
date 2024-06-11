/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constant";
import { addSeriesTrailer } from "../utils/MovieSlice";

const useSeriesTrailer = (movieId) => {
  const trailer = useSelector((store) => store.movies.airedToday);
  const dispatch = useDispatch();

  const getSeriesVideo = async () => {
    const data = await fetch(
      `https://api.themoviedb.org/3/tv/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await data.json();
    const filteredData = json.results.filter(
      (video) => video.name === "Official Trailer" || video.type === "Teaser"
    );

    const trailer =
      filteredData.length == 0 ? filteredData[0] : json.results[0];

    dispatch(addSeriesTrailer(trailer));
  };

  useEffect(() => {
    !trailer && getSeriesVideo();
  }, [movieId]);
};

export default useSeriesTrailer;
