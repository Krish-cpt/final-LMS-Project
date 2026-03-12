import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) setUser(JSON.parse(storedUser));
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 1000,
      background: scrolled ? 'rgba(15,15,26,0.97)' : 'rgba(15,15,26,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(233,69,96,0.15)',
      padding: '0 40px',
      height: '70px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none'
    }}>
      {/* Logo */}
      <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
        <div style={{
          width: 42, height: 42, borderRadius: '10px', overflow: 'hidden',
          border: '2px solid rgba(233,69,96,0.5)', flexShrink: 0
        }}>
          <img src="/lms.jpg" alt="logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: '18px', letterSpacing: '0.5px' }}>
          Course<span style={{ color: '#e94560' }}>Hub</span>
        </span>
      </Link>

      {/* Center Links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
        {[{ to: '/', label: 'Home' }, { to: '/Mycourses', label: 'My Courses' }, ...(user ? [{ to: '/dashboard', label: 'Dashboard' }] : [])].map(link => (
          <Link key={link.to} to={link.to} style={{
            padding: '8px 18px', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
            color: isActive(link.to) ? '#fff' : '#999',
            background: isActive(link.to) ? 'rgba(233,69,96,0.15)' : 'transparent',
            borderBottom: isActive(link.to) ? '2px solid #e94560' : '2px solid transparent',
            transition: 'all 0.2s', textDecoration: 'none'
          }}>{link.label}</Link>
        ))}
      </div>

      {/* Right Side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {!user ? (
          <>
            <Link to="/login" style={{
              padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 500,
              color: '#ccc', border: '1px solid rgba(255,255,255,0.1)',
              background: 'transparent', transition: 'all 0.2s', textDecoration: 'none'
            }}>Login</Link>
            <Link to="/signup" style={{
              padding: '8px 20px', borderRadius: '8px', fontSize: '14px', fontWeight: 600,
              color: '#fff', background: '#e94560', textDecoration: 'none',
              boxShadow: '0 4px 15px rgba(233,69,96,0.4)', transition: 'all 0.2s'
            }}>Sign Up</Link>
          </>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>Hi, {user.name}!</div>
              <div style={{ fontSize: '11px', color: '#666' }}>Student</div>
            </div>
            <img
              src={`https://ui-avatars.com/api/?name=${user.name}&size=40&background=e94560&color=fff&bold=true`}
              alt="avatar"
              style={{ width: 40, height: 40, borderRadius: '50%', border: '2px solid #e94560', cursor: 'pointer' }}
              onClick={() => navigate('/dashboard')}
            />
            <button onClick={handleLogout} style={{
              padding: '8px 16px', borderRadius: '8px', fontSize: '13px', fontWeight: 500,
              color: '#e94560', background: 'transparent', border: '1px solid rgba(233,69,96,0.4)',
              transition: 'all 0.2s'
            }}
              onMouseOver={e => { e.target.style.background = '#e94560'; e.target.style.color = '#fff'; }}
              onMouseOut={e => { e.target.style.background = 'transparent'; e.target.style.color = '#e94560'; }}
            >Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}
