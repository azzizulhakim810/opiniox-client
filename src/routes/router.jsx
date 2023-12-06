import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";

import ViewSinglePost from "../pages/ViewSinglePost/ViewSinglePost";
import AllPosts from "../pages/AllPosts/AllPosts";
import Dashboard from "../layout/dashboard";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
import CommentPage from "../pages/Dashboard/CommentPage/CommentPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import ManageUsers from "../pages/Dashboard/ManageUsers/ManageUsers";
import MakeAnnouncement from "../pages/Dashboard/MakeAnnouncement/MakeAnnouncement";
import ReportedComments from "../pages/Dashboard/ReportedComments/ReportedComments";



export const router = createBrowserRouter([
  {
    path:'/',
    element:<Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path:'/',
        element: <Home></Home>,
        loader: () => fetch('https://opiniox-server.vercel.app/postsCount')
      }, 
      {
        path:'/allPosts',
        element:<AllPosts></AllPosts>,
        loader: () => fetch('https://opiniox-server.vercel.app/postsCount')
      }
      , 
      {
        path:'/membership',
        element:<AllPosts></AllPosts>,
        loader: () => fetch('https://opiniox-server.vercel.app/postsCount')
      },
      {
        path:'/singlePost/:id',
        element: <PrivateRoute><ViewSinglePost></ViewSinglePost></PrivateRoute>,
        loader: ({params}) => fetch(`https://opiniox-server.vercel.app/posts/single/${params.id}`)
      },
       
      {
        path:'/signin',
        element:<Login></Login>
      },
      {
        path:'/signup',
        element:<Register></Register>
      },
    ]
  },
  {
    path: 'dashboard',
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: '/dashboard/myprofile',
        element:<PrivateRoute><MyProfile></MyProfile></PrivateRoute>,
        
      },
      {
        path: '/dashboard/myposts',
        element: <PrivateRoute><MyPosts></MyPosts></PrivateRoute>
      },
      {
        path: '/dashboard/addpost',
        element: <PrivateRoute><AddPost></AddPost></PrivateRoute>
      },
      {
        path: '/dashboard/comment/:id',
        element: <PrivateRoute><CommentPage></CommentPage></PrivateRoute> ,
        loader: ({params}) => fetch(`https://opiniox-server.vercel.app/allComments/${params.id}`)
      },
      {
        path: '/dashboard/manageUsers',
        element: <PrivateRoute><ManageUsers></ManageUsers></PrivateRoute>
      },
      
      {
        path: '/dashboard/makeAnnouncement',
        element: <PrivateRoute><MakeAnnouncement></MakeAnnouncement></PrivateRoute>
      },
      {
        path: '/dashboard/reportedComments',
        element: <PrivateRoute><ReportedComments></ReportedComments></PrivateRoute>
      },
      
    ]
  }
])