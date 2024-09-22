import { NavLink } from "react-router-dom";

function MyLibraryCategories() {
  return (
    <>
      <h2 className="text-2xl font-semibold mb-8">Your Library</h2>
      <div className="flex items-center gap-8">
        <NavLink to="/me/lists">
          <h4>Your Lists</h4>
        </NavLink>
        <NavLink to="/me/saved-lists">
          <h4>Saved Lists</h4>
        </NavLink>
        <NavLink to="/me/reading-history">
          <h4>Reading History</h4>
        </NavLink>
      </div>
      <div className="mx-auto opacity-20 mt-4">
      </div>
    </>
  );
}

export default MyLibraryCategories;
