import { Fragment, useEffect,  useState } from "react";
import { FormData } from "./Create";
import { Link,useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import InputTag from "../components/InputTag";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [notFound, setNotFound] = useState("");
  const [_,setSearchParams] = useSearchParams()

  // const page = searchParams.get('page')
  // const pageSize = searchParams.get('pageSize')

  const fetchData = async () => {
    try {
      // const res = await fetch(`http://localhost:3000/post?topic=${searchTerm}&username=${searchTerm}`);
      const res = await fetch(`http://localhost:3000/post?topic=${searchTerm}`);
        const data = await res.json();
        console.log(data);
        setPosts(data.getAllPost);
        if(data.getAllPost.length == 0) setNotFound(`${searchTerm} value Not found`) 
        if(data.getAllPost.length >  1) setNotFound("")
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
        setSearchParams({})
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
         placeholder="Search for Topics, People"
         value={searchTerm}
         onChange={e=>setSearchTerm(e.target.value)}
        />
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <main className="post-container">
        {posts.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`}>
         <PostCard show = {true} post={e} key={i} />
          </Link>
        ))}
      </main>
      {notFound}
    </Fragment>
  );
};

export default Home;
