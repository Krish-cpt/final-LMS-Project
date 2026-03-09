import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Coursecard } from '../components/Coursecard';

export default function Coursedetail() {
  const { id } = useParams();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [allCourses, setAllCourses] = useState([]);

  // helper to convert a YouTube url to the embeddable iframe url
  const getEmbedUrl = (url) => {
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes('youtu.be')) {
        // short link format
        return `https://www.youtube.com/embed/${urlObj.pathname.slice(1)}`;
      }
      const params = new URLSearchParams(urlObj.search);
      const v = params.get('v');
      return v ? `https://www.youtube.com/embed/${v}` : url;
    } catch (e) {
      return url; // fallback if parsing fails
    }
  };

  useEffect(() => {
    
    fetch(`http://localhost:3001/courses/${id}`)
      .then((res) => res.json())
      .then((data) => setSelectedCourse(data))
      .catch((error) => console.log(error));

    
    fetch("http://localhost:3001/courses")
      .then((res) => res.json())
      .then((data) => setAllCourses(data))
      .catch((error) => console.log(error));
  }, [id]);

  
  const remainingCourses = allCourses.filter(course => course.id !== parseInt(id));

  if (!selectedCourse) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ padding: "20px", backgroundColor: "#f8f9fa", minHeight: "100vh" }}>
    
      <div style={{ marginBottom: "40px" }}>
        <h1>{selectedCourse.title}</h1>
        <img src={selectedCourse.thumbnail} alt={selectedCourse.title} style={{ width: "300px", height: "200px" }} />
        <p><strong>Instructor:</strong> {selectedCourse.instructor}</p>
        <p><strong>Duration:</strong> {selectedCourse.duration}</p>
        <p><strong>Level:</strong> {selectedCourse.level}</p>
        <p><strong>Description:</strong> {selectedCourse.description}</p>
        <h3>Lessons:</h3>
        <ul>
          {selectedCourse.lessons.map((lesson, index) => (
            <li key={index}>{lesson}</li>
          ))}
        </ul>

        {/* embed video if available */}
        {selectedCourse.video && (
          <div style={{ marginTop: '30px' }}>
            <h3>Preview</h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
              <iframe
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={getEmbedUrl(selectedCourse.video)}
                title="Course video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        )}

      </div>

      
      <h2>Other Courses</h2>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
        {remainingCourses.map((course) => (
          <Coursecard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
