
import React, { useState, useEffect } from "react";
import "../../styles/index.css"


const ApiTask = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTaskId, setEditTaskId] = useState(null);
  const [editTaskLabel, setEditTaskLabel] = useState("");

  const getTasks = async () => {
    try {
      const response = await fetch("https://playground.4geeks.com/todo/users/gabriel_viscio", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setTasks(data.todos || []);
    } catch (error) {
      console.error(error);
    }
  };

  const createTask = async (taskLabel) => {
    const newTask = { label: taskLabel, done: false };
    try {
      const response = await fetch("https://playground.4geeks.com/todo/todos/gabriel_viscio", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });
      if (response.ok) {
        getTasks();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const updateTask = async (id, updatedTask) => {
    try {
      const response = await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedTask),
      });
      if (response.ok) {
        getTasks();
        setEditTaskId(null);
        setEditTaskLabel("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      getTasks();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;
    createTask(newTask);
    setNewTask("");
  };

  const handleUpdateSubmit = (e) => {
    e.preventDefault();
    if (editTaskLabel.trim() === "") return;
    updateTask(editTaskId, { label: editTaskLabel, done: false });
  };

  return (
    <div className="container-fluid">
      <h1>Lista de tareas</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} placeholder="Agregar nueva" />
        <button type="submit">Agregar tarea</button>
      </form>

      {editTaskId && (
        <form onSubmit={handleUpdateSubmit}>
          <input
            type="text"
            value={editTaskLabel}
            onChange={(e) => setEditTaskLabel(e.target.value)}
            placeholder="Editar tarea"
          />
          <button type="submit">Actualizar tarea</button>
        </form>
      )}

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editTaskId === task.id ? <span>{editTaskLabel}</span> : <span>{task.label}</span>}
            <div className="buttons-container">
              <button className="edit-button" onClick={() => setEditTaskId(task.id) || setEditTaskLabel(task.label)}>
                Editar
              </button>
              <button className="delete-button" onClick={() => deleteTask(task.id)}>
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ApiTask;
