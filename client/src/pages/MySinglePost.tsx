import { useEffect, useState, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import FullSinglePost from "../components/FullSinglePost";
import Button from "../components/Button";
import useFetchHook from "../utils/hooks/useFetchHook";
import { url } from "../utils";
import SkeletonLoader from "../components/SkeletonLoader";

const MySinglePost = () => {
  const { id } = useParams();
  const [modal, setModal] = useState(false);
  const {data,isLoading} = useFetchHook(`${url}/post/single/${id}`)

  useEffect(() => {
    sessionStorage.setItem("update-form",JSON.stringify(data))
  }, [data]);

  return (
    <Fragment>
      <SkeletonLoader isLoading={isLoading}/>
    {data && <>
    <div className="edit-div">
      <Link to="update">
        <Button className="update-btn">Update</Button>
      </Link>
      {/* <button onClick={() => setModal(true)}>Delete</button> */}
      <Button className="delete-btn" onClick={() => setModal(true)}>Delete</Button>
    </div>
      <FullSinglePost show = {false} singlePostObj = {data} />
    </>
    }
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
  const navigate = useNavigate()
  const { id } = useParams();
  const deleteHandler = async () => {
    await fetch(`${url}/post/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    });
    navigate(`/me/interview-tracks`)
  };
  return (
    <div className="deleteModal">
      <div className="modalContent">
      <h2>
        This is a desctructive action,R u sure u wanna delete your interview
        track
      </h2>
      <Button  onClick={() => setModal(false)}>Cancel</Button>
      <Button  onClick={deleteHandler}>Delete</Button>
      </div>
    </div>
  );
}
