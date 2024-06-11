/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { signOut } from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { addUser, removeUser } from "../utils/UserSlice";
import { LOGO } from "../utils/Constant";
import { toggleSearchView } from "../utils/MovieSlice";

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  const showSearch = useSelector((store) => store.movies.showSearch);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName, photoURL } = user;
        // update store
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );

        //redirect
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        //   redirect
        navigate("/");
      }
    });

    //unsubscribe when component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  const handleSearch = () => {
    //toggle search
    dispatch(toggleSearchView());
  };

  return (
    <div className="absolute top-0 z-10 w-screen px-6 sm:px-12 sm:py-2 py-10  bg-gradient-to-b from-black flex  justify-between bg-black sm:bg-transparent">
      <img className="sm:mt-5 mx-auto sm:mx-0" src={LOGO} alt="Popcorn_Logo" />

      {user && (
        <div className=" flex flex-row p-2 relative group cursor-pointer">
          <div>
            <button
              onClick={handleSearch}
              className="bg-red-600 hover:bg-red-500 rounded-md text-white py-1 px-1 sm:py-2 sm:px-4 mx-2 sm:font-bold"
            >
              {showSearch ? "Back to Home Page" : "Search Show"}
            </button>
          </div>

          <div>
            <img
              className="w-8 h-8 hidden sm:block sm:w-10 sm:h-10 hover:bg-slate-400 mr-0"
              src="https://assets.leetcode.com/users/avatars/avatar_1676629254.png"
              alt="user-icon"
            />
          </div>

          <div>
            <div className="">
              <div className="">
                <button
                  onClick={handleSignOut}
                  className="bg-gray-700  hover:bg-red-500 rounded-md text-white py-1 px-1 sm:py-2 sm:px-4 mx-2 sm:font-bold"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;

// hidden group-hover:block
//flex-flex-row
