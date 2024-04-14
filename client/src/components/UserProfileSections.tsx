import { NavLink } from "react-router-dom";

type props = {
    username : string
}

function UserProfileSections({username} : props) {
  return (
      <div className="flex items-center gap-8">
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
