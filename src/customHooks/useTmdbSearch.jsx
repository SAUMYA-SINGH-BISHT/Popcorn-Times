/* eslint-disable react-hooks/exhaustive-deps */
import { API_OPTIONS } from "../utils/Constant";
import { useEffect, useState } from "react";

const useTmdbSearch = (movieName) => {
  const [searchData, setSearchData] = useState();

  const getMovies = async () => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movieName +
        "&include_adult=false&language=en-US&page=1",
      API_OPTIONS
    );
    const json = await data.json();
    const finalResult = json.results.filter(
      (result) => result.poster_path !== null
    );

    setSearchData(finalResult);
  };

  useEffect(() => {
    if (movieName) getMovies();
  }, [movieName]);

  return { searchData };
};

export default useTmdbSearch;
