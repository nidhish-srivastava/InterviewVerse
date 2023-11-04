import { useTrackerContext } from "../context/context";
import {  useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, tagType } from "./Create";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { url } from "../utils";

const Update = () => {
  const {id} = useParams()
  const {  loggedInUser} = useTrackerContext();
  const [tagNames, setTagNames] = useState<tagType[]>(
    JSON.parse(sessionStorage.getItem("update-form") || "")?.tags || []
  );
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      desc: JSON.parse(sessionStorage.getItem("update-form") || "").desc,
      details:  JSON.parse(sessionStorage.getItem("update-form") || "").details,
      topic:  JSON.parse(sessionStorage.getItem("update-form") || "").topic,
    },
  });


  const editTagHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    tagId: string
  ) => {
    const newValue = e.target.value;
    // Create a copy of the tagNames array and update the specific tag name
    const newTagNames = tagNames.map((e) => {
      if (e.id === tagId) return { ...e, name: newValue };
      return e;
    });
    setTagNames(newTagNames);
  };

  const submitHandler = async (data: FormData) => {
    const updateFormData = {
      desc: data.desc,
      tags: tagNames,
      topic: data.topic,
      details: data.details,
    };
    const response = await fetch(
      `${url}/post/${id}`,
      {
        method: "PATCH",
        body: JSON.stringify(updateFormData),
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      }
    );
    if (response.status == 200) {
      sessionStorage.clear()
      alert("Updated Successully");
      navigate(`/my-posts/${loggedInUser?.username}`);
    }
  };

  
  


  return (
    <form className="form-container" onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="Topic">Topic</label>
      <input type="text" {...register("topic")} id="topic" />
      <label htmlFor="desc">Description</label>
      <input type="text" {...register("desc")} id="desc" />
      <label htmlFor="Details">Details</label>
      <textarea
        id="Details"
        cols={30}
        rows={10}
        {...register("details")}
      ></textarea>
      <div>
        <label htmlFor="tags">Tags</label>
        <br />
        {tagNames.map((tagName, index) => (
          <span key={index}>
            <input
            style={{width : "fit-content"}}
              type="text"
              value={tagName.name}
              onChange={(event) => editTagHandler(event, tagName.id)} // Step 3: Pass the index as the second argument
            />
          </span>
        ))}
      </div>
      <Button btnType="submit" label="Update"/>
    </form>
  );
};

export default Update;
