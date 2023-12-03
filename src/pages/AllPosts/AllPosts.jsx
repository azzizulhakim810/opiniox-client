import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

import { Link } from "react-router-dom";
import ViewAllPosts from "../ViewAllPosts/ViewAllPosts";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const AllPosts = ({count}) => {
 const {loading} = useContext(AuthContext);
const [allPosts, setAllPosts] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [itemsPerPage, setItemsPerPage] = useState(5);
const [newest, setNewest] = useState(true);

const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      const res = await axiosSecure.get(`/posts?page=${currentPage}&size=${itemsPerPage}&sortSystem=${newest ? 'newest' : 'popular'}`)
      setAllPosts(res.data);
    };

  fetchData();
  }, [currentPage, itemsPerPage, newest, axiosSecure]);
  // console.log(selectedLevel,assignments);


  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value)
    setItemsPerPage(val);
    setCurrentPage(0);
  }


  const numberOfPages = Math.ceil(count/itemsPerPage);


  const pages = [...Array(numberOfPages).keys()] ;

  

    const handlePrevPage = () => {
      if(currentPage > 0) {
        setCurrentPage(currentPage - 1);
      }
    }
    const handleNextPage = () => {
      if(currentPage < pages.length - 1) {
        setCurrentPage(currentPage +1);
      }
    }

  return (
    <div className="hero"
    style={{
      backgroundImage: "url(https://i.ibb.co/BzzxMwL/docbg-shap.png)",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    }}
    >
<div className="w-8/12 mx-auto pt-16 pb-4 ">
       <SectionTitle heading={"All The Posts"}></SectionTitle>
      <div className="flex justify-end">

        {/* Popularity Sorting Button  */}
      <button onClick={() => setNewest(!newest)} 
      className="text-base font-bold col-span-1 bg-cyan-500 hover:bg-cyan-600 text-white py-2 px-3 rounded-md ">
        { newest ? 'Sort By Popularity' : 'Sort By Date'}</button>
      
      </div>
      <div 
      className=" grid lg:grid-cols-1 md:grid-cols-1 grid-cols-1 gap-6 pt-5 pb-20">
       

        {
          loading && <div className="text-cyan-500 translate-x-[50%] translate-y-[50%]">
            <span className="loading loading-infinity loading-lg"></span>
          </div>
        }


         {/* ViewAllPosts */}
         
          {allPosts?.map(post => <ViewAllPosts key={post._id} post={post}></ViewAllPosts>)}

        
      </div>
      <div className="flex justify-center pb-3 font-bold">Current Page : {currentPage}</div>
      {/* <div className="flex justify-center pb-3 font-bold">Total Order : {posts.length}</div> */}
      <div className="flex justify-center pb-10">
        
      <nav>
  <ul className="flex">
  <li>
        <Link
          className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          
          aria-label="Previous"
        >
          <button onClick={handlePrevPage} className="material-icons text-sm"><FaArrowLeftLong /></button>
        </Link>
      </li>
    {
      pages.map((i, page) => 
      <li key={i}>
        <button onClick={() => setCurrentPage(page)}
          className={currentPage === page ? "mx-1 flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-tr from-purple-600 to-purple-400 p-4 text-sm text-white shadow-md shadow-purple-500/20 transition duration-150 ease-in-out" : 
          "mx-1 flex h-9 w-9 items-center justify-center rounded-full"
        }
          
        >
          {page}
        </button>
      </li> 
      )
    }


    <li>
      <a
        className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
        
        aria-label="Next"
      >
        <button onClick={handleNextPage} className="material-icons text-sm"><FaArrowRightLong /></button>
      </a>
    </li> 

    <select id="difficultyLevel" value={itemsPerPage} onChange={handleItemsPerPage}
           className="input input-bordered  h-10">
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
  </ul>
  
</nav>
      </div>
    </div>
    </div>
    
  );
};

export default AllPosts;