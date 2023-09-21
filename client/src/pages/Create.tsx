import { useForm } from "react-hook-form";
import { useState } from "react";
import { nanoid } from "nanoid";
import { useNavigate } from "react-router-dom";
import { useTrackerContext } from "../context/context";
import Button from "../components/Button";

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
  _id ?: string
};

const Create = () => {
  const navigate = useNavigate();
  const { loggedInUser } = useTrackerContext();
  // const [globalTags, setGlobalTags] = useState<tagType[]>([]);
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
      // console.log(tagObj);
      setTags((e) => [...e, tagObj]);
      setTag("");
    }
  };

  // console.log("render");

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
      authRef: loggedInUser?.id,
    };
    try {
      const response = await fetch(`http://localhost:3000/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify(formData),
      });

      if(response.status==201){
        navigate(`/${loggedInUser?.username}`)
      }
      if (response.status !== 201) {
        alert("You havent logged in");
        navigate("/login");
      }
    } catch (error) {}
  };
  return (
    <form onSubmit={handleSubmit(submitHandler)} className="form-container">
      <label htmlFor="topic">Enter Topic</label>
      <input
        id="topic"
        type="text"
        {...register("topic")}
        placeholder="Enter topic"
      />
      <label htmlFor="desc">Desc</label>
      <input {...register("desc")} id="desc" type="text" placeholder="Enter description"></input>
      <label htmlFor="tags">Enter Tags</label>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Enter tags"
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
        {...register("details")}
        placeholder="Enter in detail"
      />
      <Button label="Create"/>
    </form>
  );
};

export default Create;
