import { useLoaderData } from "react-router-dom";
import ShowEachAssignment from "../ShowEachAssignment/ShowEachAssignment";
import { useEffect, useState } from "react";
import ShowEachFilteredAssignment from "../ShowEachAssignment/ShowEachFilteredAssignment";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";


const AllAssignments = () => {
 

  const {count} = useLoaderData(); 
  console.log(count);
const [selectedLevel, setSelectedLevel] = useState('all');
const [assignments, setAssignments] = useState([]);
const [allAssignments, setAllAssignments] = useState([]);
const [currentPage, setCurrentPage] = useState(0);
const [itemsPerPage, setItemsPerPage] = useState(3);



  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`https://elearn-platform-server.vercel.app/assignment?page=${currentPage}&size=${itemsPerPage}`);
      const data = await response.json();
      setAllAssignments(data);
      setAssignments(data);
    };

    fetchData();
  }, [currentPage, itemsPerPage]);
  // console.log(selectedLevel,assignments);


  const handleItemsPerPage = (e) => {
    const val = parseInt(e.target.value)
    setItemsPerPage(val);
    setCurrentPage(0);
  }
  const numberOfPages = Math.ceil(count/itemsPerPage);
  console.log(numberOfPages);

  const pages = [...Array(numberOfPages).keys()] ;
  // console.log(pages);

  // Filter assignments based on the selected level
  const filteredAssignments = selectedLevel === 'all'
    ? assignments
    : assignments.filter(assignment => assignment.level === selectedLevel);
    // console.log(filteredAssignments.length);

    const handlePrevPage = () => {
      if(currentPage > 0) {
        setCurrentPage(currentPage -1);
      }
    }
    const handleNextPage = () => {
      if(currentPage < pages.length - 1) {
        setCurrentPage(currentPage +1);
      }
    }

  return (
    <div>
       <div
        className="hero h-[98px] -mt-24"
        style={{
          backgroundImage:
            "url(https://i.ibb.co/dfLxV9s/home-bg-one-course-1.jpg)",
        }}
      ></div>
      <div className="w-10/12 mx-auto pt-5 pb-3 grid lg:grid-cols-6 grid-cols-3 gap-2 align-middle items-center">
      <h1 className="text-base font-bold col-span-1">Filter By Diffculty Level</h1>
      <label className="input-group col-span-1">
                  <select id="difficultyLevel" value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)} className="input input-bordered  h-10">
                    <option value="all">--Choose an option--</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </label>
      </div>
      <div className="w-10/12 mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-5 pb-20">
        

        {
          selectedLevel === 'all' ? allAssignments?.map(assignment => <ShowEachAssignment key={assignment._id} assignment={assignment}></ShowEachAssignment>)
          : 
          filteredAssignments?.map(eachOne => <ShowEachFilteredAssignment key={eachOne._id} eachOne={eachOne}></ShowEachFilteredAssignment>)
        }

        
      </div>
      <div className="flex justify-center pb-3 font-bold">Current Page : {currentPage}</div>
      <div className="flex justify-center pb-10">
        
      <nav>
  <ul className="flex">
  <li>
        <a
          className="mx-1 flex h-9 w-9 items-center justify-center rounded-full border border-blue-gray-100 bg-transparent p-0 text-sm text-blue-gray-500 transition duration-150 ease-in-out hover:bg-light-300"
          
          aria-label="Previous"
        >
          <button onClick={handlePrevPage} className="material-icons text-sm"><FaArrowLeftLong /></button>
        </a>
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
                    <option value="3">3</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                  </select>
  </ul>
  
</nav>
      </div>
    </div>
  );
};

export default AllAssignments;