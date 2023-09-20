import {
  createBrowserRouter,
  RouterProvider,
  Outlet
} from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Single from './pages/MySinglePost'
import Register from './pages/Register'
import Login from './pages/Login'
import Create from './pages/Create'
import { useTrackerContext } from './context/context'
import Profile from './pages/Profile'
import MySingle from './pages/MySinglePost'
import Update from './pages/Update'
          
const Layout = () =>{
  return(
    <>
    <Navbar/>
    <Outlet/>
    {/* <Footer/> */}
    </>
  )
}

// I have created two types of Layouts

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      }, {
        path : "/:id",
        element : <Profile/>
      },
      {
        path: "/:id/:id",
        element: <MySingle/>,
      },{
        path : "/:id/:id/update",
        element : <Update/>
      },
      {
        path: "/create",
        element: <Create />,
      },
    ],
  },
  {
    path: "/register",      //* This means that at register and Login page,we wont be seeing navbar and footer
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);


const router2 = createBrowserRouter([
  {
    path : "/",
    element : <Layout/>,
    children : [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/post/:id",
        element: <Single />,
      },
      {
        path: "/create",
        element: <Create />,
      },
      {
        path : "/login",
        element : <Login/>
      },{
        path : "register",
        element : <Register/>
      }
    ]
  }
])

function App() {
  const {isAuthenticated} = useTrackerContext()
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App