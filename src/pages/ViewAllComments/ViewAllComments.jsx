import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const ViewAllComments = ({singleComment}) => {
  const {user} = useContext(AuthContext);
  const reporter = user.email;
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const {commentPost, userEmail, title} = singleComment || {};
  const [reportButtonDisabled, setReportButtonDisabled] = useState(true);
const getFeedback = selectedFeedback?.value;
const axiosSecure = useAxiosSecure();
  const tagsOptions = [
    { value: "Good", label: "Good" },
    { value: "Bad", label: "Bad" },
    { value: "Okay", label: "Okay" },
  ];

  const handleChange = (feedback) => {
    setSelectedFeedback(feedback);
    setReportButtonDisabled(false);
  };

  const reportInfo = {
    commentedUser: userEmail,
    reporter,
    commentText : commentPost,
    postTitle: title,
    feedback : getFeedback

  }
  const handleReport = () => {
  

    axiosSecure.post('/report', reportInfo)
    .then(res => {
      console.log(res.data)
      if(res.data.insertedId) {
        Swal.fire(
          'Great!',
          "Post Submitted Successfully",
          'success'
        )
        setReportButtonDisabled(true); 
        setSelectedFeedback('');
      }
    })
    // console.log(reportInfo);
  };


  return (
    
      
      <tr>
       
        
        
        
        
        <td className=' font-semibold'>
        {userEmail}
        </td>
        <td className='text-center'>{commentPost}</td>
      
        <th className='text-center'>
          
        
                
                    <Select className="py-[2px] rounded-lg z-100" value={selectedFeedback} onChange={handleChange} options={tagsOptions} />
                  
          
         
          
        </th>

        <th className='text-center'>
          
          <button id='report-btn'
          onClick={handleReport}
          disabled={reportButtonDisabled} className="btn btn-ghost btn-sm bg-cyan-500 text-white ">Report</button>

          
          
        </th>
      </tr>
    
  );
};



export default ViewAllComments;

