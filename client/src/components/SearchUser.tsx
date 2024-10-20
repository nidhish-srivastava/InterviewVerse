import { useState, useEffect } from "react";
import { MdClose } from "react-icons/md";
import { url } from "../utils";
import { Link } from "react-router-dom";
import {  IoSearch } from "react-icons/io5";
import { FormData } from "../utils/types";

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchUser({ setShowModal }: Props) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<FormData[]>([]);
  const [isSearched, setIsSearched] = useState(false);

  // Debouncing the search handler
  useEffect(() => {
    const handler = setTimeout(() => {
      if (searchInput.length > 0) {
        searchHandler();
      } else {
        // Clear results if input is empty
        setSearchResults([]);
        setIsSearched(false);
      }
    }, 1000); // (300ms is a common choice)

    return () => {
      clearTimeout(handler); // Clear timeout on cleanup to prevent memory leaks
    };
  }, [searchInput]); // Runs when searchInput changes

  const searchHandler = async () => {
    try {
      const res = await fetch(
        `${url}/post?title=${searchInput}&username=${searchInput}&limit=${6}`
      );
      if (!res.ok) throw new Error("Error fetching search results");
      const data = await res.json();
      setSearchResults(data.getAllPosts);
      setIsSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const enterKeyHandler = async(e)=>{
    if(e.key == "Enter"){
      window.location.href = `/search?query=${searchInput}`
    }
  }
  return (
    <div className="fixed inset-0 flex items-start justify-center pt-12 bg-black bg-opacity-50 z-50">
      <div className="bg-white relative p-8 rounded-lg shadow-md w-full max-w-3xl max-h-[80vh] flex flex-col">
        <span
          className="absolute right-4 top-4 cursor-pointer"
          onClick={() => setShowModal(false)}
        >
          <MdClose className="text-2xl" />
        </span>
        <h2 className="text-2xl text-center font-bold mb-4">Search</h2>
        <div className="relative flex border border-gray-300 py-2 pl-2 text-sm outline-none rounded-md w-full mb-4">
        <input
          className="border-none w-full bg-transparent outline-none px-2"
          type="text"
          autoFocus
          placeholder="Start Typing to Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={enterKeyHandler}
          />
          {/* <h2 className="absolute right-0 w-1/3 text-gray-400">Press <span className="inline-block"><IoEnterOutline/></span> to search all results</h2> */}
        </div>
        <div className="overflow-y-auto flex-grow">
          {searchResults.length > 0 ? (
            searchResults.map((post) => (
              <SearchResultCard key={post._id} post={post} />
            ))
          ) : (
            <div className="my-2">
              {isSearched ? (
                <p className="text-center text-gray-500">No results found</p>
              ) : 
              <p className="text-center text-gray-500"> <span className="inline-block mr-2"><IoSearch/></span> Search for articles , people</p>
              }
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchUser;

const SearchResultCard = ({ post }) => {
  return (
    <Link to={`${post.title}/${post._id}`}>
      <div className="border flex items-center justify-between border-gray-200 rounded-lg px-4 mb-4 shadow-sm">
        <div className="flex-grow">
          <h3 className="text-lg font-bold mb-2">{post.title}</h3>
          <p className="text-sm text-gray-600">{post.content}</p>
          <p className="text-sm text-gray-500 mt-2">Posted by: {post.username}</p>
        </div>
        <div className="w-40 h-40 flex-shrink-0 py-4">
          <img
            src={post.image}
            alt=""
            className="w-full h-full object-cover rounded-md"
            loading="lazy"
          />
        </div>
      </div>
    </Link>
  );
};
