import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { updateRequest, url } from "../utils";
import toast, { LoaderIcon, Toaster } from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import Button from "../components/ui/Button";
import { IoArrowBack } from "react-icons/io5";
import Lottie from "lottie-react";
import uploadanimation from "../assets/uploadinganimation.json"

export type tagType = {
  name: string;
  id: string;
};

export type FormData = {
  details?: string;
  desc?: string;
  tags?: tagType[];
  title?: string;
  authRef?: {
    _id: string;
    username: string;
  };
  username?: string;
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  image ?: string
};

const DraftWrite = () => {
  const { id } = useParams();
  const [publishLoader, setPublishLoader] = useState(false);
  const { register, handleSubmit, watch, setValue } = useForm<FormData>({
    defaultValues: {},
  });
  const watchAllFields = watch();
  const [image, setImage] = useState("");

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
        setValue("title", result?.title);
        setImage(result?.image);
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
    let check = 0; // checks wether user has given any input or not
    for (let a in watchAllFields) {
      if (watchAllFields[a]?.length > 0) {
        check++;
      }
    }
    if (image != "") check++;
    if (tags.length > 0) check++;
    if (check == 5) {
      sessionStorage.setItem(
        "hasStarted",
        JSON.stringify({ hasStarted: true })
      );
      setCanPublish(true);
    } else {
      sessionStorage.setItem(
        "hasStarted",
        JSON.stringify({ hasStarted: false })
      );
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
          image: image,
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
      const response = await updateRequest(`${url}/post/publish/${id}`, {});
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
      <Link to={`/drafts`}>
        <Button className="absolute top-4 left-2">
          <IoArrowBack />
        </Button>
      </Link>
      <div className="fixed text-sm font-medium right-1 bottom-2">
        {sessionStorage.getItem("hasStarted") ? "Saved as Draft" : ""}
      </div>
      <form
        onSubmit={handleSubmit(publishPostHandler)}
        className="p-6 rounded-lg w-4/5 mx-auto "
      >
        <ImageUpload image={image} setImage={setImage} />
        <label className="font-bold text-lg" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          placeholder="Give a Title"
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
          {publishLoader ? (
            <button
              disabled={true}
              className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <LoaderIcon /> Publishing
            </button>
          ) : (
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md ${
                !canPublish && "bg-opacity-70 bg-blue-500 cursor-not-allowed"
              }`}
            >
              Publish
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default DraftWrite;

const ImageUpload = ({ image, setImage }: any) => {
  const [imageUploadLoader,setImageUploadLoader] = useState(false)
  const uploadImageToBucket = async (image: string) => {
    try {
      const response = await fetch(`${url}/post/s3-url`);
      if (!response.ok) {
        return toast.error("Error uploading , Try again later ");
      }
      const { s3url } = await response.json();
      // Now using this url we will save the image in the s3 bucket
      try {
        const response2 = await fetch(s3url, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: image,
        });
        if (!response2.ok) {
          setImageUploadLoader(false)
          return toast.error("Error uploading , Try again later ");
        }
          const imageUrl = s3url.split("?")[0];
          setImage(imageUrl)
      } catch (error) {
        setImageUploadLoader(false)
        toast.error("Error uploading")
      }
    } catch (error) {
      setImageUploadLoader(false)
      toast.error("Error uploading")
    }
  };

  // Function to handle file upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageUploadLoader(true)
    setTimeout(async()=>{
      await uploadImageToBucket(file);
    },2000)
  };

  return (
    <div className="w-full mx-auto  bg-white rounded-md">
      <Toaster />
      <label className="font-bold text-lg">Upload a Cover Photo</label>
      <div className="mt-1 flex justify-center items-center">
        {image ? (
          <img
            // src={URL.createObjectURL(image)}
            src={image}
            alt="Uploaded Cover"
            className="h-48 w-auto object-cover rounded-md"
          />
        ) : (
          <div className="h-48 w-full border-2 border-gray-300 border-dashed rounded-md flex justify-center items-center">
            {
              imageUploadLoader ?
              <div className="w-32">
                <Lottie animationData={uploadanimation}/>
              </div> : 
            <span className="text-gray-500">Upload your image here</span>
            }
          </div>
        )}
      </div>
      <div className="mt-3">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="imageUpload"
        />
        <div className="flex">
          <label
            htmlFor="imageUpload"
            className="mx-auto inline-block cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300 ease-in-out"
          >
            Choose a Photo
          </label>
        </div>
      </div>
    </div>
  );
};
