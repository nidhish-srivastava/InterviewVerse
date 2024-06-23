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
    <h4 className="mt-[2rem] text-center text-lg">Under development</h4>
    </>
  )
}

export default ReadingHistory