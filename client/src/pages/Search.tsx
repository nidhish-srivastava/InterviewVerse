import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PostCard from "../components/PostCard";
import { titleParse, url } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PostsContainer from "../components/Layouts/PostsContainer";
import Navbar from "../components/Layouts/Navbar";
import { FormData } from "../utils/types";

const Home = () => {
  const [posts, setPosts] = useState<FormData[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearched, setIsSearched] = useState(false);

  const [searchInput, setSearchInput] = useState("");

  const searchHandler = async (page = 1) => {
    setLoading(true);
    try {
      const res = await fetch(
        `${url}/post?title=${searchInput}&username=${searchInput}&limit=${9}&page=${page}`
      );
      if (!res.ok) throw new Error("Error fetching search results");
      const data = await res.json();
      if (page === 1) {
        setPosts(data?.getAllPosts);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...data.getAllPosts]);
      }
      setHasMore(data.getAllPosts.length > 0);
      setLoading(false);
      setIsSearched(true);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    searchHandler(page);
  }, [page]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.length > 0) {
        searchHandler(page);
      } else {
        setPosts([]);
        setIsSearched(false);
      }
    }, 1000);
    return () => clearInterval(handler);
  }, [searchInput]);

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
      <Navbar dontShow={true} />
      <div className="relative flex border my-6 border-gray-300 py-2 pl-2 text-sm outline-none rounded-md w-1/2 mx-auto mb-4">
        <input
          className="border-none w-full bg-transparent outline-none px-2"
          type="text"
          autoFocus
          placeholder="Start Typing to Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>
      <div style={{ width: "80%", margin: "0 auto" }}>
        {loading && page === 1 ? (
          <div className="skeleton-loading">
            <Skeleton count={5} />
          </div>
        ) : null}
      </div>
      <PostsContainer>
        {posts.length > 0 ? (
          posts.map((e, i) => (
            <Link to={`/${titleParse(e.title)}/${e._id}`} key={i}>
              <PostCard show={true} post={e} />
            </Link>
          ))
        ) : (
          <div className="my-2">
            {isSearched ? (
              <p className="text-center text-gray-500">No results found</p>
            ) : null}
          </div>
        )}
      </PostsContainer>
      {/* Showing the loading skeleton when we scroll down */}
      {loading && page > 1 && (
        <div className="skeleton-loading">
          <Skeleton count={5} />
        </div>
      )}
    </>
  );
};

export default Home;
