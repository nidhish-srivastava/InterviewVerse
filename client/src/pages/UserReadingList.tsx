import { useParams } from "react-router-dom";
import LibraryContainer from "../components/Layouts/LibraryContainer";
import UserProfileSections from "../components/UserProfileSections";
import CustomReadingLists from "../components/Bookmarks/CustomReadingLists";
import Navbar from "../components/Layouts/Navbar";

function UserReadingList() {
  const { username } = useParams();
  return (
    <>
    <Navbar/>
      <h3 className="p-4 text-center text-2xl font-medium">
        {username}
      </h3>
      <LibraryContainer>
        <UserProfileSections username={username} />
        <div className="p-16 flex flex-col gap-16">
          <CustomReadingLists username={username} user={true} />
        </div>
      </LibraryContainer>
    </>
  );
}

export default UserReadingList;
