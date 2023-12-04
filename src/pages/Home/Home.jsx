// import { Link } from "react-router-dom";
// import { DefaultAccordion } from "../../components/Accordion/DefaultAccordion";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { ImPriceTags } from "react-icons/im";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import AllPosts from "../AllPosts/AllPosts";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import {  useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useState } from "react";


const Home = () => {
  const { count } = useLoaderData();
  const [searchText, setSearchText] = useState();
  // console.log(count);
  // const [allPosts, loading] = usePosts();
  const axiosSecure = useAxiosSecure();

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearchText(form.search.value);
/* 
    axiosSecure.post('/posts?=')
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
      
      ) */
    
  };



  return (
    <HelmetProvider>
    <div>
      
      <Helmet>
        <title>OpinioX | HOME</title>
      </Helmet>
     
      {/* Hero Section  */}
      <div
        className="hero h-[100vh] -mt-24"
        style={{
          backgroundImage: "url(https://i.ibb.co/vc8cy2r/shape-1.png)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="hero h-[100vh]"
          style={{
            backgroundImage: "url(cube.svg)",
            backgroundPositionY: "70vh",
            backgroundPositionX: "80vw",
            backgroundSize: "75px",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="hero  h-[100vh]"
            style={{
              backgroundImage: "url(triangle.svg)",
              backgroundPositionY: "25vh",
              backgroundPositionX: "10vw",
              backgroundSize: "100px",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className=" text-center w-11/12">
              <div>
                <h1 className="mb-0 text-base md:text-base tracking-wider font-medium text-white">
                  WELCOME TO OUR
                </h1>
                <p className="mb-10 uppercase text-white lg:text-6xl md:text-5xl text-3xl font-bold">
                  OPINIOx COMMUNITY
                </p>

                {/* Search Field  */}
                <form
                  onSubmit={handleSearch}
                  className="w-10/12 lg:w-6/12 mx-auto"
                >
                  <div className="relative flex items-center ">
                    <input
                      type="text"
                      name="search"
                      className="peer h-10 md:h-14 w-full rounded-full bg-white pl-32 text-sm md:text-lg font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 "
                      placeholder="Search by tags"
                      required
                    />
                    <button
                      className="!absolute flex items-center gap-1 h-10 md:h-14 top-0 z-10 select-none rounded-bl-full rounded-tl-full bg-cyan-500 py-4 px-3 md:px-5 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-cyan-500/20 transition-all hover:shadow-lg hover:shadow-cyan-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none peer-placeholder-shown:pointer-events-none peer-placeholder-shown:bg-blue-gray-500 peer-placeholder-shown:opacity-50 peer-placeholder-shown:shadow-none"
                      type="submit"
                      data-ripple-light="true"
                    >
                      <IoSearchOutline className="text-xl" />
                      search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

         
        </div>
      </div>

      {/* Tag Section */}
      <div className="py-10">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 w-8/12 mx-auto bg-white -mt-24 py-8 shadow-md rounded-md">
          <div className="col-span-1 bg-transparent border-r-[.5px] flex justify-center items-center">
            <ImPriceTags className="text-2xl text-cyan-500" />
            <h1 className="text-xl font-bold mb-2 ml-2 text-gray-800">
              Popular Tags
            </h1>
          </div>

          <div className="col-span-2 bg-transparent border-l-[.5px] flex justify-center items-center gap-3">
            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #coding
            </p>

            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #travel
            </p>
            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #community
            </p>
            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #technology
            </p>
            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #books
            </p>
            <p className="text-base bg-cyan-500 text-white px-[8px] py-[2px] rounded-md font-semibold">
              #food
            </p>
          </div>
        </div>
      </div>

      {/* Announcement Section  */}

      <div
        className="hero"
        style={{
          backgroundImage: "url(https://i.ibb.co/HpK7K7k/bg-shap-one.png)",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-10/12 mx-auto py-10">
          <SectionTitle heading={"All The Announcements"}></SectionTitle>

          <div className="relative grid grid-cols-3 w-10/12 mx-auto  justify-center items-center bg-white shadow-xl rounded-md p-6 ">
            <div className="col-span-1 flex justify-center items-center text-cyan-600">
              <HiOutlineSpeakerphone className="text-8xl" />
            </div>

            <div className="col-span-2 p-4">
              <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-cyan-500 uppercase">
                startups
              </h6>
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                Lyft launching cross-platform service
              </h4>
              <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                Like so many organizations these days, Autodesk is a company in
                transition. It was until recently a traditional boxed software
                company selling licenses. Yet its own business model disruption
                is only part of the story
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* All Posts Section  */}
      <div className="bg-gradient-to-l from-[#F6F5F9] to-[#FCFCFD]">
        {/* <ViewAllPosts></ViewAllPosts> */}
         
        <AllPosts
        searchText={searchText}
        count={count}
        ></AllPosts>
        

      
      </div>
    </div>
    </HelmetProvider>
  );
};

export default Home;
