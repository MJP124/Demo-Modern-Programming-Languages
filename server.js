const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const tasks = [];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { task } = req.body;
    tasks.push(task);
    res.json({ message: 'Task added!' });
});

app.listen(5000, () => {
    console.log('Server running on http://localhost:5000');
});