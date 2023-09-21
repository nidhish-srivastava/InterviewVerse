import { Fragment, useEffect, useState } from "react";
import { FormData } from "./Create";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import InputTag from "../components/InputTag";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch(`http://localhost:3000/post?topic=${searchTerm}`);
      if (res.status == 200) {
        const data = await res.json();
        console.log(data);
        setPosts(data.getAllPost);
      }
    } catch (error) {}
  };

  useEffect(() => {
    console.log(posts);
    const timer = setTimeout(() => {
      fetchData();
    }, 700);
    return () => clearInterval(timer);
  }, [searchTerm]);

  return (
    <Fragment>
      <div className="search-bar">
        <InputTag
        className="search-bar-input"
         type="search"
         placeholder="Search based on Topic"
         value={searchTerm}
         onChange={e=>setSearchTerm(e.target.value)}
        />
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <main className="post-container">
        {posts.map((e, i) => (
          <Link to={`/${e.authRef?.username}/${e._id}`}>
         <PostCard show = {true} post={e} key={i} />
          </Link>
        ))}
      </main>
    </Fragment>
  );
};

export default Home;
