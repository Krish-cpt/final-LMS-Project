import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Coursecard } from '../components/Coursecard';
import API from '../Services/api';

export default function Coursedetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [enrolled, setEnrolled] = useState(false);
  const [enrollMsg, setEnrollMsg] = useState('');
  const [completedLessons, setCompletedLessons] = useState([]);
  const isLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    API.get('/courses').then(res => {
      const all = res.data;
      setAllCourses(all);
      const course = all.find(c => c.id === parseInt(id));
      setSelectedCourse(course);
      setActiveLesson(course?.lessons?.[0]);
    });

    const token = localStorage.getItem('token');
    if (!token) { setEnrolled(false); return; }

    API.get('/auth/enrolled', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setEnrolled(res.data.enrolledCourses.includes(parseInt(id))))
      .catch(() => setEnrolled(false));

    API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        const progress = res.data.courseProgress?.find(p => p.courseId === parseInt(id));
        if (progress) setCompletedLessons(progress.completedLessons || []);
      });
  }, [id]);

  const handleEnroll = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setEnrollMsg('⚠️ Please login first to enroll!');
      setTimeout(() => navigate('/login'), 2000);
      return;
    }
    try {
      await API.post('/auth/enroll', { courseId: parseInt(id) }, { headers: { Authorization: `Bearer ${token}` } });
      setEnrolled(true);
      setEnrollMsg('🎉 Successfully enrolled!');
    } catch (err) {
      setEnrollMsg(err.response?.data?.message || 'Enrollment failed');
    }
  };

  const markLessonComplete = async (lesson) => {
    const token = localStorage.getItem('token');
    if (!token || !enrolled) return;
    try {
      await API.post('/auth/progress', {
        courseId: parseInt(id), lessonTitle: lesson.title,
        totalLessons: selectedCourse.lessons.length
      }, { headers: { Authorization: `Bearer ${token}` } });
      if (!completedLessons.includes(lesson.title)) {
        setCompletedLessons(prev => [...prev, lesson.title]);
      }
    } catch (err) { console.log(err); }
  };

  const remainingCourses = allCourses.filter(c => c.id !== parseInt(id)).slice(0, 4);
  const levelConfig = {
    Beginner: { color: '#22c55e', icon: '🌱' },
    Intermediate: { color: '#f59e0b', icon: '⚡' },
    Advanced: { color: '#e94560', icon: '🔥' }
  };
  const lvl = levelConfig[selectedCourse?.level] || levelConfig['Beginner'];

  if (!selectedCourse) return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#555', fontFamily: "'Space Mono', monospace" }}>Loading course...</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Course Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        padding: '50px 60px', borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
          {/* Thumbnail */}
          <div style={{
            width: 220, height: 160, borderRadius: '16px', flexShrink: 0,
            background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
          }}>
            <img src={selectedCourse.thumbnail} alt={selectedCourse.title}
              style={{ maxWidth: '100%', maxHeight: '120px', objectFit: 'contain' }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: 700,
                color: lvl.color, background: `${lvl.color}15`, border: `1px solid ${lvl.color}30`,
                fontFamily: "'Space Mono', monospace"
              }}>{lvl.icon} {selectedCourse.level}</span>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#555',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'
              }}>⏱ {selectedCourse.duration}</span>
              <span style={{
                padding: '4px 12px', borderRadius: '20px', fontSize: '12px', color: '#555',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)'
              }}>📚 {selectedCourse.lessons?.length} lessons</span>
            </div>

            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '34px', fontWeight: 800, color: '#fff', marginBottom: '12px', lineHeight: 1.2 }}>
              {selectedCourse.title}
            </h1>
            <p style={{ color: '#888', fontSize: '15px', marginBottom: '8px' }}>👨‍🏫 {selectedCourse.instructor}</p>
            <p style={{ color: '#666', fontSize: '14px', lineHeight: 1.7, marginBottom: '24px', maxWidth: '600px' }}>
              {selectedCourse.description}
            </p>

            {enrollMsg && (
              <div style={{
                padding: '12px 18px', borderRadius: '10px', marginBottom: '16px', fontSize: '14px',
                background: enrolled ? 'rgba(34,197,94,0.1)' : 'rgba(233,69,96,0.1)',
                border: `1px solid ${enrolled ? 'rgba(34,197,94,0.3)' : 'rgba(233,69,96,0.3)'}`,
                color: enrolled ? '#22c55e' : '#e94560'
              }}>{enrollMsg}</div>
            )}

            {!isLoggedIn ? (
              <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                <button onClick={handleEnroll} style={{
                  padding: '14px 28px', borderRadius: '12px', border: 'none',
                  background: 'linear-gradient(135deg, #e94560, #c73652)', color: '#fff',
                  fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(233,69,96,0.4)'
                }}>🎓 Enroll Now</button>
                <Link to="/login" style={{ color: '#666', fontSize: '14px', textDecoration: 'none' }}>Login to enroll →</Link>
              </div>
            ) : !enrolled ? (
              <button onClick={handleEnroll} style={{
                padding: '14px 28px', borderRadius: '12px', border: 'none',
                background: 'linear-gradient(135deg, #e94560, #c73652)', color: '#fff',
                fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                boxShadow: '0 4px 20px rgba(233,69,96,0.4)'
              }}>🎓 Enroll to Watch Videos</button>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '8px',
                padding: '12px 20px', borderRadius: '12px',
                background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e',
                fontWeight: 600, fontSize: '15px'
              }}>✅ Enrolled</div>
            )}
          </div>
        </div>
      </div>

      <div style={{ padding: '40px 60px' }}>

        {/* Video Player + Lessons */}
        {isLoggedIn && enrolled && selectedCourse.lessons?.length > 0 ? (
          <div style={{ display: 'flex', gap: '24px', marginBottom: '60px', flexWrap: 'wrap' }}>
            {/* Video */}
            <div style={{ flex: 2, minWidth: '300px' }}>
              <div style={{
                background: '#16162a', borderRadius: '16px', overflow: 'hidden',
                border: '1px solid rgba(255,255,255,0.06)', marginBottom: '16px'
              }}>
                <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, background: '#000' }}>
                  <iframe
                    key={activeLesson?.video}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                    src={activeLesson?.video} title={activeLesson?.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div style={{ padding: '20px' }}>
                  <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '20px', fontWeight: 700 }}>
                    ▶ {activeLesson?.title}
                  </h3>
                  {completedLessons.includes(activeLesson?.title) && (
                    <span style={{ color: '#22c55e', fontSize: '13px', marginTop: '6px', display: 'block' }}>✅ Completed</span>
                  )}
                </div>
              </div>
            </div>

            {/* Lessons List */}
            <div style={{
              flex: 1, minWidth: '260px', background: '#16162a',
              borderRadius: '16px', border: '1px solid rgba(255,255,255,0.06)',
              overflow: 'hidden', height: 'fit-content'
            }}>
              <div style={{ padding: '20px 20px 16px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <h4 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '17px', fontWeight: 700, margin: 0 }}>📚 Course Lessons</h4>
                <p style={{ color: '#555', fontSize: '12px', marginTop: '4px', fontFamily: "'Space Mono', monospace" }}>
                  {completedLessons.length}/{selectedCourse.lessons.length} completed
                </p>
              </div>
              <div style={{ padding: '12px' }}>
                {selectedCourse.lessons.map((lesson, index) => {
                  const isActive = activeLesson?.title === lesson.title;
                  const isDone = completedLessons.includes(lesson.title);
                  return (
                    <div key={index}
                      onClick={() => { setActiveLesson(lesson); markLessonComplete(lesson); }}
                      style={{
                        padding: '12px 14px', borderRadius: '10px', cursor: 'pointer',
                        marginBottom: '6px', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '12px',
                        background: isActive ? 'rgba(233,69,96,0.15)' : 'transparent',
                        border: `1px solid ${isActive ? 'rgba(233,69,96,0.3)' : 'transparent'}`
                      }}>
                      <div style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px',
                        background: isDone ? 'rgba(34,197,94,0.15)' : isActive ? 'rgba(233,69,96,0.2)' : 'rgba(255,255,255,0.06)',
                        color: isDone ? '#22c55e' : isActive ? '#e94560' : '#555',
                        border: `1px solid ${isDone ? 'rgba(34,197,94,0.3)' : isActive ? 'rgba(233,69,96,0.3)' : 'rgba(255,255,255,0.08)'}`
                      }}>
                        {isDone ? '✓' : index + 1}
                      </div>
                      <span style={{
                        fontSize: '14px', fontWeight: isActive ? 600 : 400,
                        color: isActive ? '#fff' : isDone ? '#888' : '#666', flex: 1
                      }}>{lesson.title}</span>
                      {isActive && <span style={{ color: '#e94560', fontSize: '10px' }}>▶</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          /* Locked State */
          <div style={{
            background: '#16162a', borderRadius: '20px',
            border: '1px solid rgba(255,255,255,0.06)', marginBottom: '60px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '50px', textAlign: 'center' }}>
              <div style={{ fontSize: '56px', marginBottom: '16px' }}>🔒</div>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '28px', fontWeight: 800, marginBottom: '10px' }}>
                Videos Locked
              </h2>
              <p style={{ color: '#555', fontSize: '15px', marginBottom: '32px' }}>
                {!isLoggedIn ? 'Login and enroll to unlock all lessons' : `Enroll to unlock all ${selectedCourse.lessons?.length} lessons`}
              </p>

              {/* Locked lesson list */}
              <div style={{ maxWidth: '400px', margin: '0 auto 32px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedCourse.lessons?.map((lesson, index) => (
                  <div key={index} style={{
                    padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '12px',
                    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)'
                  }}>
                    <span style={{
                      width: 26, height: 26, borderRadius: '50%', background: 'rgba(255,255,255,0.06)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '11px', color: '#444', flexShrink: 0
                    }}>{index + 1}</span>
                    <span style={{ color: '#444', fontSize: '14px' }}>🔒 {lesson.title}</span>
                  </div>
                ))}
              </div>

              {!isLoggedIn ? (
                <Link to="/login" style={{
                  padding: '14px 32px', borderRadius: '12px', background: '#e94560',
                  color: '#fff', fontWeight: 700, textDecoration: 'none', fontSize: '15px',
                  boxShadow: '0 4px 20px rgba(233,69,96,0.4)', display: 'inline-block'
                }}>🔑 Login to Enroll</Link>
              ) : (
                <button onClick={handleEnroll} style={{
                  padding: '14px 32px', borderRadius: '12px', border: 'none',
                  background: 'linear-gradient(135deg, #e94560, #c73652)', color: '#fff',
                  fontWeight: 700, fontSize: '15px', cursor: 'pointer',
                  boxShadow: '0 4px 20px rgba(233,69,96,0.4)'
                }}>🎓 Enroll Now to Unlock</button>
              )}
            </div>
          </div>
        )}

        {/* More Courses */}
        {remainingCourses.length > 0 && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
              <h2 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '26px', fontWeight: 800 }}>
                More <span style={{ color: '#e94560' }}>Courses</span>
              </h2>
              <Link to="/" style={{ color: '#e94560', fontSize: '14px', fontWeight: 600, textDecoration: 'none' }}>View all →</Link>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
              {remainingCourses.map(course => <Coursecard key={course.id} course={course} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
