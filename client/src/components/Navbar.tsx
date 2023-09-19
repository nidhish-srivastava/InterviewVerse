import { useEffect} from "react"
import { useTrackerContext } from "../context/context"
import { Link } from "react-router-dom"

const Navbar = () => {
  const {loggedInUser,setLoggedInUser} = useTrackerContext()
  const getProfile = async() =>{
    const response = await fetch(`http://localhost:3000/auth/me`,{
      method : "GET",
      headers : {
        Authorization : "Bearer " + localStorage.getItem("token")
      }
    })
    const data = await response.json()
    // console.log(data);
    setLoggedInUser(data)
  }
  useEffect(()=>{
    getProfile()
  },[])
  return (
    <div>
      <Link to={`create`}>Create</Link>
      {loggedInUser?.username?.length ?? 0 > 1 ? (
              <div>
                <button>Profile</button>
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