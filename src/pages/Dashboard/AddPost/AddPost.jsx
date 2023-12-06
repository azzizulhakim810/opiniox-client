import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { AuthContext } from "../../../providers/AuthProvider";
import Swal from "sweetalert2";

const AddPost = () => {
  const {user} = useContext(AuthContext);
  const userEmail = user?.email;

  const navigate = useNavigate();
  const [postCount, setPostCount] = useState([]);
  const [selectedTag, setSelectedTag] = useState(null);
  const axiosSecure = useAxiosSecure();
  useEffect(() => {
    const fetchPostCount = async () => {
    const res = await axiosSecure.get(`/totalPost?email=${userEmail}`)
    // console.log(res.data);
    setPostCount(res.data);   
    };

    fetchPostCount();
  }, [userEmail, axiosSecure]);

  // console.log(postCount);
  const handleBecomeMember = () => {
    navigate("/membership");
  };

  const handleAddPost = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const timestamp = currentDate.toISOString();

    const form = e.target;
    const author = form.name.value;
    const authorEmail = form.authorEmail.value;
    const title = form.title.value;
    const description = form.description.value;
    const upVote = parseInt(form.upVote.value);
    const downVote = parseInt(form.downVote.value);
    const authorImage = form.authorImage.value;
    const tags = selectedTag.value;
    const time =  timestamp;
   

    const newPost = {
      author,
      authorEmail,
      title,
      description,
      upVote,
      downVote,
      authorImage,
      tags,
      time,
      commentsCount: 0,

    };

    console.log(newPost);

    axiosSecure.post('/posts', newPost)
    .then(res => {
      console.log(res.data);
      if(res.data.insertedId) {
        Swal.fire(
          'Great!',
          "Post Submitted Successfully",
          'success'
        );
         form.reset();
         navigate('/dashboard/myPosts')
      }
    }
      
      )
  };

  const tagsOptions = [
    { value: "coding", label: "coding" },
    { value: "travel", label: "travel" },
    { value: "community", label: "community" },
    { value: "technology", label: "technology" },
    { value: "books", label: "books" },
    { value: "food", label: "food" },
  ];

  const handleChange = (tag) => {
    setSelectedTag(tag);
  };

  return (
    <div className="container mx-auto mt-4">
      <div className="bg-white p-8 shadow-md rounded-md">
        {postCount.length <= 5 ? (

            <form onSubmit={handleAddPost}>
              {/* Title & Description row */}

              {/* Image &  Name */}
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

              {/* Author Email &  Post Title */}
              <div className="md:flex mb-8">
                <div className="form-control md:w-1/2 ">
                  <label className="label">
                    <span className="label-text">Author Email</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="email"
                      name="authorEmail"
                      placeholder="Author Email"
                      className="input input-bordered w-full"
                      defaultValue={userEmail}
                      required
                    />
                  </label>
                </div>

                <div className="form-control md:w-1/2 md:ml-4">
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
              </div>

              {/* Post Description &  Tag */}
              <div className="md:flex mb-8">
                <div className="form-control md:w-1/2 ">
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

                <div className="form-control md:w-1/2 md:ml-4">
                  <label className="block">
                  <label className="label">
                    <span className="label-text">Tag:</span>
                  </label>
                    <Select className="py-[2px] rounded-lg" value={selectedTag} onChange={handleChange} options={tagsOptions} />
                  </label>
                </div>
              </div>

              {/* UpVote & DownVote row */}
              <div className="md:flex mb-8">
                <div className="form-control md:w-1/2">
                  <label className="label">
                    <span className="label-text">UpVote</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="tel"
                      name="upVote"
                      placeholder="UpVote"
                      className="input input-bordered w-full"
                      defaultValue={0}
                      required
                    />
                  </label>
                </div>

                <div className="form-control md:w-1/2 md:ml-4">
                  <label className="label">
                    <span className="label-text">DownVote</span>
                  </label>

                  <label className="input-group">
                    <input
                      type="tel"
                      name="downVote"
                      placeholder="DownVote"
                      className="input input-bordered w-full"
                      defaultValue={0}
                      required
                    />
                  </label>
                </div>
                
              </div>

              

              <input
                type="submit"
                value="Submit Post"
                className="btn btn-block uppercase bg-cyan-600 hover:bg-cyan-800 text-white"
              />
            </form>
          
        ) : (
          <div>
            <p className="mb-4">
              You have reached the maximum number of posts allowed.
            </p>
            <button
              className="bg-green-500 text-white py-2 px-4 rounded-md"
              onClick={handleBecomeMember}
            >
              Become a Member
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPost;
