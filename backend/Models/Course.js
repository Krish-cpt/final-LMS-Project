const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  instructor: { type: String, required: true },
  duration: { type: String, required: true },
  level: { type: String, enum: ['Beginner', 'Intermediate', 'Advanced'], required: true },
  thumbnail: { type: String },
  video: { type: String },
  description: { type: String },
  lessons: [{ title: { type: String }, video: { type: String } }],
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);