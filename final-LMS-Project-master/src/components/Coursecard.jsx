import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Coursecard = ({ course }) => {
  const [hovered, setHovered] = useState(false);

  const levelConfig = {
    Beginner: { color: '#22c55e', bg: 'rgba(34,197,94,0.1)', icon: '🌱' },
    Intermediate: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', icon: '⚡' },
    Advanced: { color: '#e94560', bg: 'rgba(233,69,96,0.1)', icon: '🔥' }
  };
  const lvl = levelConfig[course.level] || levelConfig['Beginner'];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? '#1e1e30' : '#16162a',
        borderRadius: '16px',
        overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(233,69,96,0.3)' : 'rgba(255,255,255,0.06)'}`,
        transition: 'all 0.3s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered ? '0 20px 40px rgba(233,69,96,0.15)' : '0 4px 20px rgba(0,0,0,0.2)',
        display: 'flex', flexDirection: 'column'
      }}
    >
      {/* Thumbnail */}
      <div style={{
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          background: hovered ? 'rgba(233,69,96,0.05)' : 'transparent',
          transition: 'all 0.3s'
        }} />
        <img src={course.thumbnail} alt={course.title}
          style={{ maxWidth: '80%', maxHeight: '120px', objectFit: 'contain', position: 'relative', zIndex: 1 }}
        />
        {/* Level badge */}
        <div style={{
          position: 'absolute', top: 12, right: 12,
          padding: '4px 10px', borderRadius: '20px',
          background: lvl.bg, color: lvl.color,
          fontSize: '11px', fontWeight: 700,
          border: `1px solid ${lvl.color}40`,
          fontFamily: "'Space Mono', monospace"
        }}>
          {lvl.icon} {course.level}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <h5 style={{
          fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: '16px',
          color: '#fff', lineHeight: 1.4, margin: 0
        }}>{course.title}</h5>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          <span style={{ color: '#666', fontSize: '13px' }}>👨‍🏫 {course.instructor}</span>
          <span style={{ color: '#666', fontSize: '13px' }}>⏱ {course.duration}</span>
        </div>

        <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <Link to={`/Coursedetail/${course.id}`} style={{
            display: 'block', textAlign: 'center',
            padding: '11px', borderRadius: '10px',
            background: hovered ? 'linear-gradient(135deg, #e94560, #c73652)' : 'rgba(233,69,96,0.1)',
            color: hovered ? '#fff' : '#e94560',
            border: `1px solid ${hovered ? 'transparent' : 'rgba(233,69,96,0.3)'}`,
            fontWeight: 600, fontSize: '14px',
            transition: 'all 0.3s', textDecoration: 'none',
            boxShadow: hovered ? '0 4px 15px rgba(233,69,96,0.4)' : 'none'
          }}>
            {hovered ? 'Explore Course →' : 'View Details'}
          </Link>
        </div>
      </div>
    </div>
  );
};
