import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import defaultDp from "../../assets/defauldp.jpg"
import { Draft } from "../Icons/Draft";
import { BookMarkIcon } from "../Icons/Bookmark";
import { LogoutIcon } from "../Icons/Logout";
import logo from "../../assets/logo.png";
// import {  MdOutlineExplore } from "react-icons/md";
import { IoCreateOutline } from "react-icons/io5";
import { IoMdSave } from "react-icons/io";

type NavbarProps = {
  loading?: boolean;
  setLoading?: React.SetStateAction<boolean>;
};

const Navbar = ({}: NavbarProps) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

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
    <nav className="flex justify-between items-center flex-wrap px-6 sm:px-12 py-4 font-montserrat">
      {/* Left section of the navbar */}
      <div className="flex items-center gap-8 w-full sm:w-auto">
        <Link to="/" className="flex items-center justify-center sm:justify-normal w-full sm:w-auto">
          <img alt="logo" className="w-auto h-8" src={logo} />
        </Link>
        {/* <Link to="/interview-tracks" className="hidden text-xl sm:flex items-center gap-1 font-medium">
          Explore
          <MdOutlineExplore/>
        </Link> */}
      </div>

      {/* Right section of the navbar */}
      <div className="flex w-full sm:w-auto justify-center sm:justify-normal items-center gap-8 mt-12 sm:mt-0">
        <Link to="/draft" className="text-xl flex items-center gap-1 font-medium">
          <IoCreateOutline/>
          Write
        </Link>

        {/* Profile dropdown */}
        <div className="relative">
          <div
            className="w-10 h-10 rounded-full overflow-hidden cursor-pointer"
            onClick={() => setShowModal((prev) => !prev)}
            ref={modalRef}
          >
            <img src={defaultDp} alt="profile" className="w-full h-full object-cover" loading="lazy" />
          </div>

          {/* Dropdown modal */}
          {showModal && (
            <div className="absolute right-0 mt-2 w-40 sm:w-48 bg-white rounded-lg shadow-lg z-50">
              <div className="p-4 flex flex-col gap-4">
                <Link to="/me/lists" className="flex items-center gap-2 text-sm">
                  <BookMarkIcon className="text-gray-600" />
                  <span className="ml-[2.8px]">Bookmarks</span>
                </Link>
                <Link to="/drafts" className="flex items-center gap-2 text-sm">
                  <Draft className="text-gray-600" />
                  <span>Drafts</span>
                </Link>
                <Link to="/me/interview-tracks" className="flex items-center gap-2 text-sm">
                  {/* <Draft className="text-gray-600" /> */}
                  <IoMdSave className="text-xl mr-1"/>
                  <span>My Interviews</span>
                </Link>
                <button onClick={logouthandler} className="flex items-center gap-2 text-sm hover:text-red-500">
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
