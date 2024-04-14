import MyLibraryCategories from "../components/MyLibraryCategories"
import LibraryContainer from "../components/LibraryContainer"
import Navbar from "../components/Navbar"

function ReadingHistory() {
  return (
    <>
    <Navbar/>
    <LibraryContainer>
        <MyLibraryCategories/>
    </LibraryContainer>
    </>
  )
}

export default ReadingHistory