const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: String,
  duration: String,
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' }
});

module.exports = mongoose.model('Course', courseSchema);
