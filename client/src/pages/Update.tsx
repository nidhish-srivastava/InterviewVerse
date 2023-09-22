import { useTrackerContext } from "../context/context";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FormData, tagType } from "./Create";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

const Update = () => {
  const { singlePostObj, loggedInUser } = useTrackerContext();
  const [tagNames, setTagNames] = useState<tagType[]>(
    singlePostObj?.tags || []
  );
  const navigate = useNavigate();

  const { handleSubmit, register } = useForm({
    defaultValues: {
      desc: singlePostObj?.desc,
      details: singlePostObj?.details,
      topic: singlePostObj?.topic,
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
      `http://localhost:3000/post/${loggedInUser?.id}`,
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
      alert("Updated Successully");
      navigate(`/my-posts/${loggedInUser?.username}`);
    }
  };

  // useEffect(() => { No need to use useEffect(we already have data in useContext hook)
  //   if (singlePostObj?.tags) {
  //     // const initialTagNames = singlePostObj.tags.map((tag) => tag.name);
  //     // console.log(initialTagNames);
  //     setTagNames(singlePostObj.tags);
  //   }
  // }, [singlePostObj]);

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
