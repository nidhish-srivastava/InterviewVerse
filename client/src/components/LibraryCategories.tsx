import { NavLink } from "react-router-dom";

function LibraryCategories() {
  return (
    <>
      <h2 className="library-heading">Your Library</h2>
      <div className="my-lists-bar">
        <NavLink
          to="/lists"
        >
          <h4>Your Lists</h4>
        </NavLink>
        <NavLink to={`/saved-lists`}>
          <h4>Saved Lists</h4>
        </NavLink>
        <NavLink to={`/reading-history`}>
          <h4>Reading History</h4>
        </NavLink>
      </div>
      <div style={{ margin: "0 auto", opacity: "0.2", marginTop: "1rem" }}>
        <hr />
      </div>
    </>
  );
}

export default LibraryCategories;
