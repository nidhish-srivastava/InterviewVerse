import { Suspense, lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const Register = lazy(() => import("./pages/Register"));
const Login = lazy(() => import("./pages/Login"));
const MyInterviewTracks = lazy(() => import("./pages/MyInterviewTracks"));
const MySinglePost = lazy(() => import("./pages/MySinglePost"));
const Update = lazy(() => import("./pages/Update"));
const SinglePost = lazy(() => import("./pages/SinglePost"));
const UserProfile = lazy(() => import("./pages/UserProfile"));
const MyLists = lazy(() => import("./pages/MyLists"));
const InterviewTrackExplore = lazy(() => import("./pages/InterviewTrackExplore"));
const DefaultReadingList = lazy(() => import("./pages/DefaultReadingList"));
const CustomListsPosts = lazy(() => import("./pages/CustomListPosts"));
const SavedLists = lazy(() => import("./pages/SavedLists"));
const ReadingHistory = lazy(() => import("./pages/ReadingHistory"));
const UserReadingList = lazy(() => import("./pages/UserReadingList"));
const UserCustomLists = lazy(() => import("./pages/UserCustomLists"));
const Drafts = lazy(() => import("./pages/Drafts"));
const DraftRedirect = lazy(() => import("./pages/DraftRedirect"));
const DraftWrite = lazy(() => import("./pages/DraftWrite"));
const SkeletonLoader = lazy(() => import("./components/ui/SkeletonLoader"));
const Landing = lazy(() => import("./pages/Landing"));
const CheckAuthentication = lazy(() => import("./components/CheckAuthentication"));


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
    element: <SinglePost />,
  },
  {
    path: "/:username",
    element: <UserProfile />,
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
        <Suspense fallback={<SkeletonLoader isLoading={true} />}>
          <MyInterviewTracks />
        </Suspense>
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
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;