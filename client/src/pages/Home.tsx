import { Fragment, useEffect, useState } from "react";
import { FormData } from "./Create";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const res = await fetch(
        `http://localhost:3000/post?topic=${searchTerm}`
      );
      if(res.status==200){
        const data = await res.json()
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
        <input
          type="search"
          placeholder="Search topic"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span className="search-icon">
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <div>
        {posts.map((e,i) => (
          <div key={i}>
            <h2>Topic:{e.topic}</h2>
            <h3>Desc:{e.desc}</h3>
            <p>Details{e.details}</p>
                <h4>-{e.authRef?.username}</h4>
            <span>
              {e.tags?.map(e=>(
                <button>{e.name}</button>
                ))}
            </span>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
