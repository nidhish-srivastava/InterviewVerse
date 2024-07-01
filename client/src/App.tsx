import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import MyInterviewTracks from "./pages/MyInterviewTracks";
import MySinglePost from "./pages/MySinglePost";
import Update from "./pages/Update";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import MyLists from "./pages/MyLists";
import InterviewTrackExplore from "./pages/InterviewTrackExplore";
import DefaultReadingList from "./pages/DefaultReadingList";
import CustomListsPosts from "./pages/CustomListPosts";
import SavedLists from "./pages/SavedLists";
import ReadingHistory from "./pages/ReadingHistory";
import UserReadingList from "./pages/UserReadingList";
import UserCustomLists from "./pages/UserCustomLists";
import Drafts from "./pages/Drafts";
import DraftRedirect from "./pages/DraftRedirect";
import DraftWrite from "./pages/DraftWrite";
import Landing from "./pages/Landing";
import CheckAuthentication from "./components/CheckAuthentication";
import VerifyToken from "./pages/VerifyToken";

const router = createBrowserRouter([
  {
    path: "/",
    element: 
    <Landing />
  },
  {
    path: "/interview-tracks",
    element:
    <CheckAuthentication>
      <InterviewTrackExplore />
    </CheckAuthentication>
  },
  {
    path: "/:id/:id",
    element: <CheckAuthentication>
    <SinglePost />
    </CheckAuthentication>
  },
  {
    path: "/:username",
    element: 
    <CheckAuthentication>
    <UserProfile />
    </CheckAuthentication>
  },
  {
    path: "/drafts",
    element: (
      <CheckAuthentication>
        <Drafts />
      </CheckAuthentication>
    ),
  },
  {
    path: "/draft",
    element: (
      <CheckAuthentication>
        <DraftRedirect />
      </CheckAuthentication>
    ),
  },
  {
    path: "/draft/:id",
    element: (
        <CheckAuthentication>
        <DraftWrite />
        </CheckAuthentication>
    ),
  },
  {
    path: "/me/lists",
    element: (
      <CheckAuthentication>
        <MyLists />
      </CheckAuthentication>
    ),
  },
  {
    path: "/me/lists/custom/:id",
    element: (
      <CheckAuthentication>
        <CustomListsPosts />
      </CheckAuthentication>
    ),
  },
  {
    path: "/me/lists/default",
    element: (
      <CheckAuthentication>
        <DefaultReadingList />
      </CheckAuthentication>
    ),
  },
  {
    path: "/me/interview-tracks",
    element: (
      <CheckAuthentication>
          <MyInterviewTracks />
      </CheckAuthentication>
    ),
  },
  {
    path: "/:id/interview-tracks/:id",
    element: (
      <CheckAuthentication>
        <MySinglePost />
      </CheckAuthentication>
    ),
  },
  {
    path: "/:id/interview-tracks/:id/update",
    element: (
      <CheckAuthentication>
        <Update />
      </CheckAuthentication>
    ),
  },
  {
    path: "/:username/reading-lists",
    element: (
      <CheckAuthentication>
        <UserReadingList />
      </CheckAuthentication>
    ),
  },
  {
    path: "/:username/reading-lists/:id",
    element: (
      <CheckAuthentication>
        <UserCustomLists />
      </CheckAuthentication>
    ),
  },
  {
    path: "/me/saved-lists",
    element: (
      <CheckAuthentication>
        <SavedLists />
      </CheckAuthentication>
    ),
  },
  {
    path: "/me/reading-history",
    element: (
      <CheckAuthentication>
        <ReadingHistory />
      </CheckAuthentication>
    ),
  },
  {
    path: "/register", //* This means that at register and Login page,we wont be seeing navbar and footer
    element: <Register />,
  },
  {
    path: "/login",
    element: (
        <Login />
    )
  },
  {
    path : "/verify/:token",
    element : <VerifyToken/>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;