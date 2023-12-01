import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import ViewAllMyAssignments from "../ViewAllMyAssignments/ViewAllMyAssignments";
// import axios from "axios";
// import Swal from "sweetalert2";

const MyAssignments = () => {
  const { user } = useContext(AuthContext);
  const [allSubmission, setAllSubmission] = useState([]);

  const url = `https://elearn-platform-server.vercel.app/submitAssignment/specificSubmission?email=${user.email}`;

  useEffect(() => {
    fetch(url, {credentials: 'include'})
      .then((res) => res.json())
      .then((data) => setAllSubmission(data));
  }, [url]);
  // console.log(allSubmission);

/*   const handleDelete = (id) => {
    // console.log(id);

      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        
        if (result.isConfirmed) {
          axios.delete(`https://elearn-platform-server.vercel.app/submitAssignment/specificSubmission/${id}`)
          .then(res => {
            if(res.data.deletedCount > 0 ) {
              const remaining = allSubmission.filter(singleSub => singleSub._id !== id);
              setAllSubmission(remaining);
            }
            console.log(res.data)});
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
            
          });
        }
      });
  } */

/*   const handleAssignmentConfirm = (id) => {
    // console.log(id);

    axios.patch(`https://elearn-platform-server.vercel.app/submitAssignment/specificSubmission/${id}`, {status:'Completed'})
    .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0) {
        const remaining = allSubmission?.filter(singleSub => singleSub._id !== id);
        const updated = allSubmission?.find(singleSub => singleSub._id === id);
        updated.status = 'Completed';
        const newSubmission = [updated, ...remaining];
        setAllSubmission(newSubmission);
    }
    })
  } */

  return (
    <div>
      <div
        className="hero h-[98px] -mt-24"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/dfLxV9s/home-bg-one-course-1.jpg)",
        }}
      >
        <div className="hero-overlay bg-opacity-10 "></div>
        <div className="hero-content text-left text-neutral-content w-10/12">
          <div className="w-full"></div>
        </div>
      </div>
      <div className="py-10">
        <h1 className="text-base text-center tracking-widest text-gray-500 font-medium">
          ALL ARE
        </h1>

        <h1 className="text-4xl md:text-5xl  text-center tracking-widest font-bold ">
          MY SUBMISSIONS
        </h1>
      </div>
      <div className="w-10/12 mx-auto pb-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  
                </th>
                <th className="text-base">Profile</th>
                <th className="text-base">Assignment Title</th>
                <th className="text-base">Assignment Marks</th>
                <th className="text-base">Obtained Marks</th>
                <th className="text-base">Feedback</th>
                <th className="text-base">Assignment Status</th>
              </tr>
            </thead>
            <tbody>
              {allSubmission?.map((singleSubmission) => (
                <ViewAllMyAssignments
                  key={singleSubmission._id}
                  singleSubmission={singleSubmission}
                  // handleDelete={handleDelete}
                  // handleAssignmentConfirm={handleAssignmentConfirm}
                ></ViewAllMyAssignments>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyAssignments;
