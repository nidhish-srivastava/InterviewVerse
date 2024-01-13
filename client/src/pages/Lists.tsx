import { useState, useEffect } from "react";
import { useTrackerContext } from "../context/context";
import { url } from "../utils";
import { customReadingLists } from "../components/FullSinglePost";
import { Link } from "react-router-dom";

const Lists = () => {
  const { loggedInUser ,isAuthenticated} = useTrackerContext();
  const [readingLists,setReadingLists] = useState<customReadingLists[]>([])

  const userId = loggedInUser?.id
  useEffect(() => {
 
    const fetchReadingLists = async()=>{
      const response = await fetch(`${url}/readingList/fetchAll/${userId}`)
      const data = await response.json()
      setReadingLists(data)
    }
      fetchReadingLists()
  }, [isAuthenticated]);

  return (
    <main className="library-container">
    <div className="library-heading">Your Library</div>
    <div className="my-lists-bar">
    <h4>Your Lists</h4>
    <h4>Saved Lists</h4>
    <h4>Reading History</h4>
    </div>
    <div style={{margin : "0 auto",opacity : "0.2",marginTop : "1rem"}}>
      <hr />
    </div>
    <div className="reading-list-container">
      <Link to={`/lists/default`}>
      <h3>Reading Lists</h3>
      </Link>
    {readingLists?.map(e=>(
      <Link key={e?._id} to={`/lists/custom/${e?.name}-${e?._id}`}>
      <h3 style={{cursor : "pointer"}}>{e?.name}</h3>
      </Link>
      ))}
      </div>

    </main>
  );
};

export default Lists;
