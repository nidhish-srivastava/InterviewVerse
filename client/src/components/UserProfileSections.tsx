import { NavLink } from "react-router-dom";

type props = {
    username : string
}

function UserProfileSections({username} : props) {
  return (
      <div className="my-lists-bar">
        <NavLink
        end
          to={`/${username}`}
        >
          <h4>Interview Experiences</h4>
        </NavLink>
        <NavLink end to={`/${username}/reading-lists`}>
          <h4>Reading Lists</h4>
        </NavLink>
      </div>
  );
}

export default UserProfileSections;
