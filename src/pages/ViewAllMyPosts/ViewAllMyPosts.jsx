import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
// import { useContext } from 'react';
// import { AuthContext } from '../../providers/AuthProvider';

const ViewAllMyPosts = ({singlePost, handleComment, handleDelete}) => {
  // const {user} = useContext(AuthContext);
  const {_id, authorImage, title, upVote, downVote } = singlePost || {};




  return (
    
      
      <tr>
        <th>
        
        </th>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12 rounded-full">
                <img src={authorImage} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            
          </div>
        </td>
        
        
        
        <td className='text-center font-semibold'>
          {title}
        </td>
        <td className='text-center'>{upVote - downVote}</td>
      
        <th className='text-center'>
          
          <Link to={`/dashboard/comment/${_id}`}>
          <button onClick={()=> handleComment(_id)}  className="btn btn-ghost btn-sm bg-cyan-500 text-white">Comment</button>
          </Link>
          
        </th>

        <th className='text-center'>
          
          <button onClick={()=> handleDelete(_id)} className="btn btn-ghost btn-sm bg-cyan-500 text-white">Delete</button>

          
          
        </th>
      </tr>
    
  );
};

ViewAllMyPosts.propTypes = {
  singleSubmission:PropTypes.object,
  handleDelete:PropTypes.func,
  handleAssignmentMark:PropTypes.func,
};

export default ViewAllMyPosts;

