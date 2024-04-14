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
    </>
  );
}

export default SavedLists;
