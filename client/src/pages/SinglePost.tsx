import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { FormData } from "./Create";
import { singlePostPromise } from "./MySinglePost";
import FullSinglePost from "../components/FullSinglePost";
import Button from "../components/Button";
import { useTrackerContext } from "../context/context";
import toast, { Toaster } from "react-hot-toast";

const SinglePost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { loggedInUser } = useTrackerContext();
  const [singlePost, setSinglePost] = useState<FormData>();
  const [present, setPresent] = useState(false);


  const removeSavedPost = async () => {
    const response = await fetch(
      `http://localhost:3000/post/savedPosts/${loggedInUser?.id}/${id}`,
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
      await fetch(`http://localhost:3000/post/savedPosts`, {
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
      `http://localhost:3000/post/savedPosts/check/${id}/${loggedInUser?.id}`,
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
      const fetchSinglePost = await singlePostPromise(id);
      console.log(fetchSinglePost);
      setSinglePost(fetchSinglePost);
      const checkIfSaved = await checkIfSavedPromise();
      console.log(checkIfSaved);
      if(checkIfSaved == "true") setPresent(true)
      else setPresent(false)
      await Promise.all([fetchSinglePost,checkIfSaved()])
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
        <Link to={`/${singlePost?.username}`}>
          <Button
            className="visit-profile-btn"
            label={`Visit ${singlePost?.username}'s Profile`}
          />
        </Link>
        <div>
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
        </div>
      </div>
      {<FullSinglePost show={false} singlePostObj={singlePost} />}
    </Fragment>
  );
};

export default SinglePost;
