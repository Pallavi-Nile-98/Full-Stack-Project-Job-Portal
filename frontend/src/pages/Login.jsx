import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearAllUserErrors, login } from "../store/slices/userSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaRegUser } from "react-icons/fa";
import { RiLock2Fill } from "react-icons/ri";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const Login = () => {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, error, isAuthenticated } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Input validation to prevent empty requests
    if (!role || !email || !password) {
      toast.error("Please fill in all fields.");
      return;
    }

    const loginData = { role, email, password };

    dispatch(login(loginData)); // Dispatch login action
  };
  useEffect(() => {
    console.log("Error received:", error); // Debugging log
  
    if (error) {
      toast.error(error || "Something went wrong. Please try again.");
      dispatch(clearAllUserErrors());
    }
  
    if (isAuthenticated) {
      navigateTo("/");
    }
  }, [dispatch, error, isAuthenticated, navigateTo]);
  
  return (
    <section className="authPage">
      <div className="container login-container">
        <div className="header">
          <h3>Login to your account</h3>
        </div>
        <form onSubmit={handleLogin}>
          <div className="inputTag">
            <label>Login As</label>
            <div>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Select Role</option>
                <option value="Employer">Login as an Employer</option>
                <option value="Job Seeker">Login as a Job Seeker</option>
              </select>
              <FaRegUser />
            </div>
          </div>

          <div className="inputTag">
            <label>Email</label>
            <div>
              <input
                type="email"
                placeholder="youremail@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <MdOutlineMailOutline />
            </div>
          </div>

          <div className="inputTag">
            <label>Password</label>
            <div>
              <input
                type="password"
                placeholder="Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <RiLock2Fill />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
          <Link to="/register">Register Now</Link>
        </form>
      </div>
    </section>
  );
};

export default Login;
