import LibraryCategories from "../components/Bookmarks/MyLibraryCategories";
import LibraryContainer from "../components/Layouts/LibraryContainer";
import Navbar from "../components/Layouts/Navbar";

function SavedLists() {
  return (
    <>
    <Navbar/>
    <LibraryContainer>
      <LibraryCategories />
    </LibraryContainer>
    <h4 className="mt-[2rem] text-center text-lg">Under development</h4>
    </>
  );
}

export default SavedLists;
