import { Link } from "react-router-dom";
import LibraryCategories from "../components/MyLibraryCategories";
import LibraryContainer from "../components/LibraryContainer";
import CustomReadingLists from "../components/CustomReadingLists";

const MyLists = () => {
 

  return (
      <LibraryContainer>
    <LibraryCategories/>
    <div className="reading-list-container">
      <Link to={`/me/lists/default`}>
      <h3>Reading Lists</h3>
      </Link>
      <CustomReadingLists/>
      </div>
      </LibraryContainer>
  );
};

export default MyLists;
