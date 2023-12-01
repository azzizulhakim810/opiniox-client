import PropTypes from 'prop-types';
// import { useContext } from 'react';
// import { AuthContext } from '../../providers/AuthProvider';

const ViewAllMyAssignments = ({singleSubmission, handleAssignmentMark, handleDelete}) => {
  // const {user} = useContext(AuthContext);
  const {_id, title, marks, userPhoto, userName} = singleSubmission || {};
  // console.log(user.photoURL);
  // console.log(singleSubmission);
  // console.log(status);



  return (
    
      
      <tr>
        <th>
        <button onClick={()=>handleDelete(_id)} className="btn btn-sm btn-circle bg-purple-600 text-white hover:bg-purple-900">
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 rounded-full">
                <img src={userPhoto} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            {/* <div>
              <div className="font-bold">{userName}</div>
            </div> */}
          </div>
        </td>
        
        
        <td className='text-center'>
          {userName}
        </td>
        <td className='text-center'>
          {title}
        </td>
        <td className='text-center'>{marks}</td>
        {/* <td>20</td> */}
        {/* <td>Good</td> */}
        <th className='text-center'>
          {/* {
            status === "Completed" ? <span className="btn btn-ghost btn-xs">Completed</span> :
            <button onClick={()=> handleAssignmentMark(_id)} className="btn btn-ghost btn-xs">Pending</button>
          } */}
          <button onClick={()=> handleAssignmentMark(_id)} className="btn btn-ghost btn-xs">Give Mark</button>
          
        </th>
      </tr>
    
  );
};

ViewAllMyAssignments.propTypes = {
  singleSubmission:PropTypes.object,
  handleDelete:PropTypes.func,
  handleAssignmentMark:PropTypes.func,
};

export default ViewAllMyAssignments;

