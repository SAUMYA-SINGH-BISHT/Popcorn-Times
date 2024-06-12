export const checkValidateData = (email, password) => {
  const isEmailValid =
    /^([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=]).{8,}$/.test(password);

  if (!isEmailValid) return "Please use a valid Email id.";
  if (!isPasswordValid)
    return "Password must be 8 characters, with 1 uppercase and 1 special character.";

  return null;
};
