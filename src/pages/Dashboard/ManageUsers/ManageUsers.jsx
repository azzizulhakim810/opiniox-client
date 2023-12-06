import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ViewAllUsers from "../../ViewAllUsers/ViewAllUsers";


const ManageUsers = () => {
  const [users, setUsers] = useState();
 

    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        axiosSecure.get('/users')
        .then(res => setUsers(res.data))
    }, [axiosSecure])
    // console.log(users);


/*     // Make Admin 
    const handleMakeAdmin = (name, role) => {
      console.log(name, role);
      axiosSecure.patch(`/makeAdmin/${name}`, {role: role} )
      .then(res => {
        if(res.data.modifiedCount >= 1 ) {
          setUpdateRole("admin")
          Swal.fire({
            title: "Success",
            text: "Mark as admin",
            icon: "success",
            
          });
          console.log(res.data)
        }
        });
      
  
       
    } */

  return (
    
    <div>
      <div className="w-10/12 mx-auto pb-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                
                <th className="text-base text-center">User name</th>
                <th className="text-base text-center">User email</th>
                <th className="text-base text-center">Make Admin</th>
                <th className="text-base text-center">Subscription Status</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => (
                <ViewAllUsers
                  key={user._id}
                  user={user}
                  // handleMakeAdmin = {handleMakeAdmin}
                  // updateRole={updateRole}
                ></ViewAllUsers>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;