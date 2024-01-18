import { useEffect, useState } from "react"
import { customReadingLists } from "./FullSinglePost"
import { useTrackerContext } from "../context/context";
import { Link } from "react-router-dom";
import { url } from "../utils";

type props = {
    user ?: boolean
    username?:string
}

function CustomReadingLists({user,username} : props) {
  const { loggedInUser ,isAuthenticated} = useTrackerContext();
  const [readingLists,setReadingLists] = useState<customReadingLists[]>([])
   
  const userId = loggedInUser?.id

  useEffect(() => {
    const fetchMyCustomReadingLists = async()=>{
      const response = await fetch(`${url}/readingList/fetchAll/${userId}`)
      const data = await response.json()
      setReadingLists(data)
    }
    const fetchUserCustomReadingLists = async()=>{
        const response = await fetch(`${url}/readingList/fetchPublicOnly/${username}`)
        const data = await response.json()
        setReadingLists(data)
    }
    if(!user){
        fetchMyCustomReadingLists()
    }
    else{
        fetchUserCustomReadingLists()
    }
  }, [isAuthenticated]);

  return (
    <>
          {readingLists?.map(e=>(
      <Link key={e?._id} to={`${!user ? `/me/lists/custom/${e?.name}-${e?._id}` : `${e?.name}`}`}>
      <h3 style={{cursor : "pointer"}}>{e?.name}</h3>
      </Link>
      ))}
    </>
  )
}

export default CustomReadingLists