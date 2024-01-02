import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { FormData } from "./Create";
import { singlePostPromise } from "./MySinglePost";
import FullSinglePost from "../components/FullSinglePost";
import Button from "../components/Button";
import { useTrackerContext } from "../context/context";
import toast, { Toaster } from "react-hot-toast";
import { url } from "../utils";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'


const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loggedInUser } = useTrackerContext();
  const [singlePost, setSinglePost] = useState<FormData>();
  const [present, setPresent] = useState(false);
  const [loading,setLoading] = useState(false)


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
      setTimeout(() => {
        navigate(`/saved-posts/${loggedInUser?.username}`);
      }, 1000);
    }
  };

  const savePostHandler = async () => {
    const formData = {
      postId: id,
      userId: loggedInUser?.id,
    };
    if (loggedInUser?.username.length ?? 0 > 1) {
      await fetch(`${url}/post/savedPosts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });
      toast.success("Saved Successfully");
    } else toast.error("Please login/signup to save");
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
    const singlePostHandler = async () => {
      setLoading(true)
      try {
        const fetchSinglePost = await singlePostPromise(id);
        setSinglePost(fetchSinglePost);
        const checkIfSaved = await checkIfSavedPromise();
        if(checkIfSaved == "true") setPresent(true)
        else setPresent(false)
        await Promise.resolve([fetchSinglePost,checkIfSaved()])
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };
    singlePostHandler()
  }, []);
  return (
    <Fragment>
      <div>
        <Toaster />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "0 1rem",
        }}
      >

       
        <div>
          {
            (loading && (loggedInUser?.username.length ?? 0 > 1)) ?   <Button
            className="visit-profile-btn"
            label={`Loading`}
          /> : <>
            {loggedInUser?.username !== singlePost?.username &&
              (present ? (
                <Button
                onClick={removeSavedPost}
                style={{ padding: ".6rem", margin: "1rem" }}
                label="Remove from Saved"
                />
                ) : (
              <Button
                onClick={savePostHandler}
                style={{ padding: ".6rem", margin: "1rem" }}
                label="Save this post"
                />
                ))}
                </>
              }
        </div>
      </div>
      <div style={{width : "80%",margin : "0 auto"}}>
        {
          loading ? <div className="skeleton-loading">
            <Skeleton count={5}/>
            </div> : 
      <FullSinglePost loading={loading} show={false} singlePostObj={singlePost} />
      }
        </div>
    </Fragment>
  );
};

export default SinglePost;
