import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api';
import "bootstrap/dist/css/bootstrap.min.css";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', photo: '' });
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
      return;
    }

    // fetch profile
    API.get('/auth/profile', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      setUser(res.data);
      setFormData({ name: res.data.name, bio: res.data.bio || '', photo: res.data.photo || '' });
      setCourseProgress(res.data.courseProgress || []);
    });

    // fetch enrolled courses
    API.get('/auth/enrolled', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((enrollRes) => {
      const enrolledIds = enrollRes.data.enrolledCourses;
      API.get('/courses').then((coursesRes) => {
        const enrolled = coursesRes.data.filter(c => enrolledIds.includes(c.id));
        setEnrolledCourses(enrolled);
      });
    });
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.put('/auth/profile', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(res.data);
      setEditing(false);
      setMessage('✅ Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('❌ Failed to update profile');
    }
  };

  const getProgress = (courseId) => {
    const p = courseProgress.find(p => p.courseId === courseId);
    return p ? p.progressPercent : 0;
  };

  if (!user) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
      <div className="container">

        {/* Profile Card */}
        <div className="card p-4 mb-4 shadow">
          <div style={{ display: "flex", gap: "20px", alignItems: "center", flexWrap: "wrap" }}>

            {/* Profile Photo */}
            <div style={{ textAlign: "center" }}>
              <img
                src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&size=120&background=0d6efd&color=fff`}
                alt="Profile"
                style={{ width: "120px", height: "120px", borderRadius: "50%", objectFit: "cover", border: "3px solid #0d6efd" }}
              />
            </div>

            {/* Profile Info */}
            <div style={{ flex: 1 }}>
              {!editing ? (
                <>
                  <h2>{user.name}</h2>
                  <p style={{ color: "#666" }}>{user.email}</p>
                  <p>{user.bio || 'No bio added yet'}</p>
                  <p><strong>Enrolled Courses:</strong> {enrolledCourses.length}</p>
                  {message && <div className="alert alert-success">{message}</div>}
                  <button className="btn btn-primary" onClick={() => setEditing(true)}>
                    ✏️ Edit Profile
                  </button>
                </>
              ) : (
                <>
                  <div className="mb-2">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      className="form-control"
                      value={formData.bio}
                      onChange={handleChange}
                      placeholder="Tell us about yourself..."
                      rows={3}
                    />
                  </div>
                  <div className="mb-2">
                    <label>Photo URL</label>
                    <input
                      type="text"
                      name="photo"
                      className="form-control"
                      value={formData.photo}
                      onChange={handleChange}
                      placeholder="Paste image URL here"
                    />
                  </div>
                  <button className="btn btn-success me-2" onClick={handleSave}>💾 Save</button>
                  <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Stats Row */}
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h2 style={{ color: "#0d6efd" }}>{enrolledCourses.length}</h2>
              <p>Enrolled Courses</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h2 style={{ color: "#28a745" }}>
                {courseProgress.filter(p => p.progressPercent === 100).length}
              </h2>
              <p>Completed Courses</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card text-center p-3 shadow-sm">
              <h2 style={{ color: "#ffc107" }}>
                {courseProgress.length > 0
                  ? Math.round(courseProgress.reduce((acc, p) => acc + p.progressPercent, 0) / courseProgress.length)
                  : 0}%
              </h2>
              <p>Average Progress</p>
            </div>
          </div>
        </div>

        {/* Enrolled Courses + Progress */}
        <h3>📚 My Enrolled Courses</h3>
        {enrolledCourses.length === 0 ? (
          <div className="alert alert-info">
            You haven't enrolled in any courses yet. <Link to="/">Browse courses</Link>
          </div>
        ) : (
          <div className="row">
            {enrolledCourses.map((course) => {
              const progress = getProgress(course.id);
              return (
                <div key={course.id} className="col-md-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <img
                      src={course.thumbnail}
                      alt={course.title}
                      style={{ height: "150px", objectFit: "contain", padding: "10px" }}
                    />
                    <div className="card-body">
                      <h5 className="card-title">{course.title}</h5>
                      <p className="card-text" style={{ fontSize: "14px", color: "#666" }}>
                        {course.instructor} • {course.duration}
                      </p>
                      <span className={`badge ${course.level === 'Beginner' ? 'bg-success' : course.level === 'Intermediate' ? 'bg-warning text-dark' : 'bg-danger'} mb-2`}>
                        {course.level}
                      </span>

                      {/* Progress Bar */}
                      <div style={{ marginBottom: "10px" }}>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                          <small>Progress</small>
                          <small><strong>{progress}%</strong></small>
                        </div>
                        <div style={{ backgroundColor: "#e9ecef", borderRadius: "4px", height: "8px" }}>
                          <div style={{
                            backgroundColor: progress === 100 ? "#28a745" : "#0d6efd",
                            width: `${progress}%`,
                            height: "100%",
                            borderRadius: "4px",
                            transition: "width 0.3s"
                          }}></div>
                        </div>
                      </div>

                      <Link
                        to={`/Coursedetail/${course.id}`}
                        className={`btn w-100 ${progress === 100 ? 'btn-success' : 'btn-primary'}`}
                      >
                        {progress === 0 ? '▶ Start Learning' : progress === 100 ? '✅ Completed' : '▶ Continue'}
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}