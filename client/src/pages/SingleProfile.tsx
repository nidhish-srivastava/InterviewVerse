import { useParams } from "react-router-dom"

const SingleProfile = () => {
  const  {username} = useParams()
  return (
    <div>
      <h3>{username}</h3>
      List of all his interview experiences
      <div>
        
      </div>
    </div>
  )
}

export default SingleProfile