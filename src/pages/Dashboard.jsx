import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from "../Services/api";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [courseProgress, setCourseProgress] = useState([]);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', bio: '', photo: '' });
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('courses');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) { navigate('/login'); return; }

    API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUser(res.data);
        setFormData({ name: res.data.name, bio: res.data.bio || '', photo: res.data.photo || '' });
        setCourseProgress(res.data.courseProgress || []);
      });

    API.get('/auth/enrolled', { headers: { Authorization: `Bearer ${token}` } })
      .then(enrollRes => {
        const ids = enrollRes.data.enrolledCourses;
        API.get('/courses').then(res => {
          setEnrolledCourses(res.data.filter(c => ids.includes(c.id)));
        });
      });
  }, [navigate]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await API.put('/auth/profile', formData, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data);
      setEditing(false);
      setMessage('✅ Profile updated!');
      setTimeout(() => setMessage(''), 3000);
    } catch { setMessage('❌ Update failed'); }
  };

  const getProgress = (courseId) => {
    const p = courseProgress.find(p => p.courseId === courseId);
    return p ? p.progressPercent : 0;
  };

  const completed = courseProgress.filter(p => p.progressPercent === 100).length;
  const avgProgress = courseProgress.length > 0
    ? Math.round(courseProgress.reduce((a, p) => a + p.progressPercent, 0) / courseProgress.length)
    : 0;

  if (!user) return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#e94560', fontFamily: "'Space Mono', monospace", fontSize: '14px' }}>Loading dashboard...</div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0f0f1a', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Header Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        padding: '40px 60px', position: 'relative', overflow: 'hidden',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <div style={{
          position: 'absolute', top: -80, right: -80, width: 300, height: 300,
          borderRadius: '50%', background: 'radial-gradient(circle, rgba(233,69,96,0.1) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px', position: 'relative', zIndex: 1 }}>
          <div style={{ position: 'relative' }}>
            <img
              src={user.photo || `https://ui-avatars.com/api/?name=${user.name}&size=90&background=e94560&color=fff&bold=true`}
              alt="Profile"
              style={{ width: 90, height: 90, borderRadius: '50%', border: '3px solid #e94560', objectFit: 'cover' }}
            />
            <div style={{
              position: 'absolute', bottom: 2, right: 2, width: 18, height: 18,
              borderRadius: '50%', background: '#22c55e', border: '2px solid #1a1a2e'
            }} />
          </div>
          <div>
            <p style={{ color: '#666', fontSize: '13px', fontFamily: "'Space Mono', monospace", marginBottom: '6px', letterSpacing: '1px' }}>DASHBOARD</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, color: '#fff', marginBottom: '4px' }}>
              {user.name}
            </h1>
            <p style={{ color: '#666', fontSize: '14px' }}>{user.email}</p>
            {user.bio && <p style={{ color: '#888', fontSize: '14px', marginTop: '6px' }}>{user.bio}</p>}
          </div>
          <button onClick={() => setEditing(!editing)} style={{
            marginLeft: 'auto', padding: '10px 20px', borderRadius: '10px', fontSize: '14px',
            fontWeight: 600, color: '#e94560', background: 'rgba(233,69,96,0.1)',
            border: '1px solid rgba(233,69,96,0.3)', cursor: 'pointer', transition: 'all 0.2s'
          }}>✏️ Edit Profile</button>
        </div>
      </div>

      <div style={{ padding: '40px 60px' }}>

        {/* Edit Form */}
        {editing && (
          <div style={{
            background: '#16162a', borderRadius: '16px', padding: '28px',
            border: '1px solid rgba(255,255,255,0.06)', marginBottom: '32px'
          }}>
            <h3 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', marginBottom: '20px', fontSize: '18px' }}>Edit Profile</h3>
            {message && <div style={{ padding: '12px 16px', borderRadius: '8px', marginBottom: '16px', background: 'rgba(34,197,94,0.1)', border: '1px solid rgba(34,197,94,0.3)', color: '#22c55e', fontSize: '14px' }}>{message}</div>}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              {[{ label: 'Name', name: 'name', type: 'text', placeholder: 'Your name' },
                { label: 'Photo URL', name: 'photo', type: 'text', placeholder: 'Paste image URL' }].map(field => (
                <div key={field.name}>
                  <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.5px' }}>{field.label.toUpperCase()}</label>
                  <input type={field.type} name={field.name} placeholder={field.placeholder}
                    value={formData[field.name]}
                    onChange={e => setFormData({ ...formData, [e.target.name]: e.target.value })}
                    style={{
                      width: '100%', padding: '12px 16px', borderRadius: '10px',
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                      color: '#fff', fontSize: '14px', outline: 'none'
                    }} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: '16px' }}>
              <label style={{ display: 'block', color: '#666', fontSize: '12px', marginBottom: '8px', letterSpacing: '0.5px' }}>BIO</label>
              <textarea name="bio" placeholder="Tell us about yourself..." value={formData.bio}
                onChange={e => setFormData({ ...formData, bio: e.target.value })}
                rows={3} style={{
                  width: '100%', padding: '12px 16px', borderRadius: '10px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical'
                }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button onClick={handleSave} style={{
                padding: '12px 24px', borderRadius: '10px', border: 'none',
                background: 'linear-gradient(135deg, #e94560, #c73652)', color: '#fff',
                fontWeight: 600, fontSize: '14px', cursor: 'pointer'
              }}>💾 Save Changes</button>
              <button onClick={() => setEditing(false)} style={{
                padding: '12px 24px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)',
                background: 'transparent', color: '#888', fontWeight: 600, fontSize: '14px', cursor: 'pointer'
              }}>Cancel</button>
            </div>
          </div>
        )}

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '40px' }}>
          {[
            { value: enrolledCourses.length, label: 'Enrolled Courses', icon: '📚', color: '#e94560' },
            { value: completed, label: 'Completed', icon: '🏆', color: '#22c55e' },
            { value: `${avgProgress}%`, label: 'Avg Progress', icon: '📈', color: '#f59e0b' }
          ].map((stat, i) => (
            <div key={i} style={{
              background: '#16162a', borderRadius: '16px', padding: '28px',
              border: '1px solid rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', gap: '20px'
            }}>
              <div style={{
                width: 56, height: 56, borderRadius: '14px', fontSize: '24px',
                background: `${stat.color}15`, border: `1px solid ${stat.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0
              }}>{stat.icon}</div>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontSize: '32px', fontWeight: 800, color: stat.color }}>{stat.value}</div>
                <div style={{ color: '#555', fontSize: '13px', marginTop: '2px' }}>{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '4px', marginBottom: '28px', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0' }}>
          {['courses', 'progress'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '12px 24px', background: 'none', border: 'none', cursor: 'pointer',
              color: activeTab === tab ? '#e94560' : '#555', fontWeight: 600, fontSize: '14px',
              borderBottom: activeTab === tab ? '2px solid #e94560' : '2px solid transparent',
              textTransform: 'capitalize', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif"
            }}>{tab === 'courses' ? '📚 My Courses' : '📈 Progress'}</button>
          ))}
        </div>

        {/* Tab Content */}
        {activeTab === 'courses' && (
          enrolledCourses.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
              <p style={{ fontSize: '16px', marginBottom: '16px' }}>No enrolled courses yet</p>
              <Link to="/" style={{
                padding: '12px 28px', borderRadius: '10px', background: '#e94560',
                color: '#fff', fontWeight: 600, textDecoration: 'none', fontSize: '14px'
              }}>Browse Courses</Link>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {enrolledCourses.map(course => {
                const progress = getProgress(course.id);
                return (
                  <div key={course.id} style={{
                    background: '#16162a', borderRadius: '16px', overflow: 'hidden',
                    border: '1px solid rgba(255,255,255,0.06)', transition: 'all 0.3s'
                  }}>
                    <div style={{
                      height: '130px', background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
                    }}>
                      <img src={course.thumbnail} alt={course.title}
                        style={{ maxHeight: '100px', maxWidth: '100%', objectFit: 'contain' }} />
                    </div>
                    <div style={{ padding: '20px' }}>
                      <h5 style={{ fontFamily: "'Syne', sans-serif", color: '#fff', fontSize: '15px', fontWeight: 700, marginBottom: '6px' }}>{course.title}</h5>
                      <p style={{ color: '#555', fontSize: '13px', marginBottom: '16px' }}>{course.instructor}</p>

                      {/* Progress bar */}
                      <div style={{ marginBottom: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                          <span style={{ color: '#555', fontSize: '12px' }}>Progress</span>
                          <span style={{ color: progress === 100 ? '#22c55e' : '#e94560', fontSize: '12px', fontWeight: 700, fontFamily: "'Space Mono', monospace" }}>{progress}%</span>
                        </div>
                        <div style={{ height: '6px', background: 'rgba(255,255,255,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div style={{
                            height: '100%', borderRadius: '3px', transition: 'width 0.5s ease',
                            width: `${progress}%`,
                            background: progress === 100 ? '#22c55e' : 'linear-gradient(90deg, #e94560, #ff8fa3)'
                          }} />
                        </div>
                      </div>

                      <Link to={`/Coursedetail/${course.id}`} style={{
                        display: 'block', textAlign: 'center', padding: '10px', borderRadius: '10px',
                        background: progress === 100 ? 'rgba(34,197,94,0.1)' : 'rgba(233,69,96,0.1)',
                        color: progress === 100 ? '#22c55e' : '#e94560',
                        border: `1px solid ${progress === 100 ? 'rgba(34,197,94,0.3)' : 'rgba(233,69,96,0.3)'}`,
                        fontWeight: 600, fontSize: '13px', textDecoration: 'none'
                      }}>
                        {progress === 0 ? '▶ Start Learning' : progress === 100 ? '✅ Completed' : '▶ Continue'}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )
        )}

        {activeTab === 'progress' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {enrolledCourses.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', color: '#555' }}>No progress to show yet</div>
            ) : enrolledCourses.map(course => {
              const progress = getProgress(course.id);
              return (
                <div key={course.id} style={{
                  background: '#16162a', borderRadius: '14px', padding: '20px 24px',
                  border: '1px solid rgba(255,255,255,0.06)',
                  display: 'flex', alignItems: 'center', gap: '20px'
                }}>
                  <img src={course.thumbnail} alt={course.title}
                    style={{ width: 50, height: 50, objectFit: 'contain', flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                      <span style={{ color: '#fff', fontWeight: 600, fontSize: '15px' }}>{course.title}</span>
                      <span style={{
                        color: progress === 100 ? '#22c55e' : '#e94560', fontWeight: 700,
                        fontSize: '14px', fontFamily: "'Space Mono', monospace"
                      }}>{progress}%</span>
                    </div>
                    <div style={{ height: '8px', background: 'rgba(255,255,255,0.06)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%', borderRadius: '4px', width: `${progress}%`,
                        background: progress === 100 ? '#22c55e' : 'linear-gradient(90deg, #e94560, #ff8fa3)',
                        transition: 'width 0.5s ease'
                      }} />
                    </div>
                  </div>
                  <Link to={`/Coursedetail/${course.id}`} style={{
                    padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 600,
                    color: '#e94560', border: '1px solid rgba(233,69,96,0.3)',
                    background: 'rgba(233,69,96,0.08)', textDecoration: 'none', whiteSpace: 'nowrap'
                  }}>Continue →</Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
