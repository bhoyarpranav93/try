import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Mock DB
let courses = [
  { id: 1, title: "React Basics", description: "Learn React", lessons: [{ id: 1, title: "Intro", videoUrl: "https://www.youtube.com/embed/dGcsHMXbSOA" }], quiz: { questions: [{ id: 1, text: "What is React?", options: ["Library", "Framework"], answer: "Library" }] } },
  { id: 2, title: "Node.js Basics", description: "Learn Node.js", lessons: [{ id: 1, title: "Setup", videoUrl: "https://www.youtube.com/embed/TlB_eWDSMt4" }], quiz: { questions: [{ id: 2, text: "Node.js runs on?", options: ["Browser", "Server"], answer: "Server" }] } }
];

let leaderboard = [];

app.get("/api/courses", (req, res) => res.json(courses));

app.get("/api/courses/:id", (req, res) => {
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Not found" });
  res.json(course);
});

app.post("/api/courses/:id/quiz", (req, res) => {
  const { answers } = req.body;
  const course = courses.find(c => c.id == req.params.id);
  if (!course) return res.status(404).json({ message: "Not found" });

  let score = 0;
  course.quiz.questions.forEach(q => {
    if (answers[q.id] === q.answer) score++;
  });

  leaderboard.push({ userId: Date.now(), name: "Guest", score });
  res.json({ score });
});

app.get("/api/leaderboard", (req, res) => res.json(leaderboard));

app.listen(4000, () => console.log("Backend running on port 4000"));
