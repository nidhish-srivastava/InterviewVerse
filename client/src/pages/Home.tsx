import { useEffect, useState } from "react";
import { FormData } from "./DraftWrite";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { titleParse, url } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsContainer from "../components/Layouts/PostsContainer";
import Navbar from "../components/Layouts/Navbar";

const InterviewTrackExplore = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  // const [searchTerm, setSearchTerm] = useState("");
  // const [searchParam, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  // const searchParamValue = searchParam.get("searchUserParam")
  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post?page=${page}&limit=9`
      );
      const data = await res.json();
      if (page === 1) {
        setPosts(data?.getAllPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.getAllPosts]);
      }
      setHasMore(data.getAllPosts.length > 0);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // const searchKeyHandler = (e) => {
  //   if (e.key === "Enter") {
  //     setPage(1);  // Reset to first page on new search
  //     setPosts([]); // Clear previous posts
  //     fetchData(1); // Fetch new posts
  //     if (searchTerm.length > 1) {
  //       setSearchParams({ searchUserParam: searchTerm });
  //     } else {
  //       setSearchParams("");
  //     }
  //   }
  // };

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
          document.documentElement.offsetHeight - 10 &&
        hasMore &&
        !loading
      ) {
        setPage((prevPage) => prevPage + 1);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasMore, loading]);

  return (
    <>
      <Navbar />
      {/* <div className="w-full sm:w-1/2 mx-auto flex justify-center items-center">
        <InputTag
          className="mt-4"
          type="search"
          placeholder="Search based on title or author"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={searchKeyHandler}
        />
        <span>
          <i className="fa-solid fa-magnifying-glass"></i>
        </span>
      </div> */}
      {/* {
        searchParamValue  &&
      <h4 className="ml-8">Results for {searchParamValue}</h4>
      } */}
      <div style={{ width: "80%", margin: "0 auto" }}>
        {loading && page === 1 ? (
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
      {loading && page > 1 && (
        <div className="skeleton-loading">
          <Skeleton count={5} />
        </div>
      )}
    </>
  );
};

export default InterviewTrackExplore;
