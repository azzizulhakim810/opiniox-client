import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
import ViewAllMySubmissions from "../ViewAllMySubmissions/ViewAllMySubmissions";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
// import PDFViewer from "../../components/PDFViewer/PDFViewer";

// import { Document, Page } from 'react-pdf';
// import 'react-pdf/dist/Page/AnnotationLayer.css';
// import 'react-pdf/dist/Page/TextLayer.css';

const SubmittedAssignment = () => {
  const {user} = useContext(AuthContext)
  const currentUser = user.email;
  const navigate = useNavigate();
  const [allSubmission, setAllSubmission] = useState([]);

  // const pdfUrl = 'https://drive.google.com/uc?id=1-Md1WD6g5D0riERVfgOviklhv3_JDnHi';
      // React Pdf Implementation 
      // const [numPages, setNumPages] = useState();
      // const [pageNumber, setPageNumber] = useState(1);
  
     /*  function onDocumentLoadSuccess({ numPages }) {
        setNumPages(numPages);
      }
 */
  const url = `https://elearn-platform-server.vercel.app/submitAssignment/allSubmission/status`;

  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setAllSubmission(data));
  }, [url]);
  // console.log(allSubmission);

  const handleDelete = (id) => {
    // console.log(id);
    const captureTheUser = allSubmission?.map(s => s)?.find(m => m._id == id);
    // console.log(captureTheUser.userEmail);
    // console.log(currentUser);
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        
        if(captureTheUser.userEmail === currentUser) {
          if (result.isConfirmed) {
            axios.delete(`https://elearn-platform-server.vercel.app/submitAssignment/allSubmission/${id}`)
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
        }
        
        else if (result.isConfirmed) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "You can't delete other's assignments",
          });
        }
      });
  }


  const handleAssignmentMark = async (id) => {
    // console.log(id);
/*     // React Pdf Implementation 
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);

    function onDocumentLoadSuccess({ numPages }) {
      setNumPages(numPages);
    } */

    const getThePending = allSubmission?.map(s => s)?.find(m => m._id == id);
    // const find = map.find(m => m._id == id);
    console.log(getThePending);
    
    // <PDFViewer pdfUrl={pdfUrl} />

    const { value: markTheAssignment } = await Swal.fire({
      title: "Evaluation",
      html: `
        <h1 class="mb-3"><strong>Examinee PDF Link</strong></h1>
        <a class="mb-10" target='blank' href=${getThePending.pdfLink}>${getThePending.pdfLink}</a>

        
        <iframe class="pt-5" src=${getThePending.pdfLink} width="100%" height="600px" frameborder="0" scrolling="no"></iframe>

        
        <h1 class="pt-5 mb-3"><strong>Examinee Note</strong> : ${getThePending.quickNote}</h1>

        
        
        <h1 class="-mb-3"><strong>Your Mark</strong></h1>
        <input type="url" id="swal-input1" class="swal2-input">
        <h1 class="-mb-3"><strong>Your Feedback</strong></h1>
        <input type="textarea" id="swal-input2" class="swal2-input">

        
        

        
      `,
      focusConfirm: false,
      preConfirm: () => {
        const obtainedMark = document.getElementById("swal-input1").value;
        const feedback = document.getElementById("swal-input2").value;
        const status = "Completed";
        return {obtainedMark, feedback, status};
      }
    });
    console.log(markTheAssignment);
    if (!markTheAssignment?.obtainedMark.length <= 0 && !markTheAssignment?.feedback.length <= 0) {
      // Swal.fire(JSON.stringify(formValues));
      // console.log(markTheAssignment.pdfLink.length && markTheAssignment.quickNote.length );
     axios.patch(`https://elearn-platform-server.vercel.app/submitAssignment/allSubmission/${id}`, markTheAssignment)
     .then(res => {
      if(res.data.modifiedCount > 0) {
        Swal.fire(
          'Great!',
          "Submitted Mark! Set as completed",
          'success'
        );
         navigate('/myAssignment');
      }
     })
    }
    return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Provide the Marks & Feedback",
    });
 
  }

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
        ALL USER'S
        </h1>

        <h1 className="text-4xl md:text-5xl text-center tracking-widest font-bold ">
        SUBMISSIONS
        </h1>

        <div>

        
        

    </div>

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
                <th className="text-base  text-center">Examinee Name</th>
                <th className="text-base  text-center">Assignment Title</th>
                <th className="text-base text-center">Assignment Mark</th>
                {/* <th className="text-base">Obtained Marks</th> */}
                {/* <th className="text-base">Feedback</th> */}
                <th className="text-base text-center">Press to Mark</th>
              </tr>
            </thead>
            <tbody>
              {allSubmission?.map((singleSubmission) => (
                <ViewAllMySubmissions
                  key={singleSubmission._id}
                  singleSubmission={singleSubmission}
                  handleDelete={handleDelete}
                  handleAssignmentMark={handleAssignmentMark}
                ></ViewAllMySubmissions>
              ))}
            </tbody>
          </table>
          {/* <PDFViewer pdfUrl='/src/sample.pdf' /> */}
        </div>
      </div>
    </div>
  );
};

export default SubmittedAssignment;
