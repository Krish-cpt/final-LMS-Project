import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api";

function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const { data } = await API.post("/auth/login", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: '#0f0f1a', fontFamily: "'DM Sans', sans-serif",
      position: 'relative', overflow: 'hidden'
    }}>
      {/* Left decorative panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -150, right: -150,
          width: 500, height: 500, borderRadius: '50%',
          border: '1px solid rgba(233,69,96,0.1)',
          pointerEvents: 'none'
        }} />
        <div style={{
          position: 'absolute', bottom: -100, left: -100,
          width: 350, height: 350, borderRadius: '50%',
          border: '1px solid rgba(255,255,255,0.05)',
          pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🎓</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: '36px', fontWeight: 800,
            color: '#fff', marginBottom: '16px', lineHeight: 1.2
          }}>Welcome<br /><span style={{ color: '#e94560' }}>Back!</span></h2>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.7, maxWidth: '320px' }}>
            Continue your learning journey. Your courses are waiting for you.
          </p>
          <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {['Access all your enrolled courses', 'Track your learning progress', 'Resume where you left off'].map((item, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#888' }}>
                <span style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: 'rgba(233,69,96,0.15)', border: '1px solid rgba(233,69,96,0.3)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#e94560', fontSize: '12px', flexShrink: 0
                }}>✓</span>
                <span style={{ fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right form panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '40px' }}>
            <p style={{ color: '#555', fontSize: '13px', fontFamily: "'Space Mono', monospace", marginBottom: '8px', letterSpacing: '1px' }}>WELCOME BACK</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Sign In</h1>
            <p style={{ color: '#555', fontSize: '15px' }}>
              Don't have an account? <Link to="/signup" style={{ color: '#e94560', fontWeight: 600 }}>Sign up free</Link>
            </p>
          </div>

          {error && (
            <div style={{
              padding: '14px 18px', borderRadius: '10px', marginBottom: '24px',
              background: 'rgba(233,69,96,0.1)', border: '1px solid rgba(233,69,96,0.3)',
              color: '#e94560', fontSize: '14px'
            }}>⚠️ {error}</div>
          )}

          <form onSubmit={handleSubmit} autoComplete="off" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.5px' }}>EMAIL ADDRESS</label>
              <input
                type="email" name="email" placeholder="you@example.com"
                value={formData.email} onChange={handleChange}
                autoComplete="off" required
                style={{
                  width: '100%', padding: '14px 18px', borderRadius: '12px',
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  color: '#fff', fontSize: '15px', outline: 'none', transition: 'border 0.2s'
                }}
                onFocus={e => e.target.style.border = '1px solid rgba(233,69,96,0.5)'}
                onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
              />
            </div>

            <div>
              <label style={{ display: 'block', color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.5px' }}>PASSWORD</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? "text" : "password"} name="password"
                  placeholder="Enter your password"
                  value={formData.password} onChange={handleChange}
                  autoComplete="new-password" required
                  style={{
                    width: '100%', padding: '14px 50px 14px 18px', borderRadius: '12px',
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    color: '#fff', fontSize: '15px', outline: 'none', transition: 'border 0.2s'
                  }}
                  onFocus={e => e.target.style.border = '1px solid rgba(233,69,96,0.5)'}
                  onBlur={e => e.target.style.border = '1px solid rgba(255,255,255,0.08)'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '18px'
                }}>{showPassword ? '🙈' : '👁'}</button>
              </div>
              <div style={{ textAlign: 'right', marginTop: '8px' }}>
                <button type="button" style={{ background: 'none', border: 'none', color: '#e94560', fontSize: '13px', cursor: 'pointer' }}>
                  Forgot password?
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '16px', borderRadius: '12px', border: 'none',
              background: loading ? 'rgba(233,69,96,0.5)' : 'linear-gradient(135deg, #e94560, #c73652)',
              color: '#fff', fontWeight: 700, fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)', transition: 'all 0.2s',
              letterSpacing: '0.5px'
            }}>
              {loading ? '⏳ Signing in...' : 'Sign In →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;