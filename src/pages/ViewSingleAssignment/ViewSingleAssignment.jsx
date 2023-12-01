import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin} from 'react-icons/bi';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";
import { FaNotesMedical } from "react-icons/fa6";
import axios from "axios";

const ViewSingleAssignment = () => {
  const {user} = useContext(AuthContext);
  // console.log(user);
  const userEmail = user.email;
  const userName = user.displayName;
  const userPhoto = user.photoURL;
  const navigate = useNavigate();

  const singleAssingment = useLoaderData();
  const { url, title, description, level, marks, date } = singleAssingment || {};

  // const productAndEmail = { name, brandName, url, description, price, rating, type, userEmail };

  // console.log(singleAssingment);

    // Submit info to database 
    const handleTakeAssignment = async () => {
 

   /*    fetch('https://tech-tronix-server-de42tnfa0-ah-jims-projects.vercel.app/user', {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify(productAndEmail)
      }) */
  
      // Swal.fire(
      //   'Great!',
      //   "Successfully Added Product To Cart",
      //   'success'
      // )
      
      const { value: assignmentSubmission } = await Swal.fire({
        title: "Submission Form",
        html: `
          <h1 class="-mb-3">Your PDF Link</h1>
          <input type="url" id="swal-input1" class="swal2-input">
          <h1 class="pt-5 -mb-3">Quick Note</h1>
          <input type="textarea" id="swal-input2" class="swal2-input">
        `,
        focusConfirm: false,
        preConfirm: () => {
          const pdfLink = document.getElementById("swal-input1").value;
          const quickNote = document.getElementById("swal-input2").value;
          const status = "Pending";
          return {pdfLink, quickNote, userEmail,userName, userPhoto, title, marks, status};
        }
      });
      if (!assignmentSubmission?.pdfLink.length <= 0 && !assignmentSubmission?.quickNote.length <= 0) {
        // Swal.fire(JSON.stringify(formValues));
        console.log(assignmentSubmission.pdfLink.length && assignmentSubmission.quickNote.length );
       axios.post('https://elearn-platform-server.vercel.app/submitAssignment', assignmentSubmission)
       .then(res => {
        if(res.data.insertedId){ 
          console.log(res.data);
          Swal.fire(
            'Great!',
            "Assignment Submission Successfull",
            'success'
          );
          navigate('/allAssignments')
        }
       })
      }
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Provide the Url & Note",
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

      <div>
      <div className=" px-10 py-10 w-10/12 mx-auto  z-10 relative grid lg:grid-cols-4 md:grid-cols-1 gap-16 items-center">
        <div className="col-span-2 ">
        <img className="w-full border-2 border-purple-600" src={url} alt="" />
        </div>
       <div className="col-span-2">
       
       <h1 className=" text-xl font-bold "> {title}</h1>
       
       <p className="py-2 text-lg text-gray-600 font-medium">
       <span className=''>Marks:</span> {marks}
            </p>
       <p className=" text-gray-600 text-lg font-medium">
       <span className=''>Difficulty Level:</span> {level}
            </p>
       <p className="py-2 text-gray-600 text-lg font-medium flex items-center justify-start">
       <span className=' pe-1 '>Date: </span> <span className='text-purple-600'>{date}</span>
            </p>
       <p className=" py-2 pb-5 text-gray-600 text-lg font-normal">
              {description}
            </p>
            <button onClick={handleTakeAssignment} className="btn bg-purple-600 hover:bg-white border-2 hover:border-purple-600 border-purple-600  text-white hover:text-purple-600 rounded-none  md:text-base text-xs px-4">
            <FaNotesMedical />
              Take Assignment</button>

              <div className="flex justify-start items-center py-5 gap-7">
                <h1 className='py-2 text-lg text-gray-600 font-medium'>Share: </h1>
    <Link
      to="#facebook"
      className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent "
    >
      <BiLogoFacebook className='text-purple-600'></BiLogoFacebook>
    </Link>
    <Link
      to="#twitter"
      className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent  bg-clip-text"
    >
      <BiLogoTwitter className='text-purple-600'></BiLogoTwitter>
    </Link>
    <Link
      to="#instagram"
      className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent  bg-clip-text"
    >
      <BiLogoInstagram className='text-purple-600'></BiLogoInstagram>
    </Link>

    <Link
      to="#instagram"
      className="block font-sans text-xl antialiased font-normal leading-relaxed text-transparent  bg-clip-text"
    >
      <BiLogoLinkedin className='text-purple-600'></BiLogoLinkedin>
    </Link>
  </div>
       </div>
      </div>
      </div>
      
    </div>
  );
};

export default ViewSingleAssignment;