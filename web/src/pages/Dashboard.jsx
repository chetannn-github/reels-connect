import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import api from "../lib/api";
import { setAuth } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if(!token) navigate("/");

        const response = await api.get("/auth/me",token); 
        const userData = response;
        dispatch(setAuth({ user: userData, token }));
      } catch (err) {
        console.error("Failed to fetch user info:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [dispatch]);

  if (loading) {
    return <div>Loading dashboard...</div>;
  }

  return (
    <DashboardCard user={user}/>
  );
}

export default Dashboard;





 function DashboardCard({ user }) {
  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl border border-gray-200">
      {/* Profile Section */}
      <div className="flex items-center space-x-6">
        <img
          src={user.profileURL}
          alt={user.username}
          className="w-28 h-28 rounded-full object-cover border-2 border-indigo-500"
        />
        <div>
          <h2 className="text-3xl font-bold text-gray-800">{user.name}</h2>
          <p className="text-gray-500">@{user.username}</p>
          <div className="flex space-x-6 mt-2">
            <span className="text-gray-700 font-medium">{user.followers} Followers</span>
            <span className="text-gray-700 font-medium">{user.postCount} Posts</span>
          </div>
        </div>
      </div>

      {/* Reels Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Reels</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {user.reels.map((reel) => (
            <div
              key={reel._id}
              className="bg-gray-50 rounded-xl shadow p-3 flex flex-col items-center"
            >
              {reel.mediaURL.endsWith(".mp4") ? (
                <video
                  src={reel.mediaURL}
                  controls
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              ) : (
                <img
                  src={reel.mediaURL}
                  alt={reel.reelTitle || "Reel"}
                  className="w-full h-48 object-cover rounded-lg mb-2"
                />
              )}
              <p className="text-gray-600 text-sm text-center mb-1">
                {reel.message || "No message"}
              </p>
              <p className="text-gray-400 text-xs mb-1">
                {new Date(reel.timestamp).toLocaleString()}
              </p>
              <span
                className={`px-2 py-1 text-xs rounded-full ${
                  reel.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                }`}
              >
                {reel.isActive ? "Active" : "Inactive"}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}