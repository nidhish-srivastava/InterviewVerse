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
      <Link to="/">Home</Link>
      <Link to="create">Create</Link>
      </div>
      <div>
      {loggedInUser?.username?.length ?? 0 > 1 ? (
        <div>
          <Link to={`/saved-posts/${loggedInUser?.username}`}>Saved Posts</Link>
          <Link to={`/my-posts/${loggedInUser?.username}`}>My Posts</Link>
        <Button
          onClick={() => {
            localStorage.setItem("token", "");
            window.location.href = "/";
          }}
          label="Logout"
          className="logout-btn"
        />
          </div>
      ) : (
        <div style={{padding : "1rem"}}>
        <Link to="/register">SignUp</Link>
        <Link to="/login">Login</Link>
        </div>
      )}
        </div>
    </nav>
  </header>
  
  )
}

export default Navbar