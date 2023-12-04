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



export const router = createBrowserRouter([
  {
    path:'/',
    element:<Root></Root>,
    errorElement:<ErrorPage></ErrorPage>,
    children: [
      {
        path:'/',
        element: <Home></Home>,
        loader: () => fetch('http://localhost:5000/postsCount')
      }, 
      {
        path:'/allPosts',
        element:<AllPosts></AllPosts>,
        loader: () => fetch('http://localhost:5000/postsCount')
      },
      {
        path:'/singlePost/:id',
        element: <ViewSinglePost></ViewSinglePost>,
        loader: ({params}) => fetch(`http://localhost:5000/posts/single/${params.id}`)
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
        element:<MyProfile></MyProfile>,
        
      },
      {
        path: '/dashboard/myposts',
        element: <MyPosts></MyPosts>
      },
      {
        path: '/dashboard/addpost',
        element: <AddPost></AddPost>
      },
      {
        path: '/dashboard/comment/:id',
        element: <CommentPage></CommentPage>,
        loader: ({params}) => fetch(`http://localhost:5000/allComments/${params.id}`)
      }
      
    ]
  }
])