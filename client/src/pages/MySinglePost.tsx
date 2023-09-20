import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useTrackerContext } from "../context/context";

export const singlePostPromise = async(id:string | undefined):Promise<any> =>{
  const response = await fetch(`http://localhost:3000/post/single/${id}`);
  if (response.status == 200) {
    return await response.json();
  }
}

const MySinglePost = () => {
  const { id } = useParams();
  const { singlePostObj, setSinglePostObj } = useTrackerContext();
  const [modal, setModal] = useState(false);

  //* We can memoize this function using useCallback
  const fetchSinglePost = async () => {
    const data = await singlePostPromise(id)
      setSinglePostObj(data.post);
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  return (
    <div>
      {singlePostObj?.topic}
      <br />
      {singlePostObj?.desc}
      <br />
      {singlePostObj?.details}
      <br />
      {singlePostObj?.tags?.map((e) => (
        <button>{e.name}</button>
      ))}
      <br />
      <Link to="update">
        <button>Update</button>
      </Link>
      <button onClick={() => setModal(true)}>Delete</button>
      {modal ? <DeleteModal setModal={setModal} /> : null}
    </div>
  );
};

export default MySinglePost;

type DeleteModalType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};

function DeleteModal({ setModal }: DeleteModalType) {
  const { loggedInUser } = useTrackerContext();
  const { id } = useParams();
  const deleteHandler = async () => {
    await fetch(`http://localhost:3000/post/${id}`, {
      method: "DELETE",
      headers : {
        Authorization : "Bearer " + localStorage.getItem("token")
      }
    });
    window.location.href = `/${loggedInUser?.username}`;
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
