import React, { useState, useEffect, useContext } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { RiVerifiedBadgeFill } from "react-icons/ri";


const AdminProfile = () => {
  const {user, loading} = useContext(AuthContext);
  const userEmail = user?.email;
  // const navigate = useNavigate();
  // const userInfo = useLoaderData();
  // console.log(userInfo);
  const axiosSecure = useAxiosSecure();
  const [currentUser, setCurrentUser] = useState([]);

  const [recentPosts, setRecentPosts] = useState([]);


  useEffect(() => {

    const fetchRecentPosts = async () => {
      const res = await axiosSecure.get(`/recentPost?email=${userEmail}`)
      // console.log(res.data);
      setRecentPosts(res.data.slice(0, 3));
    };

    fetchRecentPosts()
  }, [userEmail, axiosSecure]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/user?email=${userEmail}`)
      // console.log(res.data);
     setCurrentUser(res.data);
    };

  fetchData();
  }, [userEmail, axiosSecure]);

  // console.log(recentPosts);

  return (
    <div className="p-4">
      {/* User Info Section */}
      <div className="flex items-center mb-4">
         {/* Badges Section */}
      <div >
        {
          currentUser.badge === 'Gold' ? <div className=" p-2 rounded-md mb-2 flex flex-col items-center">
          <RiVerifiedBadgeFill  className='text-4xl text-yellow-500'/>
        <p className="text-black font-semibold">Gold</p>
        
      </div> : <div className=" p-2 rounded-md mb-2 flex flex-col items-center">
          <RiVerifiedBadgeFill  className='text-4xl text-gray-500'/>
        <p className="text-black font-semibold">Bronze</p>
        
      </div>
        }
        
      </div>

      {
          loading && <div className="text-cyan-500 translate-x-[50%] ">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        }

      {
        currentUser && <>
      <img src={currentUser.photoURL} alt="User" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{currentUser.name}</h2>
          <p className="text-gray-600">{currentUser.email}</p>
        </div>
      </>
      }
        
      </div>

     

      {/* Recent Posts Section */}
      <div>
        
        {/* {recentPosts.map(post => (
          <div key={post._id} className="border p-4 mb-4 rounded-md ">
            <div className="flex flex-col justify-center gap-2 shadow-lg bg-white py-5 px-10 ">
                      <h4 className="font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 ">
                        {post.title}
                      </h4>
                      <p className="font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        {post.description}
                      </p>
                    </div>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default AdminProfile;
