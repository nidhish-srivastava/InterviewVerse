import { useTrackerContext } from "../context/context";
import { FormData } from "../pages/DraftWrite";
import { dateFormatter, defaultDp, timeToReadPost, url } from "../utils";
import { Link, useNavigate, useParams } from "react-router-dom";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { useEffect, useRef, useState } from "react";
import savedIcon from "../assets/saved-icon.png";
import saveIcon from "../assets/save-icon.png";

type FullSinglePost = {
  singlePostObj?: FormData;
  show?: boolean;
};

export type customReadingLists = {
  visibilty: "public" | "private";
  _id: string;
  name: string;
  description: string;
  posts?: string[] | FormData[];
  updatedAt?:Date
};

const FullSinglePost = ({ singlePostObj, show }: FullSinglePost) => {
  const { id } = useParams();
  const { loggedInUser } = useTrackerContext();
  const { isAuthenticated } = useTrackerContext();
  const [present, setPresent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [check, setCheck] = useState(false);
  const [customReadingLists, setCustomReadingLists] = useState<
    customReadingLists[]
  >([]);
  const [modal, setModal] = useState(false);

  const postId = singlePostObj?._id;
  const userId = loggedInUser?.id;

  const removeSavedPost = async () => {
    const response = await fetch(
      `${url}/post/savedPosts/${loggedInUser?.id}/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status == 200) {
      toast.success("Removed Successfully");
      setPresent(false);
      // setTimeout(() => {
      //   navigate(`/saved-posts/${loggedInUser?.username}`);
      // }, 1000);
    }
  };

  const savePostHandler = async () => {
    const formData = {
      postId: id,
      userId: loggedInUser?.id,
    };
    if (isAuthenticated) {
      setCheck(true);
      await fetch(`${url}/post/savedPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      toast.success("Saved Successfully");
      setPresent(true);
    } else toast.error("Please Login to save");
  };

  useEffect(() => {
    const checkIfSaved = async () => {
      const response = await fetch(
        `${url}/post/savedPosts/check/${id}/${loggedInUser?.id}`,
        {
          method: "GET",
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      // return response.text();
      const data = await response.text();
      if (data == "true") {
        setPresent(true);
        setCheck(true);
      } else {
        setCheck(false);
        setPresent(false);
      }
    };

    checkIfSaved();
  }, [isAuthenticated]);

  const toggleModal = () => {
    // Logic for saving the post(post should be saved when user opens the modal)
    if (!showModal) {
      setShowModal(true);
      fetchReadingLists();
      if (!present) {
        savePostHandler();
      }
    }
    if (showModal) {
      setShowModal(false);
    }
  };

  const handleCheckboxChange = () => {
    setCheck((prev) => !prev);
    if (!check) {
      savePostHandler();
      setCheck(true);
    }
    if (check) {
      removeSavedPost();
      setCheck(false);
    }
  };

  const fetchReadingLists = async () => {
    const response = await fetch(
      `${url}/readingList/fetchAll/${loggedInUser?.id}`
    );
    const data = await response.json();
    // console.log(data);
    setCustomReadingLists(data);
  };

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      // Check if the clicked element is outside the modal
      if (
        modalRef.current &&
        !modalRef?.current?.contains(event.target as Node)
      ) {
        // Close the modal
        setShowModal(false);
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener("click", handleOutsideClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const addToThisList = async (
    listId: string | undefined,
    listName: string | undefined
  ) => {
    try {
      const response = await fetch(`${url}/readingList/insertPost`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId, postId, userId }),
      });
      if (response.status == 201) {
        toast.success(`Interview Track added to ${listName}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const removeList = async (
    listId: string | undefined,
    listName: string | undefined
  ) => {
    try {
      const response = await fetch(`${url}/readingList/removePost`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId, postId, userId }),
      });
      if (response.status == 200) {
        toast.success(`Interview Track removed from ${listName}`);
      }
    } catch (error) {}
  };

  const handleNewListOnChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    listId: string | undefined,
    listName: string | undefined
  ) => {
    if (e.target.checked) {
      addToThisList(listId, listName);
      toggleModal();
    } else {
      removeList(listId, listName);
      toggleModal();
    }
  };

  return (
    <>
      <Toaster />
      <main className="mx-auto max-w-screen-lg">
      <div className="w-4/5 mx-auto mb-10">
        <img src={singlePostObj?.image} className="w-2/5 mx-auto" alt="" />
      </div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          {singlePostObj?.title}
        </h1>
        <span className="text-base sm:text-lg text-gray-600 mb-4">
          {singlePostObj?.desc}
        </span>
        <br />
        <br />
        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
          <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full overflow-hidden">
            <img src={defaultDp} alt="" loading="lazy" />
          </div>
          <Link to={`/${singlePostObj?.username}`}>
            <span>{`${singlePostObj?.username}`}</span>
          </Link>
          &nbsp; &nbsp;
          <div style={{ fontSize: "15px" }}>
            {dateFormatter(singlePostObj?.createdAt as Date | number | string)}
            &nbsp; &nbsp;
            {timeToReadPost(singlePostObj?.details)} min read
          </div>
          {show && (
            <>
              <div className="">
                <Link to="update">
                  <button className="bg-blue-500 text-white px-4 py-2 mx-1 md:mx-2 rounded-md">
                    Update
                  </button>
                </Link>
                <button
                  className="bg-red-500 text-white px-4 py-2 mx-1 md:mx-2 rounded-md"
                  onClick={() => setModal(true)}
                >
                  Delete
                </button>
              </div>
            </>
          )}
          {isAuthenticated && (
            <>
              {singlePostObj?.username != loggedInUser?.username && (
                <div className="relative" ref={modalRef}>
                  {showModal && (
                    <div className="absolute w-80 p-6 bg-white shadow-md border border-gray-300 top-10 right-2 md:left-1/2 ">
                      <div className="flex justify-between items-center gap-8 mb-4">
                        <input
                          type="checkbox"
                          id="reading-list"
                          name="reading-list"
                          checked={check}
                          onChange={handleCheckboxChange}
                        />
                        <label htmlFor="reading-list">Reading List</label>
                        <span>
                          <i className="fa-solid fa-lock"></i>
                        </span>
                      </div>
                      {customReadingLists?.map((e) => (
                        <div
                          style={{ cursor: "pointer" }}
                          key={e?._id}
                          className="flex justify-between items-center gap-8 mb-4"
                        >
                          {/* <div className="list-bar" style={{cursor : "pointer"}} key={e?._id} onClick={()=>clickOnOtherListHandler(e?._id,e?.name)}> */}
                          <input
                            id=""
                            name={e?.name}
                            type="checkbox"
                            onChange={(inp) =>
                              handleNewListOnChange(inp, e?._id, e?.name)
                            }
                            checked={e?.posts?.includes(
                              singlePostObj?._id as string
                            )}
                          />
                          <label htmlFor={e?.name}>{e?.name}</label>
                          <span>
                            {e?.visibilty != "public" && (
                              <i className="fa-solid fa-lock"></i>
                            )}
                          </span>
                        </div>
                      ))}

                      <div
                        style={{ marginTop: "1.3rem", marginBottom: ".7rem" }}
                      ></div>
                      <hr style={{ opacity: ".5" }} />
                      <span>Create new list</span>
                    </div>
                  )}
                  {present ? (
                    <div
                      className="text-[1.5rem] ml-8 w-[25px]"
                      onClick={toggleModal}
                    >
                      <img src={savedIcon} loading="lazy" alt="" />
                    </div>
                  ) : (
                    <div
                      className="text-[1.5rem] ml-8 w-[25px]"
                      onClick={toggleModal}
                    >
                      <img src={saveIcon} alt="" />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </div>
        <span>
          <hr className="my-4 border-gray-300" />
        </span>
        <br />
        <p className="text-base sm:text-lg text-gray-800 mb-4">
          {singlePostObj?.details}
        </p>
        <div className="flex justify-center space-x-2 mb-4">
          {singlePostObj?.tags?.map((e) => (
            <button
              className="bg-blue-500 text-white text-xs sm:text-sm md:text-base lg:text-lg rounded-md px-3 py-1"
              key={e.id}
            >
              {e.name}
            </button>
          ))}
        </div>
      </main>
      {modal && <DeleteModal setModal={setModal} />}
    </>
  );
};

export default FullSinglePost;

type DeleteModalType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteModal({ setModal }: DeleteModalType) {
  const [deleteLoading, setDeleteLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const deleteHandler = async () => {
    setDeleteLoading(true);
    try {
      await fetch(`${url}/post/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      navigate(`/me/interview-tracks`);
    } catch (error) {
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-md max-w-md">
      <h2 className="text-xl font-bold mb-4">
        Are you sure you want to delete your interview track?
      </h2>
      <div className="flex justify-center space-x-4">
        <button
          className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
          onClick={() => setModal(false)}
        >
          Cancel
        </button>
        {deleteLoading ? (
          <button
            className="bg-blue-500 text-white font-bold py-2 px-4 rounded flex items-center"
            disabled
          >
            <LoaderIcon className="mr-2 animate-spin" /> Deleting
          </button>
        ) : (
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
            onClick={deleteHandler}
          >
            Delete
          </button>
        )}
      </div>
    </div>
  </div>
  
  );
}
