import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ViewAllReports from "../../ViewAllReports/ViewAllReports";
import Swal from "sweetalert2";


const ReportedComments = () => {
  const [reports, setReports] = useState();
  const [reportDelete, setReportDelete] = useState();

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
      axiosSecure.get('/reports')
      .then(res => setReports(res.data))
  }, [axiosSecure])
  // console.log(reports);

 

  // Delete report 
  const handleDeleteReport = (id) => {
    console.log(id);
    axiosSecure.delete(`/report/delete/${id}`)
    .then(res => {
      if(res.data.deletedCount > 0 ) {
        const remaining = reports.filter(singlep => singlep._id !== id);
        setReports(remaining);
        Swal.fire({
          title: "Deleted!",
          text: "The report has been deleted.",
          icon: "success",
          
        });
      }
      console.log(res.data)});
    

     
  }

  return (
    <div>
        <div className="w-10/12 mx-auto pb-20">
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                
                <th className="text-base text-center">Post</th>
                <th className="text-base text-center">Comment User</th>
                <th className="text-base text-center">Reporter</th>
                <th className="text-base text-center">Feedback</th>
                <th className="text-base text-center">Delete Report</th>
                {/* <th className="text-base text-center">Make Admin</th> */}
                {/* <th className="text-base text-center">Subscription Status</th> */}
              </tr>
            </thead>
            <tbody>
              {reports?.map((report) => (
                <ViewAllReports
                  key={report._id}
                  report={report}
                  handleDeleteReport = {handleDeleteReport}
                  // reportDelete={reportDelete}
                ></ViewAllReports>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReportedComments;