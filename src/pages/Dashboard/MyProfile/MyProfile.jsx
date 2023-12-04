import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';

// Dummy data for demonstration purposes
const userData = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  image: 'https://example.com/user-image.jpg',
  bronzeBadge: true, // Set to true if user has the Bronze badge
  goldBadge: false, // Set to true if user has the Gold badge
};

const MyProfile = () => {
  const {user} = useContext(AuthContext);
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);

  // Fetch user's recent posts (dummy data for demonstration)
  useEffect(() => {
    // Replace with actual API call to fetch user's recent posts
    const fetchRecentPosts = async () => {
      // Mock data for demonstration
      const response = await fetch('https://jsonplaceholder.typicode.com/posts?userId=1');
      const data = await response.json();
      setRecentPosts(data.slice(0, 3)); // Displaying only 3 most recent posts
    };

    fetchRecentPosts();
  }, []);

  return (
    <div className="p-4">
      {/* User Info Section */}
      <div className="flex items-center mb-4">
        <img src={userData.image} alt="User" className="w-16 h-16 rounded-full mr-4" />
        <div>
          <h2 className="text-xl font-semibold">{userData.name}</h2>
          <p className="text-gray-600">{userData.email}</p>
        </div>
      </div>

      {/* Badges Section */}
      <div className="mb-4">
        {userData.bronzeBadge && (
          <div className="bg-yellow-300 p-2 rounded-md mb-2">
            <p className="text-yellow-800 font-semibold">Bronze Badge</p>
            <p className="text-sm text-yellow-700">Awarded for registering on the site</p>
          </div>
        )}
        {userData.goldBadge && (
          <div className="bg-yellow-500 p-2 rounded-md mb-2">
            <p className="text-yellow-900 font-semibold">Gold Badge</p>
            <p className="text-sm text-yellow-800">Awarded for becoming a member</p>
          </div>
        )}
      </div>

      {/* Recent Posts Section */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Posts</h3>
        {recentPosts.map(post => (
          <div key={post.id} className="border p-4 mb-4 rounded-md">
            <h4 className="text-lg font-semibold">{post.title}</h4>
            <p className="text-gray-600">{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyProfile;
