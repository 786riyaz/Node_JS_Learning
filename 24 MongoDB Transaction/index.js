// Mongo DB Transaction only works on replica set Member of Mongos
const express = require('express');
const mongoose = require('mongoose');
const Student = require('./models/student');
const Course = require('./models/course');

const app = express();
app.use(express.json());

// ✅ MongoDB connection
mongoose.connect('mongodb://localhost:27017/schoolDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ Connection error:', err));

app.get("/", (req, res)=>{
  res.send("Hello");
})

/**
 * Route: Create Student + Course in a transaction
 */
app.post('/create-student-and-course', async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, age, email, courseTitle, courseDuration } = req.body;

    // 1️⃣ Insert into Student collection
    const student = await Student.create([{ name, age, email }], { session });

    // 2️⃣ Insert into Course collection
    const course = await Course.create(
      [{ title: courseTitle, duration: courseDuration, studentId: student[0]._id }],
      { session }
    );

    // 3️⃣ Commit (save) both inserts
    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      message: '✅ Student and course created successfully',
      student: student[0],
      course: course[0],
    });
  } catch (error) {
    // ❌ Rollback both inserts if any error occurs
    await session.abortTransaction();
    session.endSession();
    res.status(500).json({ message: '❌ Transaction failed', error: error.message });
  }
});

// Server
app.listen(5000, () => console.log('🚀 Server running on port 5000'));


/*
POST 
http://localhost:5000/create-student-and-course
Content-Type: application/json

Request Body ===>
{
  "name": "Riyaz Khan",
  "age": 22,
  "email": "riyaz@example.com",
  "courseTitle": "NodeJS Advanced",
  "courseDuration": "5 weeks"
}
*/