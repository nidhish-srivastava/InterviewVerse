import { Fragment, useEffect,  useState } from "react";
import { FormData } from "./Create";
import { Link,useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import InputTag from "../components/InputTag";
import { url } from "../utils";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam,setSearchParams] = useSearchParams()


  const fetchData = async () => {
    try {
      // const res = await fetch(`http://localhost:3000/post?topic=${searchTerm}&username=${searchTerm}`);
      const res = await fetch(`${url}/post?topic=${searchTerm}&username=${searchTerm}`);
        const data = await res.json();
        // console.log(data);
        setPosts(data.getAllPost);
        if(data.getAllPost.length == 0 && searchTerm.length>1) setSearchParams({searchUserParam : `${searchTerm} not found`})
    } catch (error) {
  }
  };

  
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
      if(searchTerm.length>1){
        setSearchParams({searchUserParam : searchTerm})
      }
      else{
        setSearchParams("")
      }
    }, 700);
    return () => clearInterval(timer);
  }, [searchTerm]);


  return (
    <Fragment>
      <div className="search-bar">
        <InputTag
        className="search-bar-input"
         type="search"
         placeholder="Search Topic or User"
         value={searchTerm}
         onChange={e=>setSearchTerm(e.target.value)}
         />
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <h4>
         {searchParam.get('searchUserParam')}
      </h4>
      <main className="post-container">
        {posts.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`}>
         <PostCard show = {true} post={e} key={i} />
          </Link>
        ))}
      </main>
    </Fragment>
  );
};

export default Home;
