import React,{useState} from 'react'
import axios from 'axios'
import { useTrackerContext } from '../context'

const UpdatePost = () => {
  // I will pass the default values by fetching the data from backend of the post,then populating it
  const {t,d,m,s} = useTrackerContext()
  const [topic,setTopic] = useState(t)
  const [desc,setDesc] = useState(d)
  const [mistakes,setMistakes] = useState(m)
  const [summary,setSummary] = useState(s)
  const {idContext} = useTrackerContext()

  let updatePost = async(_id)=>{
    // try {
    //   const response = await axios.put(`http://localhost:4000/${_id}`,{
    //     topic : topic,
    //     desc : desc,
    //     mistakes : mistakes,
    //     summary : summary
    //   })
    //   console.log("Post updated",response);
      
    // } catch (error) {
    //   console.log(error);
    // }
    // finally{
    //   setState(e=>!e)
    // }
  }

   
 

  return (
    <main className="input-container">
    <input type="text" placeholder='Topic' value={topic} onChange={(e)=>setTopic(e.target.value)}/>
    <textarea spellCheck="false"  rows="6" cols="69" placeholder='Description' value={desc} onChange={(e)=>setDesc(e.target.value)}  />
    <textarea spellCheck="false"  rows="6" cols="69"  placeholder='Mistakes' value={mistakes} onChange={(e)=>setMistakes(e.target.value)}  /> 
    <input placeholder='Solution/Summary' spellCheck="false"  rows="6" cols="69" value={summary} onChange={(e)=>setSummary(e.target.value)}  />
    <button onClick={()=>updatePost(idContext)}>Update</button>
    </main> 
  )
}

export default UpdatePost