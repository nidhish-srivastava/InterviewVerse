import { Fragment,useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import { FormData } from "./Create"
import PostCard from "../components/PostCard"
import { url } from "../utils"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import PostsContainer from "../components/PostsContainer"
import UserProfileSections from "../components/UserProfileSections"
import LibraryContainer from "../components/LibraryContainer"

const SingleProfile = () => {
  const  {username} = useParams()
  const [userPosts,setUserPosts] = useState<FormData[]>([])
  const [userfound,setUserFound] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
  const userProfileHandler = async() =>{
    setLoading(true)
    try {
      const response = await fetch(`${url}/post/search/${username}`)
      if(response.status==200){
        const data = await response.json()
        setUserPosts(data)
      }
      if(response.status==404){
        setUserFound(true)
      }
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }
    userProfileHandler()
  },[])

  return (
    <>

 {loading ? <div className="skeleton-loading">
            <Skeleton count={5}/>
            </div>  : 
    <>
      {userfound ? (
        <h3 className="center">{username} not found</h3>
        )
        :  <Fragment>
      <h3 style={{padding : "1rem"}} className="center">{username}</h3>
      <LibraryContainer>
      <UserProfileSections username={username}/>
      </LibraryContainer>
        <PostsContainer>
        {userPosts.map((e,i)=>(
          <Link to={`/${e.topic}/${e._id}`} key={i} >
          <PostCard post={e} show={false} />
          </Link>
        ))}
        </PostsContainer>
      </Fragment>
      }
    </>
}
      </>
  )
}

export default SingleProfile