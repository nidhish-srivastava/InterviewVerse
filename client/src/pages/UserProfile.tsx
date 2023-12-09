import { Fragment,useEffect,useState } from "react"
import { useParams,Link } from "react-router-dom"
import { FormData } from "./Create"
import PostCard from "../components/PostCard"
import { url } from "../utils"
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SingleProfile = () => {
  const  {username} = useParams()
  const [userPosts,setUserPosts] = useState<FormData[]>([])
  const [userfound,setUserFound] = useState(false)
  const [loading,setLoading] = useState(false)

  useEffect(()=>{
  const userProfileHandler = async() =>{
    // WHat we are passing is the post id,we need to pass the user auth id,then only it can find the user using authRef,then we will populate it with his posts
    // First we need to find userAuth id
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
        <h3>{username} not found</h3>
        )
        :  <Fragment>
      <h3 style={{padding : "1rem"}}>{username}</h3>
      <h3 className="center">
      List of all his interview experiences
      </h3>
      <main className="post-container">
        {userPosts.map((e,i)=>(
          <Link to={`${e._id}`}>
          <PostCard post={e} key={i} show={false} />
          </Link>
        ))}
      </main>
      </Fragment>
      }
    </>
}
      </>
  )
}

export default SingleProfile