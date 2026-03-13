import React, { useEffect, useState } from 'react';
import { Coursecard } from '../components/Coursecard';
import API from '../api';

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API.get('/courses')
      .then(res => { setCourses(res.data); setLoading(false); })
      .catch(err => { console.log(err); setLoading(false); });
  }, []);

  const filtered = courses.filter(course => {
    const matchSearch = course.title.toLowerCase().includes(search.toLowerCase()) ||
      course.instructor.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'All' || course.level === filter;
    return matchSearch && matchFilter;
  });

  const stats = [
    { value: courses.length + '+', label: 'Expert Courses' },
    { value: '50K+', label: 'Students Enrolled' },
    { value: '100%', label: 'Quality Content' },
  ];

  return (
    <div style={{ background: '#0f0f1a', minHeight: '100vh', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Hero */}
      <div style={{
        position: 'relative', overflow: 'hidden',
        padding: '80px 60px 60px',
        background: 'linear-gradient(135deg, #0f0f1a 0%, #1a1a2e 50%, #0f3460 100%)',
      }}>
        <div style={{
          position: 'absolute', top: -100, right: -100,
          width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(233,69,96,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -50, left: '30%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(15,52,96,0.6) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <div style={{ maxWidth: '700px', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'inline-block', padding: '6px 16px', borderRadius: '20px',
            background: 'rgba(233,69,96,0.15)', border: '1px solid rgba(233,69,96,0.3)',
            color: '#e94560', fontSize: '13px', fontWeight: 600, marginBottom: '24px',
            letterSpacing: '1px', textTransform: 'uppercase'
          }}>🎓 Learn Without Limits</div>

          <h1 style={{
            fontFamily: "'Syne', 'Arial Black', sans-serif",
            fontSize: '52px', fontWeight: 900,
            lineHeight: 1.15, marginBottom: '20px', color: '#fff',
            letterSpacing: '-1px'
          }}>
            Master New Skills<br />
            <span style={{
              background: 'linear-gradient(90deg, #e94560, #ff8fa3)',
              WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}>At Your Own Pace</span>
          </h1>

          <p style={{ color: '#888', fontSize: '17px', lineHeight: 1.7, marginBottom: '36px', maxWidth: '500px' }}>
            Explore world-class courses taught by expert instructors. From beginner to advanced — your journey starts here.
          </p>

          <div style={{ display: 'flex', gap: '10px', maxWidth: '580px' }}>
            <div style={{ flex: 1, position: 'relative' }}>
              <span style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔍</span>
              <input
                type="search"
                placeholder="Search courses or instructors..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{
                  width: '100%', padding: '16px 16px 16px 48px',
                  borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)',
                  background: 'rgba(255,255,255,0.05)', color: '#fff',
                  fontSize: '15px', outline: 'none', backdropFilter: 'blur(10px)',
                  transition: 'border 0.2s'
                }}
                onFocus={e => e.target.style.border = '1px solid rgba(233,69,96,0.5)'}
                onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.1)'}
              />
            </div>
            <button style={{
              padding: '16px 28px', borderRadius: '12px', border: 'none',
              background: 'linear-gradient(135deg, #e94560, #c73652)',
              color: '#fff', fontWeight: 700, fontSize: '15px',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)', whiteSpace: 'nowrap'
            }}>Search</button>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '40px', marginTop: '50px', position: 'relative', zIndex: 1 }}>
          {stats.map((s, i) => (
            <div key={i}>
              <div style={{
                fontFamily: "'Syne', 'Arial Black', sans-serif",
                fontSize: '28px', fontWeight: 900, color: '#e94560'
              }}>{s.value}</div>
              <div style={{ fontSize: '13px', color: '#666', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter */}
      <div style={{
        padding: '24px 60px', display: 'flex', alignItems: 'center',
        gap: '10px', flexWrap: 'wrap',
        borderBottom: '1px solid rgba(255,255,255,0.05)'
      }}>
        <span style={{ color: '#555', fontSize: '13px', marginRight: '8px', fontFamily: "'Space Mono', monospace" }}>FILTER:</span>
        {['All', 'Beginner', 'Intermediate', 'Advanced'].map(level => (
          <button key={level} onClick={() => setFilter(level)} style={{
            padding: '7px 18px', borderRadius: '20px', fontSize: '13px', fontWeight: 600,
            border: `1px solid ${filter === level ? '#e94560' : 'rgba(255,255,255,0.1)'}`,
            background: filter === level ? 'rgba(233,69,96,0.2)' : 'transparent',
            color: filter === level ? '#e94560' : '#666',
            cursor: 'pointer', transition: 'all 0.2s'
          }}>{level}</button>
        ))}
        <span style={{
          marginLeft: 'auto', color: '#555', fontSize: '13px',
          fontFamily: "'Space Mono', monospace"
        }}>{filtered.length} courses</span>
      </div>

      {/* Course Grid */}
      <div style={{ padding: '40px 60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#555' }}>
            <div style={{ fontSize: '40px', marginBottom: '16px' }}>⏳</div>
            <p>Loading courses...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px', color: '#555' }}>
            <div style={{ fontSize: '50px', marginBottom: '16px' }}>🔍</div>
            <p style={{ fontSize: '18px' }}>No courses found for "<span style={{ color: '#e94560' }}>{search}</span>"</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: '24px' }}>
            {filtered.map(course => <Coursecard key={course.id} course={course} />)}
          </div>
        )}
      </div>
    </div>
  );
}