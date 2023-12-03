import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";
import { useContext, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const UpdateAssignment = () => {
  const {user} = useContext(AuthContext);
  const currentUserEmail = user.email;
  const navigate = useNavigate();
  // const [startDate, setStartDate] = useState(new Date());
  const selectToUpdate = useLoaderData();
  // console.log(selectToUpdate);

  const {_id, title, url, marks, level, description, date} = selectToUpdate || {};

  const handleUpdateAssignment = (event) => {
    event.preventDefault();

    const form = event.target;

    const title = form.title.value;
    const description = form.description.value;
    const marks = form.marks.value;
    const url = form.url.value;
    const level = document.getElementById("difficultyLevel").value;
    const date = form.date.value;
   

    const updateAssignment = {
      title,
      url,
      marks,
      level,
      description,
      date,
      currentUserEmail
    };

    console.log(updateAssignment);

    axios.put(`https://elearn-platform-server.vercel.app/assignment/updateOne/${_id}`, updateAssignment, {withCredentials: true})
    .then(res => {
      console.log(res.data);
      if(res.data.modifiedCount > 0) {
        Swal.fire(
          'Great!',
          "Assignment Update Successfull",
          'success'
        );
         navigate('/allAssignments');
      }
    }
      
      )
   
    
  };
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
      <div className="">
        <div className="w-8/12 mx-auto py-10 pb-24">
          <h1 className="text-base text-center tracking-widest text-gray-500 font-medium">
            FILL THE FORM
          </h1>

          <h1 className="text-5xl text-center pb-10 tracking-widest font-bold ">
            UPDATE AN ASSIGNMENT
          </h1>

          <form onSubmit={handleUpdateAssignment}>
            {/* Title & Description row */}

            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Title</span>
                </label>

                <label className="input-group">
                  <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    className="input input-bordered w-full" 
                    defaultValue={title}
                    required
                  />
                </label>
              </div>

              <div className="form-control md:w-1/2 md:ml-4">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>

                <label className="input-group">
                  <input
                    type="text"
                    name="description"
                    placeholder="Description"
                    className="input input-bordered w-full" 
                    defaultValue={description}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Marks & Thumbnail Image row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Marks</span>
                </label>

                <label className="input-group">
                  <input
                    type="text"
                    name="marks"
                    placeholder="Marks"
                    className="input input-bordered w-full" 
                    defaultValue={marks}
                    required
                  />
                </label>
              </div>

              <div className="form-control md:w-1/2 md:ml-4">
                <label className="label">
                  <span className="label-text">Thumbnail Image</span>
                </label>

                <label className="input-group">
                  <input
                    type="url"
                    name="url"
                    placeholder="Thumbnail Image URL"
                    className="input input-bordered w-full" 
                    defaultValue={url}
                    required
                  />
                </label>
              </div>
            </div>

            {/* Product Type & Price row */}
            <div className="md:flex mb-8">
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Difficulty Level</span>
                </label>

                <label className="input-group">
                  <select id="difficultyLevel" className="input input-bordered w-full" required defaultValue={level}>
                    <option value="">--Choose an option--</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                  {/* <input
                  type="text"
                  name="type"
                  placeholder="Type (Ex- Phone/Monitor/Refrigerator/TV)"
                  className="input input-bordered w-full"
                /> */}
                </label>
              </div>

              <div className="form-control md:w-1/2 md:ml-4">
              <label className="label">
                <span className="label-text">Due Date</span>
              </label>
              <div className="mt-2">
              {/* <DatePicker name="date" className="input input-bordered -mt-2" defaultValue={date} required  
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)}
    /> */}
              </div>
               

                
              </div>
            </div>


            <input
              type="submit"
              value="Update Assignment"
              className="btn btn-block uppercase bg-purple-600 hover:bg-purple-800 text-white"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAssignment;