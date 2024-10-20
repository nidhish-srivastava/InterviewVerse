import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Draft } from "../Icons/Draft";
import { BookMarkIcon } from "../Icons/Bookmark";
import { LogoutIcon } from "../Icons/Logout";
import logo from "../../assets/logo.png";
import { IoCreateOutline, IoSearch } from "react-icons/io5";
import { MdOutlineAccountBox } from "react-icons/md";
import { IoMdSave } from "react-icons/io";
import { useTrackerContext } from "../../context/context";
import SearchUser from "../SearchUser";

type NavbarProps = {
  dontShow?: boolean;
}

const Navbar = ({ dontShow }: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);
  const { loggedInUser } = useTrackerContext();
  const modalRef = useRef(null);
  const [showSearchModal, setShowSearchModal] = useState(false);

  const logouthandler = () => {
    sessionStorage.clear();
    localStorage.setItem("token", "");
    window.location.href = "/";
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowModal(false);
      }
    };
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [modalRef]);

  return (
    <nav className="flex justify-between items-center flex-wrap px-6 md:px-12 py-4 font-montserrat">
      {/* Left section of the navbar */}
      <div className="flex items-center justify-center gap-8 w-full md:w-auto">
        <Link
          to="/"
          className="flex items-center justify-center md:justify-normal w-full md:w-auto"
        >
          <img alt="logo" className="w-auto h-8" src={logo} />
        </Link>
      </div>

      {/* Right section of the navbar */}
      <div className="mt-12 md:mt-0 flex w-full md:w-auto justify-center md:justify-normal items-center gap-8">
        {!dontShow && (
          <div className="border rounded-2xl relative pr-8 pl-10 py-2">
            <span className="text-xl  absolute left-2 font-bold">
              <IoSearch />
            </span>
            <input
              onClick={() => setShowSearchModal(true)}
              className="border-none outline-none disabled:bg-inherit"
              type="search"
              placeholder="Search"
            />
          </div>
        )}

        {showSearchModal && <SearchUser setShowModal={setShowSearchModal} />}

        <Link
          to="/draft"
          className="text-xl flex items-center gap-1 font-medium"
        >
          <IoCreateOutline />
          Write
        </Link>

        {/* Profile dropdown */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
            ref={modalRef}
          >
            <img
              src={loggedInUser?.dp}
              alt="profile"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Dropdown modal */}
          {showModal && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4 flex flex-col gap-4">
                <Link to={`#`} className="nav-item">
                  <MdOutlineAccountBox className="text-black text-xl mr-1" />
                  <span>My Account</span>
                </Link>
                <Link to="/me/lists" className="nav-item">
                  <BookMarkIcon className="text-gray-600" />
                  <span className="ml-[2.8px]">Bookmarks</span>
                </Link>
                <Link to="/drafts" className="nav-item">
                  <Draft className="text-gray-600" />
                  <span>Drafts</span>
                </Link>
                <Link to="/me/interview-tracks" className="nav-item">
                  {/* <Draft className="text-gray-600" /> */}
                  <IoMdSave className="text-xl mr-1" />
                  <span>My Interviews</span>
                </Link>
                <button
                  onClick={logouthandler}
                  className="nav-item hover:text-red-500"
                >
                  <LogoutIcon className="text-gray-600" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
