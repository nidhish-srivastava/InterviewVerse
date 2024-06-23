import { useEffect, useState } from "react";
import { customReadingLists } from "./FullSinglePost";
import { useTrackerContext } from "../context/context";
import { Link } from "react-router-dom";
import { dateFormatter, url } from "../utils";

type props = {
  user?: boolean;
  username?: string;
};

function CustomReadingLists({ user, username }: props) {
  const { loggedInUser, isAuthenticated } = useTrackerContext();
  const [readingLists, setReadingLists] = useState<customReadingLists[]>([]);

  const userId = loggedInUser?.id;

  const fetchMyCustomReadingLists = async () => {
    const response = await fetch(`${url}/readingList/fetchAll/${userId}`);
    const data = await response.json();
    setReadingLists(data);
  };
  const fetchUserCustomReadingLists = async () => {
    const response = await fetch(
      `${url}/readingList/fetchPublicOnly/${username}`
    );
    const data = await response.json();
    // console.log(data);
    setReadingLists(data);
  };
  useEffect(() => {
    if (!user) {
      fetchMyCustomReadingLists();
    } else {
      fetchUserCustomReadingLists();
    }
  }, [isAuthenticated]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
      {readingLists.length > 0 ? (
        readingLists?.map((list) => (
          <Link
            key={list?._id}
            to={
              !user
                ? `/me/lists/custom/${list?.name}-${list?._id}`
                : `${list?.name}`
            }
            className="bg-white rounded-lg shadow-md p-4 hover:shadow-xl transition duration-300"
          >
            <div className="mb-2">
              <h3 className="text-xl font-semibold cursor-pointer">
                {list?.name}
              </h3>
              <p className="text-gray-500 text-sm">
                Last Updated: {dateFormatter(list?.updatedAt)}
              </p>
              <p className="text-gray-500 text-sm">
                Visibility: {list?.visibilty}
              </p>
            </div>
            {/* You can add more fields here as needed */}
          </Link>
        ))
      ) : (
        <h3 className="text-center text-xl font-medium">No Reading Lists</h3>
      )}
    </div>
  );
}

export default CustomReadingLists;
