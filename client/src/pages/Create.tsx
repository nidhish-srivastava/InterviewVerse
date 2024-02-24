import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { useTrackerContext } from "../context/context";
import Button from "../components/Button";
import { updateRequest, url } from "../utils";
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
  const { loggedInUser } = useTrackerContext();
  const { register, handleSubmit,watch } = useForm();
  const watchAllFields = watch()
  console.log(watchAllFields);
  
  const [tags, setTags] = useState<tagType[]>([]);
  const [tag, setTag] = useState("");
  const [canPublish,setCanPublish] = useState(false)
  // const [isSavedLoader,setIsSavedLoader] = useState(false)

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

  //* Created a function which is triggered after 4 seconds of the user stops writing,Once request is send,then we are just editing 
  const createPost = async() =>{
    try {
      const response = await fetch(`${url}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({...watchAllFields,tags : tags,username : loggedInUser?.username,published : false}),
      });
      if(response.status==201){
        const data = await response.json()
        sessionStorage.setItem("postId",JSON.stringify(data))
      }
    } catch (error) {
      
    }
    finally{
    }
  }


  useEffect(()=>{
    let check = false  // checks wether user has given any input or not
    for(let a in watchAllFields){
      if(watchAllFields[a].length>0){
        check = true
        setCanPublish(true)
        sessionStorage.setItem("hasStarted",JSON.stringify({hasStarted : true}))
      }
    }
    if(check==false){
      setCanPublish(false)
    }
    
      const debounceTimer = setTimeout(async()=>{  //* Creating a debounce effect to save the user data once he stops writing
        // here i will submit the post,save it in db as draft,after that,dont create a new post rather update the existing post
        const postId = JSON.parse(sessionStorage.getItem("postId"))?.postId
        if(postId?.length>1){
          // console.log("we need to now update the stuff");
           const response = await updateRequest(`${url}/post/${postId}`,{...watchAllFields,tags : tags})
           if(response.status==201){

           }
           
        }
        else{
          if(JSON.parse(sessionStorage.getItem("hasStarted"))){
            // console.log("create post");
            createPost()  
          }
        }
      },2000)
      return ()=>clearInterval(debounceTimer)
  },[watchAllFields])

  const submitHandler = async () => {
    try {
      const postId = JSON.parse(sessionStorage.getItem("postId"))?.postId
      if(postId?.length>1){
        // console.log("publish block");
        
        const response = await updateRequest(`${url}/post/publish/${postId}`,{published : true})
        if (response.status !== 201) {
          toast("Error while creating post")
        }
        if(response.status==201){
          // console.log("published");
          sessionStorage.clear()  //* this feature added cuz if we create a new form,then old data is already present
          
          window.location.pathname = "/"
        }
      }
      
    } catch (error) {}
  }


  return (
    <>
    {/* {
      JSON.parse(sessionStorage.getItem("hasStarted")) ?
       <>
      {isSavedLoader ? "Saving" : "Saved"}
      </> : ""
    } */}
    <form onSubmit={handleSubmit(submitHandler)} className="form-container">
      {/* <label htmlFor="position">Position</label>
      <input type="text" id="position" placeholder="For which position you interviewed??"/>
      <label htmlFor="company-name">Company name</label>
      <input type="text" id="company-name" autoFocus={true} placeholder="Enter company name" required/>
       */}
      <label htmlFor="topic">Topic</label>
      <input
        id="topic"
        type="text"
        {...register("topic")}
        placeholder="Enter the topics asked"
        required
      />
      <label htmlFor="desc">Description</label>
      <input required {...register("desc")} id="desc" type="text" placeholder="Give a brief description"></input>
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Type tag name then press Enter"
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
        placeholder="Explain in detail"
      />
      <div className="center">
        {canPublish ? 
          <Button btnType="submit">Publish</Button>
          :
          <Button style={{"opacity" : "0.5"}}>Publish</Button>
      }
      </div>
    </form>
    </>
  );
};

export default Create;
