import { useParams } from "react-router-dom"
import LibraryContainer from "../components/LibraryContainer"
import UserProfileSections from "../components/UserProfileSections"
import CustomReadingLists from "../components/CustomReadingLists"

function UserReadingList() {
  const  {username} = useParams()
  
  return (
    <>
      <h3 style={{padding : "1rem"}} className="center">{username}</h3>
        <LibraryContainer>
            <UserProfileSections username={username}/>
            <div className="reading-list-container">
        <CustomReadingLists username={username} user={true}/>
            </div>
        </LibraryContainer>
        </>
  )
}

export default UserReadingList