import { useState, useRef, useEffect } from "react";
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Link, Route, Routes } from "react-router-dom";
import { Sidebar, UserProfile } from "../components";
import Pins from "./Pins";
import logo from "../assets/logo.png";
import { userQuery } from "../utils/data";
import { client } from "../client";
import { fetchUser } from "../utils/fetchUser";

function Home() {
  const scrollRef = useRef(null);
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);

  const userInfo = fetchUser();

  useEffect(() => {
    const query = userQuery(userInfo?.sub);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, []);

  useEffect(() => {
    scrollRef.current.scrollTo(0, 0);
  }, []);

  return (
    <header className="flex flex-col bg-gray-50 md:flex-row h-screen transition-[height]duration-75 ease-out">
      <section className="hidden md:flex flex-initial h-screen">
        <Sidebar user={user && user} />
      </section>
      <section className="md:hidden flex flex-row">
        <div className="flex flex-row justify-between p-2 w-full items-center shadow-md">
          <HiMenu
            fontSize={40}
            className="cursor-pointer"
            onClick={() => setToggleSidebar(true)}
          />
          <Link to="/">
            <img src={logo} alt="logo" className="w-28" />
          </Link>
          <Link to={`user-profile/${user?._id}`}>
            <img
              src={user?.image}
              alt="user-pic"
              className="w-9 h-9 rounded-full"
            />
          </Link>
          {toggleSidebar && (
            <div className="fixed w-4/5 top-0 left-0 h-screen bg-white overflow-y-auto shadow-md z-10 animate-slide-in">
              <div className="absolute w-full flex justify-end p-2 items-center">
                <AiFillCloseCircle
                  fontSize={30}
                  className="cursor-pointer"
                  onClick={() => setToggleSidebar(false)}
                />
              </div>
              <Sidebar user={user && user} closeToggle={setToggleSidebar} />
            </div>
          )}
        </div>
      </section>
      <section
        className="pb-2 flex-1 h-screen overflow-y-scroll"
        ref={scrollRef}
      >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile />} />
          <Route path="/*" element={<Pins user={user && user} />} />
        </Routes>
      </section>
    </header>
  );
}

export default Home;
