import { Fragment, useEffect, useState } from "react";
import { FormData } from "./DraftWrite";
import { Link, useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import InputTag from "../components/InputTag";
import { url } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsContainer from "../components/PostsContainer";
import Navbar from "../components/Navbar";

const InterviewTrackExplore = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post?topic=${searchTerm}&username=${searchTerm}`
      );
      const data = await res.json();
      setPosts(data.getAllPost);
      if (data.getAllPost.length == 0 && searchTerm.length > 1)
        setSearchParams({ searchUserParam: `${searchTerm} not found` });
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
      if (searchTerm.length > 1) {
        setSearchParams({ searchUserParam: searchTerm });
      } else {
        setSearchParams("");
      }
    }, 700);
    return () => clearInterval(timer);
  }, [searchTerm]);

  return (
    <Fragment>
      <Navbar/>
      <div className="w-full sm:w-1/2 mx-auto flex justify-center items-center">
        <InputTag
          className="mt-4"
          type="search"
          placeholder="Search Topic or User"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div>
      <h4>{searchParam.get("searchUserParam")}</h4>
      <div style={{ width: "80%", margin: "0 auto" }}>
        {loading ? (
          <div className="skeleton-loading">
            <Skeleton count={5} />
          </div>
        ) : null}
      </div>
      <PostsContainer>
        {posts.map((e, i) => (
          <Link to={`/${e.topic}/${e._id}`} key={i}>
            <PostCard show={true} post={e} />
          </Link>
        ))}
      </PostsContainer>
    </Fragment>
  );
};

export default InterviewTrackExplore;
