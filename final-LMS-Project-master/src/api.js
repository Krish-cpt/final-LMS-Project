import axios from 'axios';

const API = axios.create({
  baseURL: 'https://final-lms-project.onrender.com/api'
});

export const signup = (data) => API.post('/auth/signup', data);
export const login = (data) => API.post('/auth/login', data);
export const getMe = (token) => API.get('/auth/me', { headers: { Authorization: `Bearer ${token}` } });
export const getProfile = (token) => API.get('/auth/profile', { headers: { Authorization: `Bearer ${token}` } });
export const updateProfile = (data, token) => API.put('/auth/profile', data, { headers: { Authorization: `Bearer ${token}` } });
export const enrollCourse = (courseId, token) => API.post('/auth/enroll', { courseId }, { headers: { Authorization: `Bearer ${token}` } });
export const getEnrolled = (token) => API.get('/auth/enrolled', { headers: { Authorization: `Bearer ${token}` } });
export const updateProgress = (data, token) => API.post('/auth/progress', data, { headers: { Authorization: `Bearer ${token}` } });
export const getCourses = () => API.get('/courses');
export const getCourse = (id) => API.get(`/courses/${id}`);

export default API;