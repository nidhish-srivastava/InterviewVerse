import LibraryCategories from "../components/MyLibraryCategories";
import LibraryContainer from "../components/LibraryContainer";
import Navbar from "../components/Navbar";

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
