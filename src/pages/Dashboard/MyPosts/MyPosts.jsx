import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import ViewAllMyPosts from "../../ViewAllMyPosts/ViewAllMyPosts";
import Swal from "sweetalert2";


const MyPosts = () => {
  const axiosSecure = useAxiosSecure();
  const [allPosts, setAllPosts] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const {user, loading} = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {

    const fetchRecentPosts = async () => {
      const res = await axiosSecure.get(`/allPosts?email=${userEmail}`)
      // console.log(res.data);
      setAllPosts(res.data);
    };

    fetchRecentPosts()
  }, [userEmail, axiosSecure]);

  const handleComment = (id) => {
    // console.log(id);
    axiosSecure.get(`/allComments/?id=${id}`)
    .then(res => setAllComments(res.data))
  }

  const handleDelete = (id) => {
    console.log(id);
    axiosSecure.delete(`/posts/delete/${id}`)
    .then(res => {
      if(res.data.deletedCount > 0 ) {
        const remaining = allPosts.filter(singlep => singlep._id !== id);
        setAllPosts(remaining);
      }
      console.log(res.data)});
    Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success",
      
    });

     
  }

// console.log(allComments);

  return (
    <div>
      <div className="w-10/12 mx-auto pb-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  
                </th>
                <th className="text-base">Profile</th>
                <th className="text-base text-center">Post Title</th>
                <th className="text-base">Number of votes</th>
                <th className="text-base">Comment Button</th>
                <th className="text-base">Delete Button</th>
              </tr>
            </thead>
            <tbody>
              {allPosts?.map((singlePost) => (
                <ViewAllMyPosts
                  key={singlePost._id}
                  singlePost={singlePost}
                  handleComment = {handleComment}
                  handleDelete={handleDelete}
                  // handleAssignmentConfirm={handleAssignmentConfirm}
                ></ViewAllMyPosts>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;