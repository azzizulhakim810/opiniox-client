import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
import useAxiosSecure from "./useAxiosSecure";
// import { useEffect, useState } from "react";

const usePosts = () => {

  const axiosSecure = useAxiosSecure();
  const {data : posts = []} = useQuery({
    queryKey: ['posts'],
    queryFn: async() => {
      // const res = await axiosSecure.get('/posts');
      // return res.data;


      
    }
  })

  return [posts]



/*   const [allPosts, setAllPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://opiniox-server.vercel.app/posts')
    .then(res => {
      setAllPosts(res.data);
      setLoading(false);
    })
    }),
   [];
  return [allPosts, loading]; */
}

export default usePosts;