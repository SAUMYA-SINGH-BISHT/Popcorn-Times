/* eslint-disable no-unused-vars */
import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidateData } from "../utils/Validation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/Firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/UserSlice";
import { BG_IMG, PHOTO_URL } from "../utils/Constant";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const dispatch = useDispatch();

  const [errorMessage, setErrorMessage] = useState(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  const handleButtonClick = () => {
    //validate form data
    const message = checkValidateData(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    if (message) return;

    // sign in sign up logic
    if (!isSignInForm) {
      //for signup logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;

          updateProfile(user, {
            displayName: name.current.value,
            photoURL: PHOTO_URL,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // Profile updated!
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                })
              );
              // then navigate
            })
            .catch((error) => {
              // An error occurred
              setErrorMessage(error.message);
            });

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(
            (error.message = "User already exists. Please use a different ID.")
          );
          // ..
        });
    } else {
      //for signup logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(
            (error.message = "Either password is wrong or user does not exist.")
          );
        });
    }
  };

  return (
    <div>
      <Header />
      <div className="absolute">
        <img
          src={BG_IMG}
          alt="bg_image"
          className="object-cover w-screen h-screen"
        />
      </div>

      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-4 bg-black/[0.8] absolute w-[55%] sm:w-[30%] sm:my-12 mt-52 mx-auto right-0 left-0 text-white bg-opacity-90 rounded-lg"
      >
        <h1 className=" sm:font-bold text-3xl py-3">
          {isSignInForm ? "Sign In" : "Sign Up"}
        </h1>

        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-2 w-full bg-gray-700 rounded-lg"
          />
        )}

        <input
          ref={email}
          type="text"
          placeholder="Email"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />

        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-2 w-full bg-gray-700 rounded-lg"
        />

        <p className="text-red-500 font-bold  pt-2">{errorMessage}</p>

        <button
          className="p-4 my-4 bg-red-700 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>

        <div className="py-2 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm ? (
            <p className="text-zinc-400">
              New to Popcorn Times?
              <span className="text-white">Sign Up Now.</span>
            </p>
          ) : (
            <p className="text-zinc-400">
              Already registered?
              <span className="text-white">Sign In Now.</span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
