import { Fragment, useEffect, useState } from "react";
import { FormData } from "./DraftWrite";
import { Link, useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import InputTag from "../components/ui/InputTag";
import { titleParse, url } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsContainer from "../components/Layouts/PostsContainer";
import Navbar from "../components/Layouts/Navbar";

const InterviewTrackExplore = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParam, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post?title=${searchTerm}&username=${searchTerm}`
      );
      const data = await res.json();
      console.log(data);
      setPosts(data?.getAllPosts);
      if (data.getAllPosts.length == 0 && searchTerm.length > 1)
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
          placeholder="Search"
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
        {posts?.map((e, i) => (
          <Link to={`/${titleParse(e.title)}/${e._id}`} key={i}>
            <PostCard show={true} post={e} />
          </Link>
        ))}
      </PostsContainer>
    </Fragment>
  );
};

export default InterviewTrackExplore;