import jwt_decode from "jwt-decode";

export const fetchUser = () => {
  try {
    const userInfo =
      localStorage.getItem("user") !== "undefined"
        ? jwt_decode(localStorage.getItem("user"))
        : localStorage.clear();
    return userInfo;
  } catch (err) {
    console.error(err);
  }
};
