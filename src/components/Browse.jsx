/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import Header from "./Header";
import useNowPlayingMovies from "../customHooks/useNowPlayingMovies";
import MainContainer from "./MainContainer";
import SecondContainer from "./SecondContainer";
import usePopularMovies from "../customHooks/usePopularMovies";
import useTopRatedMovies from "../customHooks/useTopratedMovies";
import useUpcomingMovies from "../customHooks/useUpcomingMovies";
import Search from "./Search";
import { useSelector } from "react-redux";

const Browse = () => {
  const showSearch = useSelector((store) => store.movies.showSearch);

  //calling the api, getting data and updating store using dispatch.
  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>
      <Header />
      {showSearch ? (
        <Search />
      ) : (
        <>
          <MainContainer />
          <SecondContainer />
        </>
      )}
    </div>
  );
};

export default Browse;
