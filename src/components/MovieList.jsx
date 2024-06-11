/* eslint-disable react/prop-types */
import { FaForward } from "react-icons/fa";
import MovieCard from "./MovieCard";

const MovieList = ({ title, movies }) => {
  return (
    <div className="px-2 pt-4 ">
      <h1 className="text-lg py-2 pt-6 md:text-3xl mb-2 text-white">
        {title} <FaForward />
      </h1>
      <div className="flex overflow-x-scroll no-scrollbar">
        <div className="flex cursor-pointer">
          {movies.map((movie) => (
            <MovieCard
              centered={false}
              key={movie.id}
              posterPath={movie.poster_path}
              movieId={movie.id}
              title={movie.original_title}
              desc={movie.overview}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
