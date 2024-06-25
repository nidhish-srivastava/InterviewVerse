import {   useState } from "react";
import { useForm } from "react-hook-form";
import { FormData,tagType } from "./DraftWrite";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { url } from "../utils";
import  { LoaderIcon } from "react-hot-toast";

const Update = () => {
  const {id} = useParams()
  const [tagNames, setTagNames] = useState<tagType[]>(
    JSON.parse(sessionStorage.getItem("update-form") || "")?.tags || []
  );
  const navigate = useNavigate();
  const [updateLoader,setUpdateLoader] = useState(false)

  const { handleSubmit, register } = useForm({
    defaultValues: {
      desc: JSON.parse(sessionStorage.getItem("update-form") || "").desc,
      details:  JSON.parse(sessionStorage.getItem("update-form") || "").details,
      title:  JSON.parse(sessionStorage.getItem("update-form") || "").title,
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
      title: data.title,
      details: data.details,
    };
    setUpdateLoader(true)
    try {
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
      if (response.status == 201) {
        sessionStorage.clear()
        navigate(`/me/interview-tracks`);
      }
    } catch (error) {
      
    }
    finally{
      setUpdateLoader(false)
    }
  };
   

  return (
    <>
    <h3 className="text-center text-2xl font-medium">Update your track</h3>
    <form className="p-6 rounded-lg w-4/5 mx-auto" onSubmit={handleSubmit(submitHandler)}>
      <label className="font-bold text-lg" htmlFor="title">Title</label>
      <input type="text"
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
      {...register("title")} id="title" />
      <label className="font-bold text-lg" htmlFor="desc">Description</label>
      <input type="text" {...register("desc")}
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
      
      id="desc" />
      <label className="font-bold text-lg" htmlFor="Details">Details</label>
      <textarea
        id="Details"
        cols={30}
        rows={10}
        {...register("details")}
        className="border border-gray-300 p-2 my-2 rounded-md w-full"
      ></textarea>
        <label htmlFor="tags" className="font-bold text-lg">Tags</label>
      <div className="flex gap-4 mb-4 mt-3">
        {tagNames.map((tagName, index) => (
          <span key={index}>
            <input
            className="bg-blue-500 outline-none text-white px-4 py-2 rounded-md flex items-center"
              type="text"
              value={tagName.name}
              onChange={(event) => editTagHandler(event, tagName.id)} // Step 3: Pass the index as the second argument
            />
          </span>
        ))}
      </div>
      <div className="text-center mt-12">
      {
        updateLoader ? <Button className='loading-btn'><LoaderIcon/> Updating</Button>: 
        <Button btnType="submit">Update</Button>
      }
      </div>
    </form>
    </>
  );
};

export default Update;
