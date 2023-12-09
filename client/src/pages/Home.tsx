import { Link } from "react-router-dom"
function Home() {
  return (
    <div>
          <Link className = "create" to="/create">Create Interview Track</Link>
    </div>
  )
}

export default Home