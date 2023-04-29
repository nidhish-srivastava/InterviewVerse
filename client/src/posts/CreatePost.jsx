import React, {  useState } from 'react'
import axios from 'axios'


const CreatePost = () => {
  const [topic,setTopic] = useState("")
  const [desc,setDesc] = useState("")
  const [mistakes,setMistakes] = useState("")
  const [summary,setSummary] = useState("")


  const submitHandler = async () =>{
    try {
      const response = await axios.post(`http://localhost:4000/create`,{
        summary,topic,desc,mistakes
      })
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  
  return (
    <React.Fragment>  
      <main className="input-container">
      <input type="text" placeholder='Topic' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
      <textarea spellCheck="false"  rows="6" cols="69" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}  />
      <textarea spellCheck="false"  rows="6" cols="69"  placeholder='Mistakes' value={mistakes} onChange={(e)=>setMistakes(e.target.value)}  /> 
      <input placeholder='Solution/Summary' spellCheck="false"  rows="6" cols="69" value={summary} onChange={(e)=>setSummary(e.target.value)}  />
      <button onClick={submitHandler}>Submit</button>
      </main> 
    </React.Fragment>
  )
}

export default CreatePost