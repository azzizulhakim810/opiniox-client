import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ViewAllReports = ({report, handleDeleteReport}) => {

  const {_id, reporter, commentedUser, feedback, postTitle } = report || {};



  return (
    
      
      <tr>
     
        <td className='text-center font-semibold'>
          {postTitle}
        </td>
        <td className='text-center'>{commentedUser}</td>
      
       

        <td className='text-center font-semibold'>
          {reporter}
        </td>

        <th className='text-center'>
          
          {feedback}

          
          
        </th>
        <th className='text-center'>
          
          
          <button onClick={()=> handleDeleteReport(_id)}  className="btn btn-ghost btn-sm bg-cyan-500 text-white">Delete</button>
          
          
        </th>
        
      </tr>
    
  );
};



export default ViewAllReports;

