import { useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import { FormData } from "./Create"
import PostCard from "../components/PostCard"

const SingleProfile = () => {
  const  {username} = useParams()
  const [userPosts,setUserPosts] = useState<FormData[]>([])

  const userProfileHandler = async() =>{
    // WHat we are passing is the post id,we need to pass the user auth id,then only it can find the user using authRef,then we will populate it with his posts
    // First we need to find userAuth id
    const response = await fetch(`http://localhost:3000/post/search/${username}`)
    if(response.status==200){
      const data = await response.json()
      setUserPosts(data)
    }
  }

  useEffect(()=>{
    userProfileHandler()
  },[])

  return (
    <div>
      <h3>{username}</h3>
      <h3 style={{textAlign : "center"}}>
      List of all his interview experiences
      </h3>
      <main className="post-container">
        {userPosts.map((e,i)=>(
          <Link to={`${e._id}`}>
          <PostCard post={e} key={i} show={false} />
          </Link>
        ))}
      </main>
    </div>
  )
}

export default SingleProfile