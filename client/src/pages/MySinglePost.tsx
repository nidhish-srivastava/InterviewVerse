import { useEffect } from "react";
import { useParams } from "react-router-dom";
import FullSinglePost from "../components/FullSinglePost";
import useFetchHook from "../hooks/useFetchHook";
import { url } from "../utils";
import SkeletonLoader from "../components/SkeletonLoader";
import Navbar from "../components/Navbar";

const MySinglePost = () => {
  const { id } = useParams();
  const { data, isLoading } = useFetchHook(`${url}/post/single/${id}`);

  useEffect(() => {
    sessionStorage.setItem("update-form", JSON.stringify(data));
  }, [data]);

  return (
    <>
      <Navbar />
      <SkeletonLoader isLoading={isLoading} />
      {data && (
        <>
          <div className="mt-8">
          <FullSinglePost show={true} singlePostObj={data} />
          </div>
        </>
      )}
    </>
  );
};

export default MySinglePost;
