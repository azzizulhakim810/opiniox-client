import ViewAllPosts from "../ViewAllPosts/ViewAllPosts";

import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";

const AllPosts = ({allPosts}) => {
 const {loading} = useContext(AuthContext);

  return (
    <div>
<div className="w-8/12 mx-auto pt-5 pb-4 ">

      <div className="flex justify-end">
      
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
      
    </div>
    </div>
    
  );
};

export default AllPosts;