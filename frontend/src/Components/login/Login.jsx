import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import { StoreContext } from "../Context/StoreContext";

const Login = () => {
  const url = "http://localhost:4000/api/user";
  const navigate = useNavigate();
  const {setToken ,setUsername} = useContext(StoreContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
  
    if (email === "admin@gmail.com" && password === "admin123456789") {
      navigate("/admin");
      return;
    }
  
    try {
      const response = await axios.post(`${url}/login`, { email, password });
  
      if (response.data.success) {
        const { token, username } = response.data; // Make sure the key matches the backend
        localStorage.setItem("token", token);
        localStorage.setItem("username", username); // Store username correctly
        setToken(token);
        setUsername(username);
        navigate("/");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#5c7c89]">
      <div className="bg-white text-black p-8 rounded-lg shadow-lg w-90">
        <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <span className="text-xs text-blue-950 underline cursor-pointer">
            <NavLink to="/register">Dont have an account? Click to Register</NavLink>
          </span>
         {<button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 mt-4"
          >
            Login
          </button>}
        </form>
      </div>
    </div>
  );
};

export default Login;
