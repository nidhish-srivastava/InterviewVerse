import { useTrackerContext } from "../context/context"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { FormData, tagType } from "./Create"
const Update = () => {
  const {singlePostObj,loggedInUser} = useTrackerContext()
  const [tags,setTags] = useState<tagType[] | undefined>([])
  const [tag,setTag] = useState(singlePostObj?.tags)
  const {handleSubmit,register} = useForm({
    defaultValues : {
      desc : singlePostObj?.desc,
      details : singlePostObj?.details,
      topic : singlePostObj?.topic,
    }
  })

  const editTagHandler = (e : React.ChangeEvent<HTMLInputElement>,id : string) =>{
    let value = e.target.value
    if(value == "") return
    const editTag = singlePostObj?.tags?.filter(e=>e.id==id) 
    console.log(editTag);
    const updateObj = {
      id : id,
      name : value
    }
    // setTags(e=>[...e,updateObj])
  }

  const submitHandler = async(data : FormData) =>{
    const updateFormData = {
      desc: data.desc,
      tags: tags,
      topic: data.topic,
      details: data.details,
    }
    const response = await fetch(`http://localhost:3000/post/${loggedInUser?.id}`,{
      method : "PATCH",
      body : JSON.stringify(updateFormData),
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + localStorage.getItem("token")
      }
    })
  }
  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <label htmlFor="Topic">Topic</label>
      <input type="text" {...register("topic")} id="Topic"/>
      <label htmlFor="Details">Details</label>
      <textarea  id="Details" cols={30} rows={10} {...register("details")} ></textarea>
      <label htmlFor="desc">Description</label>
      <input type="text" {...register("desc")} id="desc"/>
      <div>
      <label htmlFor="tags">Tags</label>
      {singlePostObj?.tags?.map(e=>(
        <>
        <input type="text" value={e.name} onChange={(event)=>editTagHandler(event,e.id)} />
        <br />
        </>
      ))}
      </div>
      <button>Update</button>
    </form>
  )
}

export default Update