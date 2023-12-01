import PropTypes from "prop-types";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";

const ShowEachAssignment = ({ assignment }) => {
  const {user} = useContext(AuthContext);
  const currentUserEmail = user?.email;

  const { _id, url, title, level, marks, userEmail } = assignment || {};
  // console.log(currentUserEmail, userEmail);
  return (
    <div>
      <div className="relative flex flex-col text-gray-700 bg-white shadow-lg border-x-2 w-full rounded-sm bg-clip-border">
        <div className="relative overflow-hidden text-gray-700 bg-white h-full rounded-sm bg-clip-border">
          <img src={url} className="object-cover rounded w-full h-52 hover:scale-150 transition-all duration-1000"/>
        </div>

        <div className="px-4">
          <p className="block font-sans text-lg antialiased font-medium leading-relaxed text-blue-gray-900 text-center py-4">
            {title.slice(0, 30)}...
          </p>
          <div className="flex items-center justify-between my-2">
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Marks: <span className="font-normal">{marks}</span>
            </p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              Difficulty: <span className="font-normal">{level}</span>
            </p>
          </div>
        </div>


        <div className=" px-4 py-2 pb-6 flex justify-between gap-3 md:gap-5">
          <Link className="w-1/2" to={`/singleAssignment/${_id}`}>
            <button
              className=" w-full select-none rounded-full bg-purple-600 text-white py-3 px-2 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button"
            >
              View Assignment
            </button>
          </Link>

          {
            currentUserEmail === userEmail ? <Link className="w-1/2" to={`/update/${_id}`}>
            <button
              className=" w-full select-none rounded-full bg-purple-600 text-white py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="button" 
            >
              Update Assignment
            </button>
          </Link> : 
          <Link className="w-1/2" >
          <button
            className=" w-full select-none rounded-full bg-purple-600 text-white py-3 px-3 text-center align-middle font-sans text-xs font-bold uppercase text-blue-gray-900 transition-all hover:scale-105 focus:scale-105 focus:opacity-[0.85] active:scale-100 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button" disabled
          >
            Update Assignment
          </button>
        </Link>
          }
           

        </div>
      </div>
    </div>
  );
};

ShowEachAssignment.propTypes = {
  assignment: PropTypes.object,
};

export default ShowEachAssignment;
