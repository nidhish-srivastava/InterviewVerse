import {  useNavigate } from "react-router-dom"
import hero from '../assets/Hero.jpg'
import Button from "./Button"
import { useTrackerContext } from "../context/context"
import toast, { Toaster } from "react-hot-toast"
function Hero() {

  const {isAuthenticated} = useTrackerContext()
  const navigate = useNavigate()
  const navigateHandler = () =>{
      if(isAuthenticated){
        navigate("/create")
      }
      toast.error("First Login")
  }
  return (
    <section className="hero-section">
      <Toaster/>
        <div className="left-side-hero">
            <h1>Interview Tracker</h1>
            <p>
            A solution to all the techies and non-techies giving countless interviews and unable to keep a track of them. Search and learn from other interview experiences based on your topic,create your own tracks and have a list of what all you created.
            </p>
            {/* <button className="create-interview-hero-btn"> */}
          {/* <Link className = "create" to={`${loggedInUser?.username.length ??0 > 1 ? "/create" : "/login"}`}> */}
          <span>
            <Button onClick={navigateHandler} style={{width : "fit-content"}} label="Create Interview Track" className="create-interview-hero-btn"/>
          </span>
            {/* </Link> */}
            {/* </button> */}
        </div>
          <div className="hero-img-container">
            <img src={hero} alt="hero-img" loading="lazy" />
          </div>

    </section>
  )
}

export default Hero