/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/Constant";
import { addTopRatedMovies} from "../utils/MovieSlice"

const useTopRatedMovies = () => {

    const topratedMovies = useSelector(store => store.movies.nowPlayingMovies)

    const dispatch = useDispatch();

    //api call
    const getTopRatedMovies = async () => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated?page=1', API_OPTIONS)
        const json = await data.json()

        dispatch(addTopRatedMovies(json.results))
    }

    useEffect(() => {
        !topratedMovies && getTopRatedMovies();
    }, [])
}

export default useTopRatedMovies;