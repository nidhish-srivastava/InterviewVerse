import { Link, useParams } from 'react-router-dom';
import {useState,useEffect,Fragment} from 'react'
import { FormData } from './Create';
import { singlePostPromise } from './MySinglePost';
import FullSinglePost from '../components/FullSinglePost';
import Button from '../components/Button';
import { useTrackerContext } from '../context/context';

const SinglePost = () => {
  const { id } = useParams();
  const {loggedInUser} = useTrackerContext()
  const [singlePost,setSinglePost] = useState<FormData>()
  const fetchSingleUserPost = async() =>{
    const data = await singlePostPromise(id)
    setSinglePost(data)
  }

  const savePostHandler = async() =>{
    const formData = {
      postId : id,
      userId : loggedInUser?.id
    }
    const response = await fetch(`http://localhost:3000/post/savedPosts`,{
      method : "POST",
      headers : {
        "Content-Type" : "application/json",
        Authorization : "Bearer " + localStorage.getItem("token")
      },
      body : JSON.stringify(formData)
    })
    console.log(response);
  }


  useEffect(()=>{
    fetchSingleUserPost()
  },[])
  return (
    <Fragment>
      <div style={{display : "flex",justifyContent : "space-between",padding : "0 1rem"}}>
      <Link to={`/${singlePost?.username}`}>
      <Button className='visit-profile-btn' label={`Visit ${singlePost?.username}'s Profile`}/>
      </Link>
        <Button
        onClick={savePostHandler}
        style={{padding : ".6rem",margin : "1rem"}}
        label='Save this post'
        />
        </div>
      {<FullSinglePost show = {false} singlePostObj={singlePost} />}
    </Fragment>
  )
}

export default SinglePost