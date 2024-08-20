import React, { useState, useEffect } from "react";

const API_URL = 'https://playground.4geeks.com/todo/users/gabriel_viscio';

const ApiTask = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    useEffect(() => {
        getTasks(); // Fetch tasks when the component mounts
    }, []);

    const getTasks = () => {
        console.log("Fetching tasks...");
        fetch(API_URL)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTasks(data.todos || []); // Use empty array if todos is not available
            })
            .catch((error) => console.error('Error fetching tasks:', error));
    };

    const addTask = () => {
        const taskToAdd = { label: newTask, done: false };

        fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(taskToAdd), // Send the new task object
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setTasks([...tasks, taskToAdd]); // Update state with the new task
                setNewTask(""); // Clear the input field
            })
            .catch((error) => console.error('Error adding task:', error));
    };

    const deleteTask = (taskId) => { // Use a specific task ID for deletion
        fetch(`${API_URL}/${taskId}`, { // Adjust the URL to include the task ID
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                setTasks(tasks.filter((task) => task.id !== taskId)); // Remove the deleted task from state
            })
            .catch((error) => console.error('Error deleting task:', error));
    };

    return (
        <div>
            <h1>Task List</h1>
            <button onClick={getTasks}>Fetch Tasks</button>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.label}
                        <button onClick={() => deleteTask(task.id)}>Delete</button> {/* Assuming task has an id */}
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter new task"
            />
            <button onClick={addTask}>Add Task</button>
        </div>
    );
};

export default ApiTask;
