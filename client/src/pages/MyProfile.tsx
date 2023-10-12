import { useTrackerContext } from "../context/context"

const MyProfile = () => {
    const {loggedInUser} = useTrackerContext()
  return (
    <div>
       <h2 className="center">
         Hello {loggedInUser?.username}
        </h2>
    </div>
  )
}

export default MyProfile