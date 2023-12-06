import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const MakeAnnouncement = () => {
  const {user} = useContext(AuthContext);
  const userEmail = user?.email;

  const navigate = useNavigate();
  // const [postCount, setPostCount] = useState([]);
  // const [selectedTag, setSelectedTag] = useState(null);
  const axiosSecure = useAxiosSecure();

 

  // Make Announcement 
  const handleMakeAnnouncement = (e) => {
    e.preventDefault();

    const form = e.target;
    const authorImage = form.authorImage.value;
    const authorName = form.name.value;
    const title = form.title.value;
    const description = form.description.value;

   

    const newAnnouncement = {
      authorImage,
      author: authorName,
      title,
      description  

    };

    // console.log(newAnnouncement);

    axiosSecure.post('/announcement', newAnnouncement)
    .then(res => {
      console.log(res.data);
      if(res.data.insertedId) {
        Swal.fire(
          'Great!',
          "Announcement Has Made Successfully",
          'success'
        );
         form.reset();
        //  navigate('/dashboard/myPosts')
      }
    }
      
      )
  };




  return (
    <div className="container mx-auto mt-4">
      <div className="bg-white p-8 shadow-md rounded-md">
        
      <form onSubmit={handleMakeAnnouncement}>

              {/* Author Image & Author  Name */}
              <div className="md:flex mb-8">
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text">Author Image Url</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="url"
                      name="authorImage"
                      placeholder="Author Image Url"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>

                <div className="form-control md:w-1/2 md:ml-4">
                  <label className="label">
                    <span className="label-text">Author Name</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="text"
                      name="name"
                      placeholder="Author Name"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>
              </div>

              {/* Post Title & Description*/}
              <div className="md:flex mb-8">

                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">Post Title</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="text"
                      name="title"
                      placeholder="Post Title"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>

                <div className="form-control md:w-1/2 md:ml-4 ">
                  <label className="label">
                    <span className="label-text">Post Description</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="text"
                      name="description"
                      placeholder="Post Description"
                      className="input input-bordered w-full"
                      required
                    />
                  </label>
                </div>

              </div>

              <input
                type="submit"
                value="Make Announcement"
                className="btn btn-block uppercase bg-cyan-600 hover:bg-cyan-800 text-white"
              />
            </form>
       
      </div>
    </div>
  );
};

export default MakeAnnouncement;
