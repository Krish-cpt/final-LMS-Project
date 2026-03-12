import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { data } = await API.post("/auth/signup", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload(); // refresh navbar
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{ width: "400px", backgroundColor: "#C9D6DF" }}>
        <h3 className="text-center mb-3">Signup</h3>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Your Name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              placeholder="Enter Your Email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="off"
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Enter Your Password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈 Hide" : "👁 Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
}

export default Signup;