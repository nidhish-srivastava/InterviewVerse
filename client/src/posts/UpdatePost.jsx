import React,{useState} from 'react'
import axios from 'axios'

const UpdatePost = () => {
  // I will pass the default values by fetching the data from backend of the post,then populating it
    const [topic,setTopic] = useState("")
  const [desc,setDesc] = useState("")
  const [mistakes,setMistakes] = useState("")
  const [summary,setSummary] = useState("")

  const updatePost = async(_id)=>{
    await axios.put(`http://localhost:4000/${_id}`,{
      topic : topic,
      desc : desc,
      mistakes : mistakes,
      summary : summary
    })
    console.log("Post updated");
  }
  return (
    <main className="input-container">
    <input type="text" placeholder='Topic' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
    <textarea spellCheck="false"  rows="6" cols="69" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}  />
    <textarea spellCheck="false"  rows="6" cols="69"  placeholder='Mistakes' value={mistakes} onChange={(e)=>setMistakes(e.target.value)}  /> 
    <input placeholder='Solution/Summary' spellCheck="false"  rows="6" cols="69" value={summary} onChange={(e)=>setSummary(e.target.value)}  />
    <button onClick={updatePost()}>Update</button>
    </main> 
  )
}

export default UpdatePost