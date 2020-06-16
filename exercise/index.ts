import express from 'express';
const app = express();
const { calculateExercise } = require('./calculateExercises');

app.use(express.json());

app.post('/exercise', (req, res) => {
  const body = req.body;
  try {
    if (!body.target || !body.daily_exercises) throw new Error('parameters missing');
    if (isNaN(Number(body.target))) throw new Error('malformatted parameters');
    for (let i = 0; i < body.daily_exercises; i++) {
      if (isNaN(Number(body.daily_exercises[i]))) throw new Error('malformatted parameters')
    }
    const result = calculateExercise(body.target, body.daily_exercises)
    res.json(result);
  } catch (e) {
    res.json({ "error": e.message });
  }
})

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})