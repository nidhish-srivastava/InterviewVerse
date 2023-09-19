import { Fragment, useEffect, useState } from "react";
import axios from "axios";

type postTypes = {
  explaination: string;
  desc: string;
  tags: string[];
  topic: string;
};

const Home = () => {
  const [posts, setPosts] = useState<postTypes[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/post?topic=${searchTerm}`
      );
      console.log(res.data);
      setPosts(res.data.getAllPost);
    } catch (error) {}
  };
  useEffect(() => {
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
            <h2>{e.topic}</h2>
            <h3>{e.desc}</h3>
            <span>
              {e.tags.map(e=>(
                <button>{e}</button>
              ))}
            </span>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default Home;
