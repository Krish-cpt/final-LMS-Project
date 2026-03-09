import "bootstrap/dist/css/bootstrap.min.css";

function Login() {
  return (
    <div className="Login-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{width:"400px",height:"400px",backgroundColor:"#C9D6DF"}}>
        <h3 className="text-center mb-3">Login</h3>
          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter Your Email" required={true} />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter Your Password" required={true} />
            <button className="btn btn-link p-0">
              Forgot Password?
            </button>
          </div>
          <button className="btn btn-primary w-100"><a href="/Coursesdetails" style={{ textDecoration: 'none', color: 'white' }}>Login</a></button>
        <p className="text-center mt-3">Do not have an account? <a href="/signup">Signup</a></p>
      </div>
    </div>
  );
}

export default Login;