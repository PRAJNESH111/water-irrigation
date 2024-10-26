import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Lottie from "lottie-react";
import waterAnimation from "./assets/water.json";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid email or password: " + error.message);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-200 to-blue-400 overflow-hidden">
      {/* Lottie Animation */}
      <Lottie
        animationData={waterAnimation}
        loop
        autoplay
        style={{ position: "absolute", top: "10%", width: "200px", height: "200px" }}
      />

      {/* Login Card with Neumorphism */}
      <div className="relative w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-xl shadow-neu z-10">
        <h2 className="text-3xl font-bold text-center text-gray-800">Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-inner-neu focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-inner-neu focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-700 shadow-btn-neu"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
