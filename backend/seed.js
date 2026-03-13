const mongoose = require('mongoose');
const Course = require('./Models/Course');
require('dotenv').config();

const courses = [
  {
    id: 1, title: "React for Beginners", instructor: "John Doe",
    duration: "6 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    video: "https://www.youtube.com/embed/Ke90Tje7VS0",
    description: "Learn the fundamentals of React.js and build dynamic user interfaces.",
    lessons: [
      { title: "Introduction to React", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "Setting up React Environment", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "JSX and Rendering", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "Components and Props", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "State and Lifecycle", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "React Hooks", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "Event Handling", video: "https://www.youtube.com/embed/Ke90Tje7VS0" },
      { title: "Mini React Project", video: "https://www.youtube.com/embed/Ke90Tje7VS0" }
    ]
  },
  {
    id: 2, title: "Java Full Stack Development", instructor: "Jane Smith",
    duration: "8 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    video: "https://www.youtube.com/embed/grEKMHGYyns",
    description: "Build full stack applications using Java, Spring Boot, React, and MySQL.",
    lessons: [
      { title: "Full Stack Overview", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Frontend Basics", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Java Fundamentals", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Spring Boot Introduction", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "REST API Development", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Database Integration", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Authentication", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Project Deployment", video: "https://www.youtube.com/embed/9SGDpanrc8U" }
    ]
  },
  {
    id: 3, title: "Python for Data Science", instructor: "Michael Johnson",
    duration: "10 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/c3/Python-logo-notext.svg",
    video: "https://www.youtube.com/embed/rfscVS0vtbw",
    description: "Use Python libraries like NumPy and Pandas for data analysis.",
    lessons: [
      { title: "Python Basics", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Data Structures", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "NumPy Fundamentals", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Pandas Data Analysis", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Data Cleaning", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Data Visualization", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Exploratory Data Analysis", video: "https://www.youtube.com/embed/rfscVS0vtbw" },
      { title: "Mini Data Project", video: "https://www.youtube.com/embed/rfscVS0vtbw" }
    ]
  },
  {
    id: 4, title: "Machine Learning Fundamentals", instructor: "Emily Davis",
    duration: "12 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/0/05/Scikit_learn_logo_small.svg",
    video: "https://www.youtube.com/embed/GwIo3gDZCVQ",
    description: "Understand core machine learning algorithms and predictive models.",
    lessons: [
      { title: "Introduction to ML", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Data Preprocessing", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Regression Algorithms", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Classification Algorithms", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Decision Trees", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Clustering", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "Model Evaluation", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" },
      { title: "ML Project", video: "https://www.youtube.com/embed/GwIo3gDZCVQ" }
    ]
  },
  {
    id: 5, title: "Advanced JavaScript", instructor: "David Wilson",
    duration: "7 Weeks", level: "Advanced",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    video: "https://www.youtube.com/embed/PkZNo7MFNFg",
    description: "Deep dive into modern JavaScript including async programming.",
    lessons: [
      { title: "Closures", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Scope and Hoisting", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Promises", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Async Await", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "ES6 Modules", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Array Methods", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Design Patterns", video: "https://www.youtube.com/embed/PkZNo7MFNFg" },
      { title: "Project", video: "https://www.youtube.com/embed/PkZNo7MFNFg" }
    ]
  },
  {
    id: 6, title: "UI UX Design Fundamentals", instructor: "Sophia Brown",
    duration: "5 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
    video: "https://www.youtube.com/embed/FTFaQWZBqQ8",
    description: "Learn user research, wireframing and prototyping using Figma.",
    lessons: [
      { title: "UX Basics", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
      { title: "User Research", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
      { title: "Wireframing", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
      { title: "Prototyping", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
      { title: "Design Principles", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" },
      { title: "Usability Testing", video: "https://www.youtube.com/embed/FTFaQWZBqQ8" }
    ]
  },
  {
    id: 7, title: "Deep Learning with TensorFlow", instructor: "Daniel Martinez",
    duration: "9 Weeks", level: "Advanced",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/2/2d/Tensorflow_logo.svg",
    video: "https://www.youtube.com/embed/tPYj3fFJGjk",
    description: "Build neural network models using TensorFlow.",
    lessons: [
      { title: "Neural Networks", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "TensorFlow Setup", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "Deep Neural Networks", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "CNN Models", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "RNN Models", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "Model Optimization", video: "https://www.youtube.com/embed/tPYj3fFJGjk" },
      { title: "AI Project", video: "https://www.youtube.com/embed/tPYj3fFJGjk" }
    ]
  },
  {
    id: 8, title: "SQL and Database Management", instructor: "Olivia Anderson",
    duration: "6 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/8/87/Sql_data_base_with_logo.png",
    video: "https://www.youtube.com/embed/HXV3zeQKqGY",
    description: "Learn SQL queries and relational databases.",
    lessons: [
      { title: "Database Concepts", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { title: "SQL Basics", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { title: "CRUD Operations", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { title: "Joins", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { title: "Indexes", video: "https://www.youtube.com/embed/HXV3zeQKqGY" },
      { title: "Optimization", video: "https://www.youtube.com/embed/HXV3zeQKqGY" }
    ]
  },
  {
    id: 9, title: "Node.js Backend Development", instructor: "Chris Taylor",
    duration: "7 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/d/d9/Node.js_logo.svg",
    video: "https://www.youtube.com/embed/Oe421EPjeBE",
    description: "Build backend APIs using Node.js and Express.",
    lessons: [
      { title: "Node Basics", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "Express Framework", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "REST APIs", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "Authentication", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "Database Integration", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "API Security", video: "https://www.youtube.com/embed/Oe421EPjeBE" },
      { title: "Project", video: "https://www.youtube.com/embed/Oe421EPjeBE" }
    ]
  },
  {
    id: 10, title: "Spring Boot for Beginners", instructor: "Amit Kumar",
    duration: "6 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/7/79/Spring_Boot.svg",
    video: "https://www.youtube.com/embed/9SGDpanrc8U",
    description: "Build backend applications using Spring Boot.",
    lessons: [
      { title: "Spring Basics", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Spring Boot Setup", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "REST APIs", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Database Integration", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Security", video: "https://www.youtube.com/embed/9SGDpanrc8U" },
      { title: "Project", video: "https://www.youtube.com/embed/9SGDpanrc8U" }
    ]
  },
  {
    id: 11, title: "Angular Complete Guide", instructor: "Sarah Wilson",
    duration: "8 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/c/cf/Angular_full_color_logo.svg",
    video: "https://www.youtube.com/embed/3qBXWUpoPHo",
    description: "Master Angular framework.",
    lessons: [
      { title: "Angular Introduction", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "Components", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "Services", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "Routing", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "Forms", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "HTTP Requests", video: "https://www.youtube.com/embed/3qBXWUpoPHo" },
      { title: "Project", video: "https://www.youtube.com/embed/3qBXWUpoPHo" }
    ]
  },
  {
    id: 12, title: "Vue.js Crash Course", instructor: "Kevin Scott",
    duration: "5 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg",
    video: "https://www.youtube.com/embed/qZXt1Aom3Cs",
    description: "Learn Vue.js basics.",
    lessons: [
      { title: "Vue Intro", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" },
      { title: "Components", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" },
      { title: "Directives", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" },
      { title: "Router", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" },
      { title: "State Management", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" },
      { title: "Project", video: "https://www.youtube.com/embed/qZXt1Aom3Cs" }
    ]
  },
  {
    id: 13, title: "Docker for Developers", instructor: "Brian Adams",
    duration: "4 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Docker_%28container_engine%29_logo.svg",
    video: "https://www.youtube.com/embed/3c-iBn73dDE",
    description: "Learn containerization with Docker.",
    lessons: [
      { title: "Docker Basics", video: "https://www.youtube.com/embed/3c-iBn73dDE" },
      { title: "Images", video: "https://www.youtube.com/embed/3c-iBn73dDE" },
      { title: "Dockerfile", video: "https://www.youtube.com/embed/3c-iBn73dDE" },
      { title: "Docker Compose", video: "https://www.youtube.com/embed/3c-iBn73dDE" },
      { title: "Deployment", video: "https://www.youtube.com/embed/3c-iBn73dDE" }
    ]
  },
  {
    id: 14, title: "Kubernetes Essentials", instructor: "Lisa Turner",
    duration: "6 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg",
    video: "https://www.youtube.com/embed/X48VuDVv0do",
    description: "Learn Kubernetes container orchestration.",
    lessons: [
      { title: "Kubernetes Basics", video: "https://www.youtube.com/embed/X48VuDVv0do" },
      { title: "Pods", video: "https://www.youtube.com/embed/X48VuDVv0do" },
      { title: "Services", video: "https://www.youtube.com/embed/X48VuDVv0do" },
      { title: "Deployments", video: "https://www.youtube.com/embed/X48VuDVv0do" },
      { title: "Scaling", video: "https://www.youtube.com/embed/X48VuDVv0do" },
      { title: "Project", video: "https://www.youtube.com/embed/X48VuDVv0do" }
    ]
  },
  {
    id: 15, title: "Cyber Security Basics", instructor: "Robert King",
    duration: "6 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/5/51/Cybersecurity_logo.png",
    video: "https://www.youtube.com/embed/inWWhr5tnEA",
    description: "Understand cyber threats and security practices.",
    lessons: [
      { title: "Cybersecurity Overview", video: "https://www.youtube.com/embed/inWWhr5tnEA" },
      { title: "Network Security", video: "https://www.youtube.com/embed/inWWhr5tnEA" },
      { title: "Threat Detection", video: "https://www.youtube.com/embed/inWWhr5tnEA" },
      { title: "Encryption", video: "https://www.youtube.com/embed/inWWhr5tnEA" },
      { title: "Policies", video: "https://www.youtube.com/embed/inWWhr5tnEA" },
      { title: "Security Tools", video: "https://www.youtube.com/embed/inWWhr5tnEA" }
    ]
  },
  {
    id: 16, title: "Ethical Hacking Masterclass", instructor: "James Carter",
    duration: "9 Weeks", level: "Advanced",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/5/51/Cybersecurity_logo.png",
    video: "https://www.youtube.com/embed/3Kq1MIfTWCE",
    description: "Learn ethical hacking techniques.",
    lessons: [
      { title: "Intro", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
      { title: "Reconnaissance", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
      { title: "Network Attacks", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
      { title: "Web Attacks", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
      { title: "Pen Testing", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" },
      { title: "Reporting", video: "https://www.youtube.com/embed/3Kq1MIfTWCE" }
    ]
  },
  {
    id: 17, title: "C Programming Fundamentals", instructor: "Rahul Verma",
    duration: "5 Weeks", level: "Beginner",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/19/C_Logo.png",
    video: "https://www.youtube.com/embed/KJgsSFOSQv0",
    description: "Learn programming basics with C.",
    lessons: [
      { title: "Introduction", video: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "Variables", video: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "Control Structures", video: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "Functions", video: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "Arrays", video: "https://www.youtube.com/embed/KJgsSFOSQv0" },
      { title: "Pointers", video: "https://www.youtube.com/embed/KJgsSFOSQv0" }
    ]
  },
  {
    id: 18, title: "C++ Object Oriented Programming", instructor: "Neha Sharma",
    duration: "7 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/1/18/ISO_C%2B%2B_Logo.svg",
    video: "https://www.youtube.com/embed/vLnPwxZdW4Y",
    description: "Learn OOP concepts using C++.",
    lessons: [
      { title: "OOP Concepts", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" },
      { title: "Classes", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" },
      { title: "Inheritance", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" },
      { title: "Polymorphism", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" },
      { title: "Exception Handling", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" },
      { title: "Project", video: "https://www.youtube.com/embed/vLnPwxZdW4Y" }
    ]
  },
  {
    id: 19, title: "Java Programming Masterclass", instructor: "Vikram Singh",
    duration: "10 Weeks", level: "Advanced",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    video: "https://www.youtube.com/embed/grEKMHGYyns",
    description: "Master Java programming.",
    lessons: [
      { title: "Java Basics", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "OOP", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Collections", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Exception Handling", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Multithreading", video: "https://www.youtube.com/embed/grEKMHGYyns" },
      { title: "Project", video: "https://www.youtube.com/embed/grEKMHGYyns" }
    ]
  },
  {
    id: 20, title: "Data Structures in Java", instructor: "Ankit Gupta",
    duration: "8 Weeks", level: "Intermediate",
    thumbnail: "https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg",
    video: "https://www.youtube.com/embed/8hly31xKli0",
    description: "Learn DSA concepts in Java.",
    lessons: [
      { title: "Arrays", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Linked Lists", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Stacks", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Queues", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Trees", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Graphs", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Sorting", video: "https://www.youtube.com/embed/8hly31xKli0" },
      { title: "Project", video: "https://www.youtube.com/embed/8hly31xKli0" }
    ]
  }
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected');
    await Course.deleteMany();
    await Course.insertMany(courses);
    console.log('✅ 20 courses seeded successfully!');
    mongoose.connection.close();
  } catch (err) {
    console.error('❌ Seed error:', err);
  }
};

seedDB();