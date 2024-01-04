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

const FullSinglePost = ({ singlePostObj, show }: FullSinglePost) => {
  const { id } = useParams();
  const { loggedInUser } = useTrackerContext();
  const { isAuthenticated } = useTrackerContext();
  const [present, setPresent] = useState(false);
  const [showModal,setShowModal] = useState(false)
  const modalRef = useRef<HTMLDivElement | null>(null);
  const [check,setCheck] = useState(false)

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
      setPresent(false)
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
      setCheck(true)
      openModal()
      await fetch(`${url}/post/savedPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      toast.success("Saved Successfully");
      setPresent(true)
    } else toast.error("Please Login to save");
  };

  const checkIfSavedPromise = async (): Promise<any> => {
    const response = await fetch(
      `${url}/post/savedPosts/check/${id}/${loggedInUser?.id}`,
      {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    return response.text();
  };

  useEffect(() => {
    const checkHandler = async () => {
      const check = await checkIfSavedPromise();
      if (check == "true") setPresent(true);
      else setPresent(false);
    };
    if (isAuthenticated) {
      checkHandler();
    }
  }, []);

  const openModal = ()=>{
    setShowModal(e=>!e)
  }

  useEffect(() => {
    const handleOutsideClick = (event : MouseEvent) => {
      // Check if the clicked element is outside the modal
      if (modalRef.current && !modalRef?.current?.contains(event.target as Node)) {
        // Close the modal
        setShowModal(false);
      }
    };

    // Attach the event listener to the document body
    document.body.addEventListener('click', handleOutsideClick);

    // Cleanup the event listener when the component is unmounted
    return () => {
      document.body.removeEventListener('click', handleOutsideClick);
    };
  }, [])

  return (
    <>
      <Toaster />
      <main className="my-single-post">
        <h1>{singlePostObj?.topic}</h1>
        <span className="desc">{singlePostObj?.desc}</span>
        <br />
        <div className="full-post-detail-bar">
          <div className="dp-wrapper-profile-full-post">
            <div className="dp-wrapper-fullpost">
              <img src={defaultDp} alt="" loading="lazy" />
            </div>
            <Link to={`/${singlePostObj?.username}`}>
              <span>{`${singlePostObj?.username}`}</span>
            </Link>
            &nbsp; &nbsp;
            <div style={{ fontSize: "15px" }}>
              {dateFormatter(
                singlePostObj?.createdAt as Date | number | string
              )}
              &nbsp; &nbsp;
              {timeToReadPost(singlePostObj?.details)} min read
            </div>
            {
              singlePostObj?.username != loggedInUser?.username &&
            <div className="save-icon-container" ref={modalRef}>
              {showModal && <div className="modal-save-btn">
                <div className="list-bar">
                  <input type="checkbox" checked={check}/>
                <h4>Reading List</h4>
                <span>
                <i className="fa-solid fa-lock"></i>
                </span>
                </div>

              </div> }
              {present ? (
                <div className="saved-icon" onClick={removeSavedPost}>
                  <img src={savedIcon} loading="lazy" alt="" />
                </div>
              ) : (
                <div className="save-icon" onClick={savePostHandler}>
                  <img src={saveIcon} alt="" />
                </div>
              )}
            </div>
            }

          </div>
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
