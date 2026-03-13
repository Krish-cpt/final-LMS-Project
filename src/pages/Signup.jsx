import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../Services/api";

function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const { data } = await API.post("/auth/signup", formData);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally { setLoading(false); }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex',
      background: '#0f0f1a', fontFamily: "'DM Sans', sans-serif"
    }}>
      {/* Left form panel */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '60px'
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>
          <div style={{ marginBottom: '36px' }}>
            <p style={{ color: '#555', fontSize: '13px', fontFamily: "'Space Mono', monospace", marginBottom: '8px', letterSpacing: '1px' }}>GET STARTED</p>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: '36px', fontWeight: 800, color: '#fff', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: '#555', fontSize: '15px' }}>
              Already have an account? <Link to="/login" style={{ color: '#e94560', fontWeight: 600 }}>Sign in</Link>
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
              <label style={{ display: 'block', color: '#888', fontSize: '13px', fontWeight: 500, marginBottom: '8px', letterSpacing: '0.5px' }}>FULL NAME</label>
              <input
                type="text" name="name" placeholder="John Doe"
                value={formData.name} onChange={handleChange}
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
                  placeholder="Create a strong password"
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
            </div>

            <button type="submit" disabled={loading} style={{
              padding: '16px', borderRadius: '12px', border: 'none',
              background: loading ? 'rgba(233,69,96,0.5)' : 'linear-gradient(135deg, #e94560, #c73652)',
              color: '#fff', fontWeight: 700, fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
              boxShadow: '0 4px 20px rgba(233,69,96,0.4)', transition: 'all 0.2s',
              letterSpacing: '0.5px', marginTop: '4px'
            }}>
              {loading ? '⏳ Creating account...' : 'Create Account →'}
            </button>

            <p style={{ color: '#444', fontSize: '12px', textAlign: 'center', lineHeight: 1.6 }}>
              By signing up, you agree to our <span style={{ color: '#e94560' }}>Terms of Service</span> and <span style={{ color: '#e94560' }}>Privacy Policy</span>
            </p>
          </form>
        </div>
      </div>

      {/* Right decorative panel */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        background: 'linear-gradient(135deg, #0f3460 0%, #1a1a2e 100%)',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute', top: -100, left: -100,
          width: 400, height: 400, borderRadius: '50%',
          border: '1px solid rgba(233,69,96,0.1)', pointerEvents: 'none'
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '24px' }}>🚀</div>
          <h2 style={{
            fontFamily: "'Syne', sans-serif", fontSize: '36px', fontWeight: 800,
            color: '#fff', marginBottom: '16px', lineHeight: 1.2
          }}>Start Your<br /><span style={{ color: '#e94560' }}>Journey!</span></h2>
          <p style={{ color: '#666', fontSize: '16px', lineHeight: 1.7, maxWidth: '300px' }}>
            Join thousands of learners and level up your skills today.
          </p>
          <div style={{
            marginTop: '40px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', maxWidth: '320px'
          }}>
            {[
              { icon: '📚', text: '20+ Courses' },
              { icon: '🎯', text: 'Expert Tutors' },
              { icon: '📱', text: 'Learn Anywhere' },
              { icon: '🏆', text: 'Certificates' }
            ].map((item, i) => (
              <div key={i} style={{
                padding: '16px', borderRadius: '12px',
                background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                textAlign: 'center'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{item.icon}</div>
                <div style={{ color: '#888', fontSize: '13px' }}>{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
