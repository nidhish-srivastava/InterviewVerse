import { useEffect } from "react"
import { url } from "../utils";
import { useNavigate, useParams } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import toast from "react-hot-toast";

function VerifyToken() {
  const {token} = useParams()
  const {setLoggedInUser} = useTrackerContext()
  const navigate = useNavigate()
  
  useEffect(()=>{
    const verifyToken = async()=>{
      try {
        const response = await fetch(`${url}/auth/verify/${token}`);
        if(response.ok){
          const data = await response.json();
          toast.success("Account verified successfully");
          localStorage.setItem("token", data.token); // Store the access token
          setLoggedInUser({ username: data.username });
          navigate("/")
        }
        else{
          toast.error("Verification failed or token expired");
        }
      } catch (error) {
        toast.error("Verification failed or token expired");
      }
    }
    verifyToken()
  },[])

  return (
    <div>
        Verifying your account...
    </div>
  )
}

export default VerifyToken