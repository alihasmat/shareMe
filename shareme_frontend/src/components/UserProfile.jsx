import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import { client } from "../client";
import {
  userQuery,
  userCreatedPinsQuery,
  userSavedPinsQuery,
} from "../utils/data";
import Spinner from "./Spinner";
import MasonryLayout from "./MasonryLayout";

import { AiOutlineLogout } from "react-icons/ai";

function UserProfile() {
  const [user, setUser] = useState(null);
  const [text, setText] = useState("created");
  const [activeBtn, setActiveBtn] = useState("created");
  const [pins, setPins] = useState(null);

  const { userId } = useParams();
  const navigate = useNavigate();

  const randomImage =
    "https://source.unsplash.com/random/1600x900/?nature,photography,technology";

  const activeBtnStyles =
    "bg-red-500 text-white p-2 rounded-full font-bold w-20 outline-none";
  const notActiveBtnStyles =
    "bg-primary text-black mr-4 p-2 rounded-full font-bold w-20 outline-none";

  function logout() {
    localStorage.clear();
    googleLogout();

    navigate("/login");
  }

  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);

  useEffect(() => {
    if (text === "created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);

      client.fetch(createdPinsQuery).then((data) => {
        setPins(data);
      });
    } else {
      const savedPinsQuery = userSavedPinsQuery(userId);

      client.fetch(savedPinsQuery).then((data) => {
        setPins(data);
      });
    }
  }, [text, userId]);

  if (!user) {
    return <Spinner message="Loading Profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center items-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex justify-center flex-col items-center">
            <img
              src={randomImage}
              alt="banner-pic"
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
            />
            <img
              src={user.image}
              alt="user-pic"
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 p-2 z-1">
              {userId === user._id && (
                <button
                  type="button"
                  className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                  onClick={logout}
                >
                  <AiOutlineLogout color="red" fontSize={21} />
                </button>
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("created");
              }}
              className={`${
                activeBtn === "created" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActiveBtn("saved");
              }}
              className={`${
                activeBtn === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              saved
            </button>
          </div>
          {pins?.length ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center w-full text-xl mt-2">
              No pins found
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
