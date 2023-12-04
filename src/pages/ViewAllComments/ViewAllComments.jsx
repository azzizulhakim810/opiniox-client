import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Select from "react-select";
import useAxiosSecure from '../../hooks/useAxiosSecure';

const ViewAllComments = ({singleComment}) => {
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const {commentPost, userEmail} = singleComment || {};
  const [reportButtonDisabled, setReportButtonDisabled] = useState(true);

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

  const handleReport = () => {
    setReportButtonDisabled(true); 

    // axiosSecure.post('/add')
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

