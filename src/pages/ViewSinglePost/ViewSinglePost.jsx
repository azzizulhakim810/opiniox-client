// import { Link, useLoaderData, useNavigate } from "react-router-dom";
// import { BiLogoFacebook, BiLogoTwitter, BiLogoInstagram, BiLogoLinkedin} from 'react-icons/bi';
// import { useContext } from "react";
// import { AuthContext } from "../../providers/AuthProvider";
// import Swal from "sweetalert2";
// import { FaNotesMedical } from "react-icons/fa6";
// import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import { HiOutlineSpeakerphone } from "react-icons/hi";
import { Helmet } from "react-helmet";
import {
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { useLoaderData } from "react-router-dom";
import Tags from "../../components/Tags/Tags";
import { HelmetProvider } from "react-helmet-async";

import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

import {
  FacebookIcon,
  FacebookShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import axios from "axios";
import { AuthContext } from "../../providers/AuthProvider";

const ViewSinglePost = () => {
  const { user } = useContext(AuthContext);
  // console.log(user);
  const userEmail = user?.email;
  // const userName = user.displayName;
  // const userPhoto = user.photoURL;
  // const navigate = useNavigate();

  const singlePost = useLoaderData();
  const {
    _id,
    author,
    authorImage,
    tags,
    time,
    title,
    description,
    upVote,
    downVote,
  } = singlePost || {};
  // console.log(singlePost);

  // const [upVoteCount, setUpVoteCount] = useState(upVote);
  // const [downVoteCount, setDownVoteCount] = useState(downVote);
  const [actualVote, setActualVote] = useState(upVote - downVote);
  // const actualVote = upVote - downVote;

  // console.log(singleAssingment);
  const axiosSecure = useAxiosSecure();

  // Upvote
  const handleUpVote = (id) => {
    console.log(id);
    axiosSecure.patch(`/updateUpVote/${id}`, { upVote: upVote }).then((res) => {
      console.log(typeof parseInt(res.data));
      // setUpVoteCount(parseInt(res.data));
      if (res.data.modifiedCount > 0) {
        setActualVote((prevVote) => prevVote + 1);
        Swal.fire("Great!", "Up Vote Submitted", "success");
      }
    });
  };

  // Downvote
  const handleDownVote = (id) => {
    console.log(id);
    axiosSecure
      .patch(`/updateDownVote/${id}`, { downVote: downVote })
      .then((res) => {
        console.log(typeof parseInt(res.data));
        // setDownVoteCount(parseInt(res.data));
        if (res.data.modifiedCount > 0) {
          setActualVote((prevVote) => prevVote - 1);
          Swal.fire("Great!", "Down Vote Submitted", "success");
        }
      });
  };

  useEffect(() => {
    setActualVote(upVote - downVote);
  }, [upVote, downVote]);

  // Share Link
  const shareUrl = `http://localhost:5000/posts/single/${_id}`;

  const handleComment = async () => {
    const { value: commentPost } = await Swal.fire({
      title: "Comment",
      html: `
        
        
        <h1 class="-mb-3"><strong>Write Here</strong></h1>
        <input type="textarea" id="swal-input2" class="swal2-input">

        
      `,
      focusConfirm: false,
      preConfirm: () => {
        const commentValue = document.getElementById("swal-input2").value;
        return commentValue;
      },
    });
    // console.log(commentPost);

    const commentInfo = {
      commentPost,
      userEmail,
      title,
      postId: _id
    };
    console.log(commentInfo);
    if (!commentInfo?.commentPost.length <= 0) {
      // Swal.fire(JSON.stringify(formValues));
      // console.log(markTheAssignment.pdfLink.length && markTheAssignment.quickNote.length );
      axios
        .post("http://localhost:5000/submitComment", commentInfo)
        .then((res) => {
          console.log(res.data);
          console.log(res.data.insertedId);
          if (res.data.insertedId) {
            Swal.fire("Great!", "Comment Submitted", "success");
            //  navigate('/myAssignment');
          }
        });
    }
    /* return Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Leave something",
    }); */
  };
  return (
    <HelmetProvider>
      <div>
        <Helmet>
          <title>OpinioX | {title}</title>
        </Helmet>
        <div className="bg-black h-[225px] w-full -mt-[100px]">
          <div
            className="hero h-[350px]"
            style={{
              backgroundImage: "url(https://i.ibb.co/k2QKWfj/banner-bg.png)",
              backgroundSize: "contain",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="hero"></div>
            <div className="hero-content text-left text-neutral-content w-10/12">
              <div className="w-full"></div>
            </div>
          </div>
        </div>

        <div>
          <div className="w-10/12 mx-auto py-10">
            {/* <SectionTitle heading={'All The Announcements'}></SectionTitle> */}

            <div className=" w-10/12 mx-auto  justify-center items-center bg-white shadow-xl rounded-md p-6 ">
              <div className="p-4">
                <div className="flex items-center gap-5">
                  <img src={authorImage} className=" w-14 h-14 rounded-full" />
                  <h6 className="font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-cyan-500 uppercase">
                    {author}
                  </h6>
                </div>

                <div className="flex justify-between items-center gap-5">
                  <div className="flex flex-col justify-center items-center">
                    <button onClick={() => handleUpVote(_id)}>
                      <IoIosArrowDropupCircle className="text-5xl text-gray-500 hover:text-gray-700" />
                    </button>
                    <p className="text-2xl font-bold">{actualVote}</p>
                    <button onClick={() => handleDownVote(_id)}>
                      <IoIosArrowDropdownCircle className="text-5xl text-gray-500 hover:text-gray-700" />
                    </button>
                  </div>

                  <div className="">
                    <div className="flex flex-col justify-center gap-2">
                      <h4 className="font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                        {title}
                      </h4>
                      <p className="font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                        {description}
                      </p>
                    </div>
                    <div className="flex gap-4 pt-2 pb-4">
                      {/* Tags  */}
                      <div className="flex gap-4 font-semibold">
                        
                        #{tags}
                      </div>
                      {/* Time  */}
                      <div className="flex gap-4">
                        <p>{time}</p>
                      </div>
                    </div>
                    <div className="flex gap-4 items-center justify-start">
                      <button
                        onClick={handleComment}
                        className="bg-cyan-500 hover:bg-cyan-700 font-semibold text-white px-4 py-2 rounded-full transition-all duration-500"
                      >
                        Comment
                      </button>
                      {/*  <button className="bg-cyan-500 hover:bg-cyan-700 font-semibold text-white px-8 py-2 rounded-full transition-all duration-500">
                      
                        Share
                      </button> */}
                      <div className="pt-2">
                        <FacebookShareButton
                          url={shareUrl}
                          quote={"Share the post to your friend"}
                        >
                          <FacebookIcon
                            className="text-cyan-500 hover:text-cyan-700 font-semibold transition-all duration-500"
                            size={36}
                            round={true}
                          />
                        </FacebookShareButton>
                      </div>
                      <div className="pt-2">
                        <WhatsappShareButton
                          url={shareUrl}
                          quote={"Share the post to your friend"}
                        >
                          <WhatsappIcon
                            className="text-cyan-500 hover:text-cyan-700 font-semibold transition-all duration-500"
                            size={36}
                            round={true}
                          />
                        </WhatsappShareButton>
                      </div>
                      <div className="pt-2">
                        <EmailShareButton
                          url={shareUrl}
                          quote={"Share the post to your friend"}
                        >
                          <EmailIcon
                            className="text-cyan-500 hover:text-cyan-700 font-semibold transition-all duration-500"
                            size={36}
                            round={true}
                          />
                        </EmailShareButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default ViewSinglePost;
