import { Link } from "react-router-dom";
import LibraryCategories from "../components/Bookmarks/MyLibraryCategories";
import LibraryContainer from "../components/Layouts/LibraryContainer";
import CustomReadingLists from "../components/Bookmarks/CustomReadingLists";
import Navbar from "../components/Layouts/Navbar";
import { FaBook } from 'react-icons/fa'; 
import { useState } from "react";
import CreateNewList from "../components/CreateNewReadingList";
const MyLists = () => {
  const [showNewListModal,setShowNewListModal] = useState(false)

  return (
    <>
    <Navbar/>
    <LibraryContainer>
      <LibraryCategories />
      <div className="p-16 relative flex flex-col gap-16">
      <span onClick={()=>setShowNewListModal(true)} className="absolute top-0 right-2 font-medium text-sm cursor-pointer">Create New List</span>
      <div className="bg-white rounded-lg shadow-md p-4 flex items-center gap-4">
        <FaBook className="text-blue-600 text-2xl" /> {/* Icon */}
        <Link to={`/me/lists/default`} className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition-colors">
          Default Reading List
        </Link>
      </div>
      <CustomReadingLists />
    </div>
    </LibraryContainer>
    {
      showNewListModal && <CreateNewList setShowNewListModal={setShowNewListModal}/>
    }
    </>
  );
};

export default MyLists;
