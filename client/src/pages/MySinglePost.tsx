import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import FullSinglePost from "../components/FullSinglePost";
import Button from "../components/Button";

export const singlePostPromise = async (
  id: string | undefined
): Promise<any> => {
  const response = await fetch(`http://localhost:3000/post/single/${id}`);
  if (response.status == 200) {
    return await response.json();
  }
};

const MySinglePost = () => {
  const { id } = useParams();
  const { singlePostObj, setSinglePostObj } = useTrackerContext();
  const [modal, setModal] = useState(false);

  //* We can memoize this function using useCallback
  const fetchSinglePost = async () => {
    const data = await singlePostPromise(id);
    setSinglePostObj(data.post);
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <Fragment>
    {singlePostObj && <FullSinglePost show = {false} singlePostObj = {singlePostObj} />}
    <div className="edit-div">
      <Link to="update">
        <Button label="Update" className="update-btn" />
      </Link>
      {/* <button onClick={() => setModal(true)}>Delete</button> */}
      <Button className="delete-btn" label="Delete" onClick={() => setModal(true)}/>
    </div>
        {/* Delete</Button> */}
      {modal ? <DeleteModal setModal={setModal} /> : null}
    </Fragment>
  );
};

export default MySinglePost;

type DeleteModalType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteModal({ setModal }: DeleteModalType) {
  const { loggedInUser } = useTrackerContext();
  const navigate = useNavigate()
  const { id } = useParams();
  const deleteHandler = async () => {
    await fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    // window.location.href = `/my-posts/${loggedInUser?.username}`; //* Causing a reload will not load the myposts
    navigate(`/my-posts/${loggedInUser?.username}`)
  };
  return (
    <div>
      <h2>
        This is a desctructive action,R u sure u wanna delete your interview
        track
      </h2>
      <button onClick={() => setModal(false)}>Cancel</button>
      <button onClick={deleteHandler}>Delete</button>
    </div>
  );
}
