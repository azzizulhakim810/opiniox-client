import { useLoaderData } from "react-router-dom";
import ViewAllComments from "../../ViewAllComments/ViewAllComments";

const CommentPage = () => {
  const allComments = useLoaderData();
  // console.log(allComments);
  return (
    <div>
        <div className="w-10/12 mx-auto h-full">
        <div className="">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                
                <th className="text-base">Email</th>
                <th className="text-base text-center">Comment Text</th>
                <th className="text-base">Feedback</th>
                <th className="text-base">Report Button</th>
                
              </tr>
            </thead>
            <tbody>
              {allComments?.map((singleComment) => (
                <ViewAllComments
                  key={singleComment._id}
                  singleComment={singleComment}
                  
                  // handleDelete={handleDelete}
                  // handleAssignmentConfirm={handleAssignmentConfirm}
                ></ViewAllComments>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      </div>
    
  );
};

export default CommentPage;