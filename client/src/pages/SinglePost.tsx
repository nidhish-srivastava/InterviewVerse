import { Link, useParams } from 'react-router-dom';
import {useState,useEffect,Fragment} from 'react'
import { FormData } from './Create';
import { singlePostPromise } from './MySinglePost';
import FullSinglePost from '../components/FullSinglePost';
import Button from '../components/Button';

const SinglePost = () => {
  const { id } = useParams();
  
  const [singlePost,setSinglePost] = useState<FormData>()
  const fetchSingleUserPost = async() =>{
    const data = await singlePostPromise(id)
    setSinglePost(data)
  }


  useEffect(()=>{
    fetchSingleUserPost()
  },[])
  return (
    <Fragment>
      <Link to={`/${singlePost?.authRef?.username}`}>
      <Button className='visit-profile-btn' label={`Visit ${singlePost?.authRef?.username}'s Profile`}/>
      </Link>
      {<FullSinglePost show = {false} singlePostObj={singlePost} />}
    </Fragment>
  )
}

export default SinglePost