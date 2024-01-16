import { useTrackerContext } from "../context/context";
import { FormData } from "../pages/Create";
import { dateFormatter, defaultDp, timeToReadPost, url } from "../utils";
import { Link, useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
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
  posts?: string[] | FormData[]
};

const FullSinglePost = ({ singlePostObj, show }: FullSinglePost) => {
  const { id } = useParams();
  const { loggedInUser } = useTrackerContext();
  const { isAuthenticated } = useTrackerContext();
  const [present, setPresent] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [check, setCheck] = useState(false);
  const [customReadingLists, setCustomReadingLists] = useState<customReadingLists[]>([]);

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

  const removeList = async(listId: string | undefined,
    listName: string | undefined)=>{
      try {
        const response = await fetch(`${url}/readingList/removePost`,{
          method : "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ listId, postId, userId }),
        })
        if(response.status==200){
        toast.success(`Interview Track removed from ${listName}`);
        }
      } catch (error) {
        
      }
  }

  const handleNewListOnChange = (e: React.ChangeEvent<HTMLInputElement>, listId: string | undefined,
    listName: string | undefined) => {
    if(e.target.checked){
      addToThisList(listId, listName);
      toggleModal()
    }
    else{
      removeList(listId,listName)
      toggleModal()
    }
  };

  return (
    <>
      <Toaster />
      <main className="my-single-post">
        <h1>{singlePostObj?.topic}</h1>
        <span className="desc">{singlePostObj?.desc}</span>
        <br />
        <div className="dp-wrapper-profile-full-post">
          <div className="dp-wrapper-fullpost">
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
          {singlePostObj?.username != loggedInUser?.username && (
            <div className="save-icon-container" ref={modalRef}>
              {showModal && (
                <div className="modal-save-btn">
                  <div className="list-bar">
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
                  {customReadingLists.map((e) => (
                    <div
                      className="list-bar"
                      style={{ cursor: "pointer" }}
                      key={e?._id}
                    >
                      {/* <div className="list-bar" style={{cursor : "pointer"}} key={e?._id} onClick={()=>clickOnOtherListHandler(e?._id,e?.name)}> */}
                      <input
                        id=""
                        name={e?.name}
                        type="checkbox"
                        onChange={(inp)=>handleNewListOnChange(inp,e?._id,e?.name)}
                        checked={e?.posts?.includes(singlePostObj?._id as string)}
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
                <div className="saved-icon" onClick={toggleModal}>
                  <img src={savedIcon} loading="lazy" alt="" />
                </div>
              ) : (
                <div className="save-icon" onClick={toggleModal}>
                  <img src={saveIcon} alt="" />
                </div>
              )}
            </div>
          )}
        </div>
        <span>
          <hr />
        </span>
        <br />
        <p>{singlePostObj?.details}</p>
        <div style={{ textAlign: "center" }}>
          {singlePostObj?.tags?.map((e) => (
            <button key={e.id}>{e.name}</button>
          ))}
        </div>
        {show ? <h4>{singlePostObj?.username}</h4> : null}
      </main>
    </>
  );
};

export default FullSinglePost;
