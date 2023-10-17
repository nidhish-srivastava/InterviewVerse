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
import SingleProfile from "./pages/SingleProfile";
import SavedPosts from "./pages/SavedPosts";
import MyProfile from "./pages/MyProfile";

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
        path : "/saved-posts/:id",
        element : <SavedPosts/>
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
        element: <SingleProfile />,
      },
      {
        path: "/create",
        element: <Create />,
      },
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
