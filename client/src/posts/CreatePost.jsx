import React, { useEffect, useState } from "react";
import axios from "axios";
import { useTrackerContext } from "../context";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [desc, setDesc] = useState("");
  const [mistakes, setMistakes] = useState("");
  const [summary, setSummary] = useState("");
  const [username,setUsername] = useState("")
  const [tag,setTag] = useState([])
  const [currentTag,setCurrentTag] = useState("")
  const { baseUrl,topic,setTopic } = useTrackerContext();
  const navigate = useNavigate();

  const submitHandler = async () => {
    setTopic("")
    try {
      await axios.post(`${baseUrl}/create`, {
        summary,
        topic,
        desc,
        mistakes,
        username,
        tag
      });
      // console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const enterKeyHandler = (e) =>{
       if(e.key === "Enter" && currentTag){  // including non empty case as well
         setTag([...tag,currentTag])
         setCurrentTag("")
        }
  }

  console.log(tag);

  const deleteTag = (tagText) =>{
    const filtered = tag.filter(e=>e!=tagText)
    setTag(filtered)
  }


  
  return (
    <React.Fragment>
      <main className="input-container">
        <input type="text"
        placeholder="username" value={username} onChange={(e)=>setUsername(e.target.value)} />
        <input
          type="text"
          placeholder="Topic"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <textarea
          spellCheck="false"
          rows="6"
          cols="69"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <input type="text" placeholder="Enter tags" value={currentTag}  onKeyDown={enterKeyHandler} onChange={e=>setCurrentTag(e.target.value)} />
        <span>
         <label htmlFor="">Tags </label> {tag.map((e,i)=>(<button key={i} className="tag-btn" style={{padding : "1rem",fontSize : "1rem",marginLeft : "1rem"}}>
          <span className="cross" onClick={()=>deleteTag(e)} >
          <i class="fa-solid fa-x"></i>
          </span>
          {e}</button>))}
        </span>
        <textarea
          spellCheck="false"
          rows="6"
          cols="69"
          placeholder="Mistakes"
          value={mistakes}
          onChange={(e) => setMistakes(e.target.value)}
        />
        <input
          placeholder="Solution/Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
        />
        <button className="btn" onClick={submitHandler}>
          Submit
        </button>
      </main>
    </React.Fragment>
  );
};

export default CreatePost;
