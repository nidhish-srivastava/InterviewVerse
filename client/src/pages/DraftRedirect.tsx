import { useEffect } from "react"
import { useTrackerContext } from "../context/context"
import { url } from "../utils"

function DraftRedirect() {
    const {loggedInUser} = useTrackerContext()
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
            location.replace(`/draft/${data?.postId}`)
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