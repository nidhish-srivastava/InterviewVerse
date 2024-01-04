import {  useParams } from "react-router-dom";
import { useState, useEffect, Fragment } from "react";
import { FormData } from "./Create";
import FullSinglePost from "../components/FullSinglePost";
import  { Toaster } from "react-hot-toast";
import { fetchSinglePostPromise } from "../utils";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SinglePost = () => {
  const { id } = useParams();
  const [singlePost, setSinglePost] = useState<FormData | undefined>();
  const [loading,setLoading] = useState(false)

  
  useEffect(() => {
    const singlePostHandler = async () => {
      setLoading(true)
      try {
        const fetchSinglePost = await fetchSinglePostPromise(id);
        setSinglePost(fetchSinglePost as any);
        setLoading(false)
      } catch (error) {
        setLoading(false)
      }
    };
    singlePostHandler();
  }, []);
  

  return (
    <Fragment>
      <Toaster />
      <main style={{ width: "80%", margin: "0 auto" }}>
      {
          loading ? <div className="skeleton-loading">
            <Skeleton count={5}/>
            </div> : 
        <FullSinglePost show={false} singlePostObj={singlePost} />
        }
      </main>
    </Fragment>
  );
};

export default SinglePost;
