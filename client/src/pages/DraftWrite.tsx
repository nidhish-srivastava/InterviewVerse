import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { updateRequest, url } from "../utils";
import toast, { LoaderIcon } from "react-hot-toast";
import { useParams } from "react-router-dom";

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
    _id: string;
    username: string;
  };
  username?: string;
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
};

const DraftWrite = () => {
  const { id } = useParams();
  const [publishLoader, setPublishLoader] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {},
  });
  const watchAllFields = watch();

  useEffect(() => {
    const fetchDraftData = async () => {
      try {
        const response = await fetch(`${url}/post/single/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const result = await response.json();
        setValue("desc", result?.desc);
        setValue("details", result?.details);
        setValue("topic", result?.topic);
        setTags(result?.tags);
      } catch (error) {}
    };
    fetchDraftData();
  }, []);

  const [tags, setTags] = useState<tagType[]>([]);
  const [tag, setTag] = useState("");
  const [canPublish, setCanPublish] = useState(false);

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

  useEffect(() => {
    let check = false; // checks wether user has given any input or not
    for (let a in watchAllFields) {
      if (watchAllFields[a]?.length > 0) {
        check = true;
        setCanPublish(true);
        sessionStorage.setItem(
          "hasStarted",
          JSON.stringify({ hasStarted: true })
        );
      }
    }
    if (check == false) {
      setCanPublish(false);
    }

    //* Created a function which is triggered after 4 seconds of the user stops writing,Once request is send,then we are just editing
    const debounceTimer = setTimeout(async () => {
      //* Creating a debounce effect to save the user data once he stops writing
      // here i will submit the post,save it in db as draft,after that,dont create a new post rather update the existing post
      try {
        // console.log("we need to now update the stuff");
        const response = await updateRequest(`${url}/post/${id}`, {
          ...watchAllFields,
          tags: tags,
        });
        if (response.status == 201) {
        }
      } catch (error) {}
    }, 2000);
    return () => clearInterval(debounceTimer);
  }, [watchAllFields]);

  const publishPostHandler = async () => {
    setPublishLoader(true);
    try {
      const response = await updateRequest(`${url}/post/publish/${id}`, {
        published: true,
      });
      if (response.status !== 201) {
        toast("Error while creating post");
      }
      if (response.status == 201) {
        sessionStorage.clear(); //* this feature added cuz if we create a new form,then old data is already present
        window.location.pathname = "/me/interview-tracks";
      }
    } catch (error) {
      setPublishLoader(false);
    } finally {
    }
  };

  return (
    <>
      <div className="text-left m-4">
        {sessionStorage.getItem("hasStarted") ? "Saved as Draft" : ""}
      </div>
      <form
        onSubmit={handleSubmit(publishPostHandler)}
        className="p-6 rounded-lg w-4/5 mx-auto "
      >
        <label className="font-bold text-lg" htmlFor="topic">
          Topic
        </label>
        <input
          id="topic"
          type="text"
          {...register("topic")}
          placeholder="Enter the topics asked"
          required
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
        />
        <label className="font-bold text-lg" htmlFor="desc">
          Description
        </label>
        <input
          id="desc"
          type="text"
          {...register("desc")}
          placeholder="Give a brief description"
          required
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
        />
        <label className="font-bold text-lg" htmlFor="tags">
          Tags
        </label>
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          placeholder="Type tag name then press Enter"
          id="tags"
          onKeyDown={enterKeyHandler}
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
        />
        <div className="flex gap-4 mb-4">
          {tags?.map((e) => (
            <button
              key={e.id}
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
              onClick={() => deleteTag(e.id)}
            >
              {e.name}
              <span className="ml-2">
                <i className="fas fa-times"></i>
              </span>
            </button>
          ))}
        </div>
        <label className="font-bold text-lg" htmlFor="details">
          Enter Details
        </label>
        <textarea
          id="details"
          cols={30}
          rows={10}
          required
          {...register("details")}
          placeholder="Explain in detail"
          className="border border-gray-300 p-2 my-2 rounded-md w-full"
        />
        <div className="flex gap-2 justify-center absolute top-2 right-2">
          {canPublish ? (
            publishLoader ? (
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2">
                <LoaderIcon /> Publishing
              </button>
            ) : (
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Publish
              </button>
            )
          ) : null}
        </div>
      </form>
    </>
  );
};

export default DraftWrite;
