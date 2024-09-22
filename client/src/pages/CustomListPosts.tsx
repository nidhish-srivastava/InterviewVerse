import { Link, useParams } from "react-router-dom";
import { url } from "../utils";
import { useTrackerContext } from "../context/context";
import PostCard from "../components/PostCard";
import PostsContainer from "../components/Layouts/PostsContainer";
import useFetchHook from "../hooks/useFetchHook";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import Navbar from "../components/Layouts/Navbar";
import { FaEdit, FaLock, FaUnlock } from "react-icons/fa";
import { useEffect, useState } from "react";
import EditReadingList from "../components/EditReadingList";
import { MdDelete } from "react-icons/md";
import toast, { Toaster } from "react-hot-toast";
import Button from "../components/ui/Button";

function CustomListsPosts() {
  const { loggedInUser } = useTrackerContext();
  const params = useParams();
  const listId = params?.id?.split("-")[1];
  const { data, isLoading, error } = useFetchHook(
    `${url}/readingList/fetchPost/${loggedInUser?.id}/${listId}`
  );
  const [showEditModal, setShowEditModal] = useState(false);
  const [listName, setListName] = useState("");
  const [visibility, setVisibility] = useState("");

  useEffect(() => {
    setListName(data?.name);
    setVisibility(data?.visibility);
  }, [data]);

  const handleDeleteClick = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-4 p-2 bg-white">
          <span className="font-semibold">
            Are you sure you want to delete this list?
          </span>
          <div className="flex gap-4">
            <Button className="text-sm" onClick={() => handleConfirmDelete(t)}>
              Yes
            </Button>
            <Button className="text-sm" onClick={() => toast.dismiss(t.id)}>
              No
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
      }
    );
  };

  const handleConfirmDelete = async (t: any) => {
    try {
      const response = await fetch(`${url}/readingList`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          listId,
          userId: loggedInUser.id,
        }),
      });
      if (!response.ok) throw new Error("Error deleting");
      window.location.href = "/me/lists";
      toast.dismiss(t.id);
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading)
    return (
      <>
        <Navbar />
        <SkeletonLoader isLoading={isLoading} />
      </>
    );

  return (
    <>
      <Navbar />
      <h4 className="text-center mt-8">{error}</h4>
      <div className="mt-8 flex justify-center items-center gap-4 w-[75%] mx-auto">
        <h3 className="text-lg">{listName}</h3>
        <span>{visibility == "private" ? <FaLock /> : <FaUnlock />}</span>
        <div className="ml-auto flex gap-4">
          <span onClick={() => setShowEditModal(true)}>
            <FaEdit />
          </span>
          <span onClick={handleDeleteClick}>
            <MdDelete />
          </span>
          <Toaster />
        </div>
      </div>
      <PostsContainer>
        {data?.posts?.map((e, i) => (
          <Link to={`/${e?.username}/${e._id}`} key={i}>
            <PostCard post={e} show={true} />
          </Link>
        ))}
      </PostsContainer>
      {showEditModal && (
        <EditReadingList
          listId={listId}
          setShowEditModal={setShowEditModal}
          listName={listName}
          visibility={visibility}
          setListName={setListName}
          setVisibility={setVisibility}
        />
      )}
    </>
  );
}

export default CustomListsPosts;
