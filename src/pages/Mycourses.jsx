import { useEffect, useState } from 'react';
import API from '../api';
import { Link } from 'react-router-dom';

const Mycourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseProgress, setCourseProgress] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { setLoading(false); return; }

    API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setCourseProgress(res.data.courseProgress || []));

    API.get('/auth/enrolled', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const ids = res.data.enrolledCourses;
        API.get('/courses').then(coursesRes => {
          setCourses(coursesRes.data.filter(c => ids.includes(c.id)));
          setLoading(false);
        });
      }).catch(() => setLoading(false));
  }, []);

  const getProgress = (courseId) => {
    const p = courseProgress.find(p => p.courseId === courseId);
    return p ? p.progressPercent : 0;
  };

  const token = localStorage.getItem('token');

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        padding: '50px 60px', borderBottom: '1px solid rgba(255,255,255,0.05)',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -60, right: 60, width: 200, height: 200,
          borderRadius: '50%', border: '1px solid rgba(233,69,96,0.1)', pointerEvents: 'none'
        }} />
        <p style={{ color: '#555', fontSize: '13px', fontFamily: "'Space Mono', monospace", letterSpacing: '1px', marginBottom: '10px' }}>YOUR LEARNING</p>
        <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '40px', fontWeight: 800, color: '#fff', marginBottom: '10px' }}>
          My <span style={{ color: '#e94560' }}>Courses</span>
        </h1>
        <p style={{ color: '#555', fontSize: '15px' }}>
          {courses.length > 0 ? `${courses.length} course${courses.length > 1 ? 's' : ''} enrolled` : 'Start your learning journey today'}
        </p>
      </div>

      <div style={{ padding: '40px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#555' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <p>Loading your courses...</p>
          </div>
        ) : !token ? (
          <div style={{
            textAlign: 'center', padding: '80px', background: '#16162a',
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>🔐</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '24px', marginBottom: '12px' }}>Login Required</h3>
            <p style={{ color: '#555', marginBottom: '28px' }}>Please login to view your enrolled courses</p>
            <Link to="/login" style={{
              padding: '14px 32px', borderRadius: '12px', background: '#e94560',
              color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '15px',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)'
            }}>Login Now →</Link>
          </div>
        ) : courses.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '80px', background: '#16162a',
            borderRadius: '20px', border: '1px solid rgba(255,255,255,0.06)'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '20px' }}>📭</div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '24px', marginBottom: '12px' }}>No Courses Yet</h3>
            <p style={{ color: '#555', marginBottom: '28px' }}>Explore our catalog and enroll in your first course</p>
            <Link to="/" style={{
              padding: '14px 32px', borderRadius: '12px', background: '#e94560',
              color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '15px',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)'
            }}>Browse Courses →</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
            {courses.map(course => {
              const progress = getProgress(course.id);
              const lvlColor = { Beginner: '#22c55e', Intermediate: '#f59e0b', Advanced: '#e94560' };
              return (
                <div key={course.id} style={{
                  background: '#16162a', borderRadius: '18px', overflow: 'hidden',
                  border: '1px solid rgba(255,255,255,0.06)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.2)', transition: 'all 0.3s'
                }}
                  onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.borderColor = 'rgba(233,69,96,0.2)'; }}
                  onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: '160px', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    padding: '20px', position: 'relative'
                  }}>
                    <img src={course.thumbnail} alt={course.title}
                      style={{ maxHeight: '120px', maxWidth: '90%', objectFit: 'contain' }} />
                    {progress === 100 && (
                      <div style={{
                        position: 'absolute', top: 12, right: 12, padding: '4px 10px',
                        borderRadius: '20px', background: 'rgba(34,197,94,0.15)',
                        border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e',
                        fontSize: '11px', fontWeight: 700
                      }}>✅ Completed</div>
                    )}
                  </div>

                  {/* Content */}
                  <div style={{ padding: '22px' }}>
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '10px', marginBottom: '10px' }}>
                      <h5 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '16px', fontWeight: 700, margin: 0, lineHeight: 1.3 }}>{course.title}</h5>
                      <span style={{
                        padding: '3px 9px', borderRadius: '20px', fontSize: '11px', fontWeight: 700,
                        color: lvlColor[course.level], background: `${lvlColor[course.level]}15`,
                        border: `1px solid ${lvlColor[course.level]}30`, whiteSpace: 'nowrap', flexShrink: 0
                      }}>{course.level}</span>
                    </div>
                    <p style={{ color: '#555', fontSize: '13px', marginBottom: '4px' }}>👨‍🏫 {course.instructor}</p>
                    <p style={{ color: '#555', fontSize: '13px', marginBottom: '18px' }}>⏱ {course.duration}</p>

                    {/* Progress */}
                    <div style={{ marginBottom: '18px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ color: '#444', fontSize: '12px' }}>Progress</span>
                        <span style={{
                          fontFamily: "'Space Mono', monospace", fontSize: '12px', fontWeight: 700,
                          color: progress === 100 ? '#22c55e' : '#e94560'
                        }}>{progress}%</span>
                      </div>
                      <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%', borderRadius: '3px', width: `${progress}%`,
                          background: progress === 100 ? '#22c55e' : 'linear-gradient(90deg, #e94560, #ff8fa3)',
                          transition: 'width 0.5s ease'
                        }} />
                      </div>
                    </div>

                    <Link to={`/Coursedetail/${course.id}`} style={{
                      display: 'block', textAlign: 'center', padding: '12px', borderRadius: '10px',
                      background: progress === 100 ? 'rgba(34,197,94,0.1)' : 'linear-gradient(135deg, rgba(233,69,96,0.15), rgba(199,54,82,0.15))',
                      color: progress === 100 ? '#22c55e' : '#e94560',
                      border: `1px solid ${progress === 100 ? 'rgba(34,197,94,0.3)' : 'rgba(233,69,96,0.3)'}`,
                      fontWeight: 700, fontSize: '14px', textDecoration: 'none', transition: 'all 0.2s'
                    }}>
                      {progress === 0 ? '▶ Start Learning' : progress === 100 ? '✅ Review Course' : `▶ Continue (${progress}%)`}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycourses;
