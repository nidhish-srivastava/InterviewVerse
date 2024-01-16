import { useState, useEffect } from "react";
import { useTrackerContext } from "../context/context";
import { url } from "../utils";
import { customReadingLists } from "../components/FullSinglePost";
import { Link } from "react-router-dom";
import LibraryCategories from "../components/LibraryCategories";
import LibraryContainer from "../components/LibraryContainer";

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
      <LibraryContainer>
    <LibraryCategories/>
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
      </LibraryContainer>
  );
};

export default Lists;
