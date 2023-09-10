const express = require('express');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;
const ToDo = require('./todo'); 
const dotenv = require('dotenv').config();


mongoose.connect(process.env.URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});


app.post('/api/tasks', async (req, res) => {
  try {
    const { task } = req.body;
    const newTask = new ToDo({ task });
    const savedTask = await newTask.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to create a to-do task.' });
  }
});

// Get all to-do tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await ToDo.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'Unable to fetch to-do tasks.' });
  }
});


app.put('/api/tasks/:id', async (req, res) => {
  try {
    const { task, completed } = req.body;
    const updatedTask = await ToDo.findByIdAndUpdate(
      req.params.id,
      { task, completed },
      { new: true }
    );
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to update the to-do task.' });
  }
});


app.delete('/api/tasks/:id', async (req, res) => {
  try {
    const deletedTask = await ToDo.findByIdAndRemove(req.params.id);
    if (!deletedTask) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    res.json(deletedTask);
  } catch (error) {
    res.status(500).json({ error: 'Unable to delete the to-do task.' });
  }
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
