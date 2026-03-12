import React from 'react'
import { Coursecard } from '../components/Coursecard'
import { useEffect, useState } from 'react'

export default function Home() {
  const [Course, setCourse] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/courses")
      .then((res) => res.json())
      .then((data) => setCourse(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ color: 'white' }}>Available Courses</h1>
      <form className="d-flex mb-3" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
        <button className="btn btn-outline-success" type="submit">Search</button>
      </form>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {Course.map((course) => (
          <Coursecard key={course.id} course={course} />
        ))}
      </div>
    </div>
  )
}