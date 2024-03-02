import { useEffect } from "react"
import { useTrackerContext } from "../context/context"
import { url } from "../utils"
import { useNavigate } from "react-router-dom"

function DraftRedirect() {
    const {loggedInUser} = useTrackerContext()
    const navigate = useNavigate()
    useEffect(()=>{
    const createPost = async() =>{
        try {
          const response = await fetch(`${url}/post`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({desc : "",title : "",details : "",tags : [],username : loggedInUser?.username,published : false}),
          });
          if(response.status==201){
            const data = await response.json()
            navigate(`/draft/${data?.postId}`,{replace : true})
          }
        } catch (error) {
          
        }
        finally{
        }
      }
        createPost()
    },[])
  return (
    <></>
  )
}

export default DraftRedirect