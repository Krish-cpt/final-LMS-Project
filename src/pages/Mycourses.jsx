import { useEffect, useState } from 'react';
import API from '../api';
import { Coursecard } from '../components/Coursecard';

const Mycourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    // get enrolled course ids
    API.get('/auth/enrolled', {
      headers: { Authorization: `Bearer ${token}` }
    }).then((res) => {
      const enrolledIds = res.data.enrolledCourses;

      // get all courses then filter enrolled ones
      API.get('/courses').then((coursesRes) => {
        const enrolledCourses = coursesRes.data.filter(c => enrolledIds.includes(c.id));
        setCourses(enrolledCourses);
        setLoading(false);
      });
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>My Courses</h1>
      {courses.length === 0 ? (
        <p>You have not enrolled in any courses yet. <a href="/">Browse courses</a></p>
      ) : (
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          {courses.map((course) => (
            <Coursecard key={course.id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Mycourses;