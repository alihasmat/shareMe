import { Link, useNavigate } from "react-router-dom";
import { IoMdAdd, IoMdSearch } from "react-icons/io";

function Navbar({ searchTerm, setSearchTerm, user }) {
  const navigate = useNavigate();
  if (!user) return null;

  return (
    <nav className="flex gap-2 md:gap-5 w-full mt-5 pb-7">
      <div className="bg-white flex justify-start items-center px-2 rounded-md border-none outline-none w-full focus-within:shadow-sm">
        <IoMdSearch fontSize={21} className="ml-1" />
        <input
          type="text"
          className="w-full p-2 outline-none bg-white"
          placeholder="Search"
          value={searchTerm}
          onFocus={() => navigate("/search")}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className="hidden md:block">
          <img src={user.image} alt="user" className="w-14 h-12 rounded-lg" />
        </Link>
        <Link
          to="create-pin"
          className="bg-black text-white w-12 h-12 md:w-14 md:h-12 flex justify-center items-center rounded-lg"
        >
          <IoMdAdd />
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
