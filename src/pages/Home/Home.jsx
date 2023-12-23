// import { Link } from "react-router-dom";
// import { DefaultAccordion } from "../../components/Accordion/DefaultAccordion";
import { BsEnvelopeOpenHeart } from "react-icons/bs";
import { IoIosSend } from "react-icons/io";
import { ImPriceTags } from "react-icons/im";
// import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import AllPosts from "../AllPosts/AllPosts";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useEffect, useState } from "react";
import Tags from "../../components/Tags/Tags";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import Marquee from "react-fast-marquee";

const Home = () => {
  const { count } = useLoaderData();
  const [searchText, setSearchText] = useState();
  const [tag, setTag] = useState();
  const [allPosts, setAllPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [newest, setNewest] = useState(true);
  const [allAnnouncements, setAllAnnouncements] = useState();
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get("/allAnnouncements")
      .then((res) => setAllAnnouncements(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    axiosSecure.get("/allTags").then((res) => setTag(res.data));
  }, [axiosSecure]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(
        `/posts?page=${currentPage}&size=${itemsPerPage}&sortSystem=${
          newest ? "newest" : "popular"
        }&searchText=${searchText}`
      );
      setAllPosts(res.data);
    };

    fetchData();
  }, [currentPage, itemsPerPage, newest, axiosSecure, searchText]);

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    setSearchText(form.search.value);
  };

  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value);
    setItemsPerPage(val);
    setCurrentPage(0);
  };

  const numberOfPages = Math.ceil(count / itemsPerPage);

  const pages = [...Array(numberOfPages).keys()];

  const handlePrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(currentPage + 1);
    }
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
              {tag?.map((singleTag) => (
                <Tags key={singleTag._id} singleTag={singleTag.tag}></Tags>
              ))}
            </div>
          </div>
        </div>

        {/* Announcement Section  */}

        {allAnnouncements?.length > 0 && (
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

              {allAnnouncements?.map((announcement) => (
                <div
                  key={announcement._id}
                  className="relative grid grid-cols-3 w-10/12 mx-auto mt-2 justify-center items-center bg-white shadow-xl rounded-md p-2 "
                >
                  <div className="col-span-1 flex justify-center items-center text-cyan-600">
                    <div className="col-span-2 flex items-center">
                      <img
                        src={announcement.authorImage}
                        className=" w-32 h-32 rounded-xl"
                      />
                    </div>
                  </div>

                  <div className="col-span-2 p-4">
                    <h6 className="block mb-4 font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-cyan-500 uppercase">
                      {announcement.author}
                    </h6>
                    <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                      {announcement.title}
                    </h4>
                    <p className="block mb-8 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                      {announcement.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Marquee  */}
        <div className="py-10 bg-cyan-600">
        <Marquee speed={100}>
  <span className="text-5xl font-extrabold text-white">Choose Tag | Search By Tag | Ask Question | Upvote if you like | Downvote if you dislike | </span>
</Marquee>
          </div>

        {/* All Posts Section  */}
        <div
          style={{
            backgroundImage: "url(https://i.ibb.co/BzzxMwL/docbg-shap.png)",
            backgroundPosition: "center",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
          }}
          className="bg-[#F6F6F7] rounded-t-6xl py-20"
        >
          <SectionTitle heading={"All The Posts"}></SectionTitle>

          <div className="w-10/12 text-end pt-5">
            {/* Popularity Sorting Button  */}
            <button
              onClick={() => setNewest(!newest)}
              className="text-base font-bold col-span-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded-md "
            >
              {newest ? "Sort By Popularity" : "Sort By Date"}
            </button>
          </div>

          <AllPosts
            searchText={searchText}
            count={count}
            allPosts={allPosts}
          ></AllPosts>

          {/* Page Amount  */}
          <div className="flex justify-center pb-3 font-bold">
            Current Page : {currentPage}
          </div>

          {/* Pagination  */}
          <div className="flex justify-center pb-10">
            <nav>
              <ul className="flex">
                <li>
                  <Link
                    className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                    aria-label="Previous"
                  >
                    <button
                      onClick={handlePrevPage}
                      className="material-icons text-sm"
                    >
                      <FaArrowLeftLong />
                    </button>
                  </Link>
                </li>
                {pages.map((i, page) => (
                  <li key={i}>
                    <button
                      onClick={() => setCurrentPage(page)}
                      className={
                        currentPage === page
                          ? "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-600 to-cyan-400 p-4 text-sm text-white shadow-md shadow-cyan-500/20 transition duration-150 ease-in-out"
                          : "mx-1 flex h-9 w-9 items-center justify-center rounded-full"
                      }
                    >
                      {page}
                    </button>
                  </li>
                ))}

                <li>
                  <a
                    className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
                    aria-label="Next"
                  >
                    <button
                      onClick={handleNextPage}
                      className="material-icons text-sm"
                    >
                      <FaArrowRightLong />
                    </button>
                  </a>
                </li>

                <select
                  id="difficultyLevel"
                  value={itemsPerPage}
                  onChange={handleItemsPerPage}
                  className="input input-bordered  h-10"
                >
                  <option value="5">5</option>
                  <option value="10">10</option>
                </select>
              </ul>
            </nav>
          </div>
        </div>

        {/* Newsletter section */}
        <div>
          <div
            className="hero h-[200px] md:h-[250px] bg-cyan-600 mt-5"
            style={{
              backgroundImage: "url(https://i.ibb.co/0mMnGqq/newsletter.png)",
            }}
          >
            <div className="hero-overlay bg-opacity-10 "></div>
            <div className=" text-neutral-content w-10/12">
              <div className="grid md:grid-cols-1 grid-cols-1 justify-between pb-5">

                <div className="flex lg:text-4xl md:text-2xl text-2xl justify-center items-center pb-5 mb-5 md:pb-0 text-white gap-3">
                  <BsEnvelopeOpenHeart />
                  <h1 className="font-semibold">Join to Us</h1>
                </div>

                <div className="relative h-10 md:w-6/12 w-10/12 mx-auto">
                  <div className="absolute top-2/4 right-3 grid h-10 w-10 -translate-y-1/4 place-items-center text-4xl text-blue-gray-500 text-cyan-600">
                    <IoIosSend />
                  </div>
                  <input
                    className="peer h-14 w-full rounded-[7px] bg-white border px-3 py-6 !pr-9 font-sans text-base font-normal text-blue-gray-700 outline outline-0 text-cyan-600"
                    placeholder="Enter your email address "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HelmetProvider>
  );
};

export default Home;
