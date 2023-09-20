import { useParams } from 'react-router-dom';
import {useState,useEffect} from 'react'
import { FormData } from './Create';
import { singlePostPromise } from './MySinglePost';
import { Link } from 'react-router-dom';

const SinglePost = () => {
  const { id } = useParams();
  console.log(id);
  
  const [singlePost,setSinglePost] = useState<FormData>()
  const fetchSingleUserPost = async() =>{
    const data = await singlePostPromise(id)
    console.log(data);
    setSinglePost(data.post)
  }
  useEffect(()=>{
    fetchSingleUserPost()
  },[])
  return (
    <div>
        <br />
        <Link to = {`/${singlePost?.authRef?.username}`}>
      <button>Visit profile</button>
        </Link>
<br />
        Username : {singlePost?.authRef?.username}
        Topic {singlePost?.topic}
      <br />
      {singlePost?.desc}
      <br />
      {singlePost?.details}
      <br />
      {singlePost?.tags?.map((e) => (
        <button>{e.name}</button>
      ))}
    </div>
  )
}

export default SinglePost