import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
// import AddProduct from "../pages/AddProduct/AddProduct";
// import MyCart from "../pages/MyCart/MyCart";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
// import PrivateRoute from "./PrivateRoute/PrivateRoute";
// import AllAssignments from "../pages/AllAssignments/AllAssignments";
// import CreateAssignment from "../pages/CreateAssignment/CreateAssignment";
// import MyAssignments from "../pages/MyAssignment/MyAssignments";
// import SubmittedAssignment from "../pages/SubmittedAssignment/SubmittedAssignment";
// import UpdateAssignment from "../pages/UpdateAssignment/UpdateAssignment";
// import ViewSingleAssignment from "../pages/ViewSingleAssignment/ViewSingleAssignment";
// import Header from "../components/Header/Header";
// import Footer from "../components/Footer/Footer";
import ViewSinglePost from "../pages/ViewSinglePost/ViewSinglePost";
import AllPosts from "../pages/AllPosts/AllPosts";
import Dashboard from "../layout/dashboard";
import MyPosts from "../pages/Dashboard/MyPosts/MyPosts";
import AddPost from "../pages/Dashboard/AddPost/AddPost";
import MyProfile from "../pages/Dashboard/MyProfile/MyProfile";
// import BrandBasedProducts from "../pages/BrandBasedProducts/BrandBasedProducts";
// import SingleProductDetails from "../pages/SingleProductDetails/SingleProductDetails";
// import UpdateProduct from "../components/UpdateProduct/UpdateProduct";


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
       
 /*     {
        path:'/singleAssignment/:id',
        element:<ViewSingleAssignment></ViewSingleAssignment>,
        // loader: ({params}) => fetch(`https://elearn-platform-server.vercel.app/assignment/singleOne/${params.id}`)
      },
      {
        path:'/createAssignment',
        element:<CreateAssignment></CreateAssignment>
      },
      {
        path:'/myAssignment',
        // element:<PrivateRoute><MyAssignments></MyAssignments></PrivateRoute>,
        element:<MyAssignments></MyAssignments>
      },
      {
        path:'/submittedAssignment',
        // element:<PrivateRoute><SubmittedAssignment></SubmittedAssignment></PrivateRoute>,
        element:<SubmittedAssignment></SubmittedAssignment>
      },
      
      {
        path:'/update/:id',
        // element:<PrivateRoute><UpdateAssignment></UpdateAssignment></PrivateRoute>,
        element:<UpdateAssignment></UpdateAssignment>,
        // loader: ({params}) => fetch(`https://elearn-platform-server.vercel.app/assignment/updateOne/${params.id}`)
      }, */
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
        // loader: () => fetch('http://localhost:5000/user')
      },
      {
        path: '/dashboard/myposts',
        element: <MyPosts></MyPosts>
      },
      {
        path: '/dashboard/addpost',
        element: <AddPost></AddPost>
      }
      
    ]
  }
])