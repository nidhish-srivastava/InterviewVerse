import { FormData } from "../pages/Create";

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
      {show ? <h4>{singlePostObj?.authRef?.username}</h4> : null}
    </main>
  );
};

export default FullSinglePost;
