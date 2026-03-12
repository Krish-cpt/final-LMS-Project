import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Coursecard } from '../components/Coursecard';
import API from '../api';

export default function Coursedetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');

  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    API.get('/courses')
      .then((res) => {
        const all = res.data;
        setAllCourses(all);
        const course = all.find(c => c.id === parseInt(id));
        setSelectedCourse(course);
        setActiveLesson(course?.lessons?.[0]);
      })
      .catch((error) => console.log(error));

    // only check enrollment if logged in
    const token = localStorage.getItem('token');
    if (!token) {
      setEnrolled(false);
      return;
    }

    API.get('/auth/enrolled', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      if (res.data.enrolledCourses.includes(parseInt(id))) {
        setEnrolled(true);
      } else {
        setEnrolled(false);
      }
    }).catch(() => setEnrolled(false));

  }, [id]);

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');

    // not logged in → redirect to login
    if (!token) {
      setEnrollMsg('⚠️ Please login first to enroll!');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }

    try {
      await API.post('/auth/enroll',
        { courseId: parseInt(id) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEnrolled(true);
      setEnrollMsg('🎉 Successfully enrolled! You can now watch the videos.');
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const remainingCourses = allCourses.filter(course => course.id !== parseInt(id));

  if (!selectedCourse) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>

      {/* Course Header */}
      <div style={{ marginBottom: "30px", backgroundColor: "#fff", padding: "20px", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          <img
            src={selectedCourse.thumbnail}
            alt={selectedCourse.title}
            style={{ width: "250px", height: "180px", objectFit: "contain" }}
          />
          <div>
            <h1>{selectedCourse.title}</h1>
            <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
            <p><strong>Duration:</strong> {selectedCourse.duration}</p>
            <p><strong>Level:</strong> {selectedCourse.level}</p>
            <p><strong>Description:</strong> {selectedCourse.description}</p>

            {/* Enroll Message */}
            {enrollMsg && (
              <div className={`alert ${enrolled ? 'alert-success' : 'alert-warning'}`}>
                {enrollMsg}
              </div>
            )}

            {/* Enroll Button */}
            {!isLoggedIn ? (
              // not logged in
              <div>
                <p style={{ color: 'red' }}>
                  ⚠️ You must <a href="/login">login</a> first to enroll!
                </p>
                <button
                  onClick={handleEnroll}
                  className="btn btn-primary mt-2"
                >
                  🎓 Enroll Now
                </button>
              </div>
            ) : !enrolled ? (
              // logged in but not enrolled
              <button
                onClick={handleEnroll}
                className="btn btn-primary mt-2"
              >
                🎓 Enroll Now to Watch Videos
              </button>
            ) : (
              // enrolled
              <button className="btn btn-success mt-2" disabled>
                ✅ Enrolled
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Video Player + Lessons — only if logged in AND enrolled */}
      {isLoggedIn && enrolled && selectedCourse.lessons && selectedCourse.lessons.length > 0 ? (
        <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>

          {/* Video Player */}
          <div style={{ flex: 2 }}>
            <h3>▶ {activeLesson?.title}</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                key={activeLesson?.video}
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={activeLesson?.video}
                title={activeLesson?.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>

          {/* Lessons List */}
          <div style={{ flex: 1, backgroundColor: "#fff", borderRadius: "8px", padding: "15px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
            <h4>📚 Lessons</h4>
            {selectedCourse.lessons.map((lesson, index) => (
              <div
                key={index}
                onClick={() => setActiveLesson(lesson)}
                style={{
                  padding: "10px",
                  marginBottom: "8px",
                  borderRadius: "6px",
                  cursor: "pointer",
                  backgroundColor: activeLesson?.title === lesson.title ? "#0d6efd" : "#f0f0f0",
                  color: activeLesson?.title === lesson.title ? "white" : "black",
                  fontWeight: activeLesson?.title === lesson.title ? "bold" : "normal"
                }}
              >
                {index + 1}. {lesson.title}
              </div>
            ))}
          </div>
        </div>

      ) : (
        /* Locked message */
        <div style={{ textAlign: "center", padding: "40px", backgroundColor: "#fff", borderRadius: "8px", boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: "40px" }}>
          <h2>🔒 Videos Locked</h2>
          <p style={{ color: "#666" }}>
            {!isLoggedIn
              ? 'Please login and enroll to unlock all lessons!'
              : `Enroll in this course to unlock all ${selectedCourse.lessons?.length} lessons!`
            }
          </p>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {selectedCourse.lessons?.map((lesson, index) => (
              <li key={index} style={{ padding: "8px", color: "#999" }}>
                🔒 {index + 1}. {lesson.title}
              </li>
            ))}
          </ul>
          {!isLoggedIn ? (
            <a href="/login" className="btn btn-danger mt-3">🔑 Login to Enroll</a>
          ) : (
            <button onClick={handleEnroll} className="btn btn-primary mt-3">
              🎓 Enroll Now to Unlock
            </button>
          )}
        </div>
      )}

      {/* Other Courses */}
      <h2>Other Courses</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {remainingCourses.map((course) => (
          <Coursecard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}