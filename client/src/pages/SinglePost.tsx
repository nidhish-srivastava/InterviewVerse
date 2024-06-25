import {  useParams } from "react-router-dom";
import FullSinglePost from "../components/FullSinglePost";
import  { Toaster } from "react-hot-toast";
import {url } from "../utils";
import useFetchHook from "../hooks/useFetchHook";
import SkeletonLoader from "../components/ui/SkeletonLoader";
import Navbar from "../components/Layouts/Navbar";

const SinglePost = () => {
  const { id } = useParams();
  const {data,isLoading,error} = useFetchHook(`${url}/post/single/${id}`)

  return (
    <>
    <Navbar/>
      <Toaster />
    <h4 className="center" style={{marginTop : "2rem"}}>{error}</h4>
    {
      isLoading ? 
      <SkeletonLoader isLoading={isLoading}/>       
      : 
        <FullSinglePost show={false} singlePostObj={data} />
    }
    </>
  );
};

export default SinglePost;
