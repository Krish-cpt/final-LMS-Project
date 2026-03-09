import "bootstrap/dist/css/bootstrap.min.css";

function Signup() {
  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow" style={{width:"400px",backgroundColor:"#C9D6DF"}}>

        <h3 className="text-center mb-3">Signup</h3>
          <div className="mb-3">
            <label>Name</label>
            <input type="text" className="form-control" name="name" placeholder="Enter Your Name"/>
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input type="email" className="form-control" name="email" placeholder="Enter Your Email"/>
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input type="password" className="form-control" name="password" placeholder="Enter Your Password"/>
          </div>

          <button className="btn btn-success w-100">
            Signup
          </button>
        <p className="text-center mt-3">
          Already have an account? <a href="/login">Login</a>
        </p>

      </div>
    </div>
  );
}

export default Signup;