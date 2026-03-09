import React from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from 'react-router-dom';



// receive a single course object via the `course` prop
export const Coursecard = ({ course }) => {
  return (
    <div className='main-container ' style={{marginLeft:50}}>
      <div className="card" style={{ width: '18rem',height:450,marginBottom:50, gap:3,cursor:'pointer'}}>
        <img src={course.thumbnail} className="card-img-top p-3" alt={course.title} style={{width:"100%",height:200}}/>
          <h5 className="card-title">{course.title}</h5>
          <p>Instructor:{course.instructor}</p>
          <p>Level:{course.level}</p>
          <p>Duration:{course.duration}</p>
    
            <Link to={`/Coursedetail/${course.id}`} className='btn btn-primary' style={{color:'white', textDecoration:'none',width:'80%',marginLeft:'10%'}}>Explore</Link>
          
      </div>
    </div>
  )
}
