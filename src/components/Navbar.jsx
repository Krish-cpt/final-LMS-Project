import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img src="/lms.jpg" alt="logo" style={{ width: 60, height: 50 }} />
          <a className="navbar-brand" href="#">Course Management</a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/Mycourses">MyCourses</Link>
              </li>

              {/* Show these only when NOT logged in */}
              {!user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="/signup">Signup</Link>
                  </li>
                </>
              )}

              {/* Show these only when logged in */}
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link" to="/dashboard">Dashboard</Link>
                  </li>
                </>
              )}
            </ul>

            {/* Right side — profile + logout */}
            {user && (
              <div className="d-flex align-items-center gap-3">
                <img
                  src={`https://ui-avatars.com/api/?name=${user.name}&size=35&background=0d6efd&color=fff`}
                  alt="avatar"
                  style={{ borderRadius: "50%", width: 35, height: 35 }}
                />
                <span className="fw-bold">Hi, {user.name}!</span>
                <button
                  className="btn btn-outline-danger btn-sm"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}