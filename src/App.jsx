// Dashboard.js
import { useEffect, useState } from "react";
import { onValue } from "firebase/database";
import { useNavigate } from "react-router-dom";
import { auth, waterRef } from "../firebaseConfig";
import { signOut, onAuthStateChanged } from "firebase/auth";

function Dashboard() {
  const [waterData, setWaterData] = useState({});
  const navigate = useNavigate();
  const cardColors = ["bg-blue-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-purple-100"];

  // Check if user is logged in
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate("/"); // Redirect to login if not authenticated
      }
    });

    const unsubscribeData = onValue(waterRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setWaterData(data);
      }
    });

    return () => {
      unsubscribeAuth();
      unsubscribeData();
    };
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <button
        onClick={handleLogout}
        className="mb-6 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
      >
        Logout
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 w-full max-w-6xl">
        {Object.keys(waterData).length > 0 ? (
          Object.entries(waterData).map(([fieldName, value], index) => (
            <div
              key={fieldName}
              className={`p-6 rounded-lg shadow-lg ${cardColors[index % cardColors.length]} w-full h-auto`}
            >
              <h2 className="text-3xl font-bold mb-4 text-gray-800">{fieldName}</h2>
              <p className="text-gray-700 text-2xl font-semibold mb-4">{value}</p>
              <p className="text-gray-500 text-sm">
                Last updated: {new Date().toLocaleString()}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 w-full text-center">No water data available</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
