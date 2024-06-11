/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/Constant";
import { addTrailerVideo, resetTrailerVideo } from "../utils/MovieSlice";


const useMovieTrailer = (movieId) => {

  const trailer = useSelector(store => store.movies.trailerVideo)

    const dispatch = useDispatch();


    const getMovieVideo = async () => {
        const data = await fetch(
          `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
          API_OPTIONS
        );
        const json = await data.json();
        
        const filteredData = json.results.filter(
          (video) =>  video.name === "Official Trailer" || video.type === "Trailer"
        );
        
        const trailer =
          filteredData.length == 0 ? filteredData[0] : json.results[0];


        dispatch(addTrailerVideo(trailer));
      };
    
      useEffect(() => {
       !trailer && getMovieVideo();

       return () => {
        dispatch(resetTrailerVideo());
      };
      }, [ movieId]);
}

export default useMovieTrailer;