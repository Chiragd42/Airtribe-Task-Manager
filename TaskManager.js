const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = 3000;

let tasks = [];

app.get('/tasks', (req, res) => {
    console.log("Welcome to the task manager ");
    res.json(tasks);
});



app.get('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === id);
    if (!task) {
        return res.status(404).send('Task not found');
    }
    res.json(task);
});


app.post('/tasks', validateTask, (req, res) => {
    const { title, description, completed } = req.body;
    const newTask = { id: uuidv4(), title, description, completed };
    tasks.push(newTask);
    res.json(newTask);
});



app.put('/tasks/:id', validateTask, (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    const updatedTask = { ...tasks[taskIndex], title, description, completed };
    tasks[taskIndex] = updatedTask;
    res.json(updatedTask);
});




app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(task => task.id === id);
    if (taskIndex === -1) {
        return res.status(404).send('Task not found');
    }
    tasks.splice(taskIndex, 1);
    res.sendStatus(204);
})

