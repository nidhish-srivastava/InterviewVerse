import { useEffect} from "react"
import { useTrackerContext } from "../context/context"
import { Link } from "react-router-dom"

const Navbar = () => {
  const {loggedInUser,setLoggedInUser,setIsAuthenticated} = useTrackerContext()
  const getProfile = async() =>{
    const response = await fetch(`http://localhost:3000/auth/me`,{
      method : "GET",
      headers : {
        Authorization : "Bearer " + localStorage.getItem("token")
      }
    })
    // console.log(response.status);
    if(response.status!=403){
      const data = await response.json()
      setLoggedInUser({username : data.username,id : data._id})
      setIsAuthenticated(true)
    }
  }
  useEffect(()=>{
    getProfile()
  },[])
  return (
    <div>
      <Link to={`create`}>Create</Link>
      <Link to={`/`}>Home</Link>
      {loggedInUser?.username?.length ?? 0 > 1 ? (
              <div>
                <Link to={`/${loggedInUser?.username}`}>
                <button>My Posts</button>
                </Link>
                <button onClick={()=>{
                  localStorage.setItem("token","")
                  window.location.href = "/"
                }}>Logout</button>
              </div>
      ):(
        <div>
          <Link to={`/register`}>
          <button>SignUp</button>
          </Link>
          <Link to={`/login`}>
          <button>Login</button>
          </Link>
        </div>
      )}
    </div>
  )
}

export default Navbar