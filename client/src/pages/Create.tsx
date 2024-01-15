import { useForm } from "react-hook-form";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import Button from "../components/Button";
import { url } from "../utils";
import toast from "react-hot-toast";

export type tagType = {
  name: string;
  id: string;
};

export type FormData = {
  details?: string;
  desc?: string;
  tags?: tagType[];
  topic?: string;
  authRef?: {
    _id : string
    username : string
  }
  username ?: string
  _id ?: string
  updatedAt?:string
  createdAt?:string
};

const Create = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useTrackerContext();
  const { register, handleSubmit } = useForm();
  const [tags, setTags] = useState<tagType[]>([]);
  const [tag, setTag] = useState("");

  const enterKeyHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const tagObj = {
        name: tag,
        id: nanoid(),
      };
      setTags((e) => [...e, tagObj]);
      setTag("");
    }
  };


  const deleteTag = (id: string) => {
    const deleteTag = tags.filter((e) => e.id !== id);
    setTags(deleteTag);
  };

  const submitHandler = async (data: FormData) => {
    const formData = {
      desc: data.desc,
      tags: tags,
      topic: data.topic,
      details: data.details,
      username: loggedInUser?.username,
    };
    try {
      const response = await fetch(`${url}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if (response.status !== 201) {
        toast("Error")
      }

      if(response.status==201){
        sessionStorage.clear()  //* this feature added cuz if we create a new form,then old data is already present
        toast.success("Interview Track created successfully")
        navigate(`/my-posts/${loggedInUser?.username}`)
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form-container">
      <label htmlFor="topic">Enter Topic</label>
      <input
        id="topic"
        autoFocus={true}
        type="text"
        {...register("topic")}
        placeholder="Enter topic"
        required
      />
      <label htmlFor="desc">Desc</label>
      <input required {...register("desc")} id="desc" type="text" placeholder="Enter description"></input>
      <label htmlFor="tags">Enter Tags</label>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Type topic then press Enter"
        id="tags"
        onKeyDown={enterKeyHandler}
      />
      <div style={{display : "flex",gap : '1rem'}}>
        {tags?.map((e) => (
          <button>
            {e.name}{" "}
            <span onClick={() => deleteTag(e.id)}>
            &nbsp;&nbsp;<b>
            <i className="fa-solid fa-xmark"></i>
            </b>
            </span>
          </button>
        ))}
      </div>
      <label htmlFor="details">Enter Details</label>
      <textarea
        id="details"
        cols={30}
        rows={10}
        required
        {...register("details")}
        placeholder="Enter in detail"
      />
      <Button btnType="submit">Create</Button>
    </form>
  );
};

export default Create;
