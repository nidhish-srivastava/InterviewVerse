import { useParams } from "react-router-dom";
import LibraryContainer from "../components/LibraryContainer";
import UserProfileSections from "../components/UserProfileSections";
import CustomReadingLists from "../components/CustomReadingLists";
import Navbar from "../components/Navbar";

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
