import { FormData } from "../pages/Create";
import { dateFormatter } from "../utils";

type FullSinglePost = {
  singlePostObj?: FormData;
  show?: true | false;
};

const FullSinglePost = ({ singlePostObj, show }: FullSinglePost) => {
  return (
    <main className="my-single-post">
      <h3>{singlePostObj?.topic}</h3>
      <p style={{textAlign : "left"}}>{singlePostObj?.desc}</p>
      <br />
      <p>{singlePostObj?.details}</p>
      <div>
        {singlePostObj?.tags?.map((e) => (
          <button>{e.name}</button>
        ))}
      </div>
      <span className="full-post-date">
        {dateFormatter(singlePostObj?.createdAt as Date | number | string)}
      </span>
      {show ? <h4>{singlePostObj?.username}</h4> : null}
    </main>
  );
};

export default FullSinglePost;
