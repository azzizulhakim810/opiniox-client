import PropTypes from "prop-types";
import Tags from "../../components/Tags/Tags";
import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../providers/AuthProvider";

const ViewAllPosts = ({post}) => {
  // const {user} = useContext(AuthContext);
  // const currentUserEmail = user?.email;

  const {_id, authorImage, commentsCount, tags, time, title, upVote, downVote } = post || {};
  // console.log(currentUserEmail, userEmail);
  // console.log(post);
  return (
    
    <div
    style={{
      backgroundImage: "url(https://i.ibb.co/HpK7K7k/bg-shap-one.png)",
      backgroundPosition: "top",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat"
    }}
    className="relative grid grid-cols-12 gap-2 bg-white shadow-lg w-full rounded-lg px-6 py-4">
        
        <div className="col-span-2 flex items-center">
          <img src={authorImage} className=" w-24 h-24 rounded-full"/>
        </div>

        
        <div className="col-span-10 h-24 flex flex-col gap-4 items-start justify-center">
        <Link to={`/singlePost/${_id}`}>
          <p className="text-2xl antialiased font-medium hover:text-cyan-500">
            {title}
          </p>
          </Link>
          
          <div className="flex items-center justify-left gap-5">
            <div className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
            <span className="font-semibold flex justify-left gap-2">
              
            <div className="flex ">
      #{tags}
    </div>
            </span>
            </div>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              <span className="font-normal">{commentsCount}</span> Comments
            </p>
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              <span className="font-normal">{upVote - downVote}</span> Votes
            </p>
            
            <p className="block font-sans text-base antialiased font-medium leading-relaxed text-blue-gray-900">
              <span className="font-normal">{time}</span>
            </p>
          </div>
          
          

        </div>
        

      </div>
    
  );
};

ViewAllPosts.propTypes = {
  assignment: PropTypes.object,
};

export default ViewAllPosts;
