import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ViewAllUsers = ({user}) => {
  const axiosSecure = useAxiosSecure();
  const {_id, name, email, badge, role } = user || {};
  const [updateRole, setUpdateRole] = useState(role);

      // Make Admin 
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
        
    
         
      }


  return (
    
      
      <tr>
     
        <td className='text-center font-semibold'>
          {name}
        </td>
        <td className='text-center'>{email}</td>
      
        <th className='text-center'>
          
          
          <button onClick={()=> handleMakeAdmin(name, role)}  className="btn btn-ghost btn-sm bg-cyan-500 text-white">{updateRole}</button>
          
          
        </th>

        <th className='text-center'>
          
          {badge}

          
          
        </th>
      </tr>
    
  );
};



export default ViewAllUsers;

