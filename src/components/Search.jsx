import { BG_IMG } from "../utils/Constant";
import TmdbSearch from "./TmdbSearch";

const Search = () => {
  return (
    <div>
      <div className="absolute -z-10">
        <img
          src={BG_IMG}
          alt="netflix_BG"
          className="object-cover w-screen h-screen"
        ></img>
      </div>
      <TmdbSearch />
    </div>
  );
};

export default Search;
