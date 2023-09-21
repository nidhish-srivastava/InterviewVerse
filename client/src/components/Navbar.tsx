import { useEffect} from "react"
import { useTrackerContext } from "../context/context"
import { Link } from "react-router-dom"
import Button from "./Button"

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
    <header className="header">
    <nav className="nav">
      <div>
      <Link to="create">Create</Link>
      <Link to="/">Home</Link>
      </div>
      <div>
      {loggedInUser?.username?.length ?? 0 > 1 ? (
        <Link to={`/my-posts/${loggedInUser?.username}`}>My Posts</Link>
      ) : (
        <Link to="/register">SignUp</Link>
      )}
      {loggedInUser?.username?.length ?? 0 > 1 ? (
        <Button
          onClick={() => {
            localStorage.setItem("token", "");
            window.location.href = "/";
          }}
          label="Logout"
          className="logout-btn"
        />
      ) : (
        <Link to="/login">Login</Link>
      )}
        </div>
    </nav>
  </header>
  
  )
}

export default Navbar