import { useState } from "react";
import useTmdbSearch from "../customHooks/useTmdbSearch";
import { IMG_CDN } from "../utils/Constant";

const TmdbSearch = () => {
  const [searchText, setSearchText] = useState("");
  const { searchData } = useTmdbSearch(searchText);
  return (
    <div>
      <div className="pt-[50%] md:pt-[15%] flex justify-center">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="w-3/4 md:w-1/2 mx-auto bg-black grid grid-cols-12"
        >
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="text"
            className=" p-2 m-2 md:p-4 md:m-4 col-span-8"
            placeholder="What are you planing to watch today?"
          />
          <button
            type="submit"
            className="col-span-4 m-4 py-2 px-4 bg-red-600 text-white rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      {searchData && searchData.length > 0 ? (
        <div className="px-0 md:px-2  bg-black/[0.8] py-2">
          <h1 className="text-md px-8 py-2 pt-6 md:text-3xl mb-2 text-white">
            Your search result: {searchText}
          </h1>
          <div className="mt-6">
            <div className="flex flex-wrap justify-center">
              {searchData.slice(0, 12).map((result) => (
                <div
                  key={result.id}
                  className=" m-1 md:m-2 w-24 md:w-48 px-0 md:pr-4 transition ease-in-out delay-130 hover:-translate-y-5 hover:scale-110 cursor-pointer"
                >
                  <img
                    src={IMG_CDN + result.poster_path}
                    alt="searchMovieData"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-center p-4 text-3xl text-white font-bold font">
          Search for your favourite movies and series
        </h1>
      )}
    </div>
  );
};

export default TmdbSearch;
