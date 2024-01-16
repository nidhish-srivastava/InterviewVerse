import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Create from "./pages/Create";
import MyPosts from "./pages/MyPosts";
import MySinglePost from "./pages/MySinglePost";
import Update from "./pages/Update";
import SinglePost from "./pages/SinglePost";
import UserProfile from "./pages/UserProfile";
import Lists from "./pages/Lists";
import MyProfile from "./pages/MyProfile";
import InterviewTrackExplore from "./pages/InterviewTrackExplore";
import DefaultReadingList from "./pages/DefaultReadingList";
import CustomListsPosts from "./pages/CustomListPosts";
import SavedLists from "./pages/SavedLists";
import ReadingHistory from "./pages/ReadingHistory";

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      {/* <Footer/> */}
    </>
  );
};

// I have created two types of Layouts

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path : "/interview-tracks",
        element : <InterviewTrackExplore/>
      },
      {
        path : "/lists",
        element : <Lists/>
      },
      {
        path : "/lists/custom/:id",
        element : <CustomListsPosts/>
      },
      {
        path : "/lists/default",
        element : <DefaultReadingList/>
      },
      {
        path: "/my-posts/:id",
        element: <MyPosts />,
      },
      {
        path: "/my-posts/:id/:id",
        element: <MySinglePost />,
      },
      {
        path : "/:myProfile/my-profile",
        element : <MyProfile/>
      },
      {
        path: "/:id/:id",
        element: <SinglePost />,
      },
      {
        path: "/my-posts/:id/:id/update",
        element: <Update />,
      },
      {
        path: "/:username",
        element: <UserProfile />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path : "/saved-lists",
        element : <SavedLists/>
      },
      {
        path : "/reading-history",
        element : <ReadingHistory/>
      }
    ],
  },
  {
    path: "/register", //* This means that at register and Login page,we wont be seeing navbar and footer
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

// const router2 = createBrowserRouter([
//   {
//     path : "/",
//     element : <Layout/>,
//     children : [
//       {
//         path: "/",
//         element: <Home />,
//       },
//       {
//         path: "/post/:id",
//         element: <Single />,
//       },
//       {
//         path: "/create",
//         element: <Create />,
//       },
//       {
//         path : "/login",
//         element : <Login/>
//       },{
//         path : "register",
//         element : <Register/>
//       }
//     ]
//   }
// ])

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
