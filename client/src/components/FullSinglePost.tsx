import { FormData } from "../pages/Create";
import { dateFormatter, defaultDp, timeToReadPost } from "../utils";
import { Link } from "react-router-dom";

type FullSinglePost = {
  singlePostObj?: FormData;
  show?: boolean;
  loading?:boolean
};

const FullSinglePost = ({ singlePostObj, show,loading }: FullSinglePost) => {
  // const countTime = useMemo(() =>{
  //   const timeToReadOneWord = 0.005
  //   let time =  Math.round((singlePostObj?.details?.trim().split(" ").length as number)*timeToReadOneWord)
  //   if(time==0) return 1
  //   return time
  // },[])

  return (
    <main className="my-single-post">
      <h1>
        {singlePostObj?.topic}
        </h1>
      <span className="desc">{singlePostObj?.desc}</span>
      <br />
      <div className="full-post-detail-bar">
        <div className="dp-wrapper-profile-full-post">
        <div className="dp-wrapper-fullpost">
          <img src={defaultDp} alt="" loading="lazy"/>
        </div>
        <Link to={`/${singlePostObj?.username}`}>
          {
            loading ? <span>...</span>: 
          <span
          >
            {`${singlePostObj?.username}`}
            </span>
        }
        </Link>
        &nbsp; 
        &nbsp; 
        <div style={{fontSize : "15px"}}>
        {/* <span> */}
        {dateFormatter(singlePostObj?.createdAt as Date | number | string)}
        {/* </span> */}
        {/* <span> */}
        &nbsp; 
        &nbsp; 
      {timeToReadPost(singlePostObj?.details)} min read
        {/* </span> */}
        </div>
        </div>
        {/* <div> */}
        {/* </div> */}
      </div>
      <span>
<hr />
      </span>
      <br />
      <p>{singlePostObj?.details}</p>
      <div style={{textAlign : "center"}}>
        {singlePostObj?.tags?.map((e) => (
          <button>{e.name}</button>
        ))}
      </div>
      {show ? <h4>{singlePostObj?.username}</h4> : null}
    </main>
  );
};

export default FullSinglePost;
