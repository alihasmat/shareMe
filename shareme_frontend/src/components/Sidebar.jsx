import { NavLink, Link } from "react-router-dom";
import { RiHomeFill } from "react-icons/ri";
import { categories } from "../utils/data";

import logo from "../assets/logo.png";

const isActiveStyle =
  "flex items-center px-5 gap-3 font-extrabold border-black transition-all duration-200 ease-in-out capitalize";

const isNotActiveStyle =
  "flex items-center px-5 gap-3 text-gray-500 hover:text-black transition-all duration-200 ease-in-out capitalize";

function Sidebar({ user, closeToggle }) {
  function handleCloseSidebar() {
    if (closeToggle) closeToggle(false);
  }

  return (
    <section className="flex flex-col justify-between bg-white h-full overflow-y-scroll min-w-2010 hide-scrollbar">
      <div className="flex flex-col">
        <Link to="/" className="flex px-5 gap-2 my-6 pt-1 w-190 items-center">
          <img
            src={logo}
            alt="logo"
            className="w-full"
            onClick={handleCloseSidebar}
          />
        </Link>

        <div className="flex flex-col gap-5">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? isActiveStyle : isNotActiveStyle
            }
            onClick={handleCloseSidebar}
          >
            <RiHomeFill /> Home
          </NavLink>
          <h3 className="mt-2 px-5 text-base 2xl:text-xl">
            Discover Categories
          </h3>
          {categories.slice(0, categories.length - 1).map((category) => (
            <NavLink
              to={`/category/${category.name}`}
              className={({ isActive }) =>
                isActive ? isActiveStyle : isNotActiveStyle
              }
              onClick={handleCloseSidebar}
              key={category.name}
            >
              <img
                src={category.image}
                alt="category"
                className="rounded-full w-8 h-8 shadow-sm"
              />

              {category.name}
            </NavLink>
          ))}
        </div>
      </div>
      {user && (
        <Link
          to={`user-profile/${user._id}`}
          className="flex my-5 mb-3 gap-2 items-center bg-white rounded-lg shadow-lg mx-3"
          onClick={handleCloseSidebar}
        >
          <img src={user.image} className="w-10 h-10 rounded-full" />
          <p>{user.userName}</p>
        </Link>
      )}
    </section>
  );
}

export default Sidebar;
