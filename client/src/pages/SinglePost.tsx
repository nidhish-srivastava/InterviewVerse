import { Link, useParams } from 'react-router-dom';
import {useState,useEffect,Fragment} from 'react'
import { FormData } from './Create';
import { singlePostPromise } from './MySinglePost';
import FullSinglePost from '../components/FullSinglePost';

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
    <Fragment>
      <Link to={`/${singlePost?.authRef?.username}`}>
      <button>Visit profile</button>
      </Link>
      {<FullSinglePost show = {false} singlePostObj={singlePost} />}
    </Fragment>
  )
}

export default SinglePost