import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');

    const fetchTasks = async () => {
        const response = await axios.get('http://localhost:5000/tasks');
        setTasks(response.data);
    };

    const addTask = async () => {
        await axios.post('http://localhost:5000/tasks', { task: newTask });
        setNewTask('');
        fetchTasks();
    };

    const removeTask = (indexToRemove) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToRemove);
        setTasks(updatedTasks); // Update the state
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div className="container">
            <h1>Checklist</h1>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
            />
            <button onClick={addTask}>Add Task</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task}
                        <button className="check" onClick={() => removeTask(index)}>
                            ✅ Check
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;