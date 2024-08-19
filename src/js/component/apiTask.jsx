import React, { useState, useEffect } from "react";

const API_URL = 'https://playground.4geeks.com/todo/users/gabriel_viscio';

const ApiTask = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState("");

    // Obtener las tareas desde la API
    const getTasks = () => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                if (data && data.todos) {
                    setTasks(data.todos);
                } else {
                    console.error("La respuesta de la API no tiene el formato esperado:", data);
                }
            })
            .catch(error => console.error('Error al obtener las tareas:', error));
    };

    // Añadir una nueva tarea
    const addTask = () => {
        if (newTask.trim() === "") return;

        const newTaskObject = { label: newTask, is_done: false };

        const body = {
            name: "gabriel_viscio",
            todos: [...tasks, newTaskObject]
        };

        fetch(API_URL, {
            method: "PUT", // Cambiar a PUT ya que se podría estar reemplazando la lista completa
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar las tareas');
            }
            return response.json();
        })
        .then(() => {
            setNewTask("");
            getTasks(); // Refrescar las tareas después de la actualización
        })
        .catch(error => console.error('Error actualizando las tareas:', error));
    };

    // Eliminar una tarea
    const deleteTask = (index) => {
        const updatedTasks = tasks.filter((_, i) => i !== index);

        const body = {
            name: "gabriel_viscio",
            todos: updatedTasks
        };

        fetch(API_URL, {
            method: "PUT", // Cambiar a PUT ya que se podría estar reemplazando la lista completa
            body: JSON.stringify(body),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al actualizar las tareas');
            }
            return response.json();
        })
        .then(() => getTasks())
        .catch(error => console.error('Error actualizando las tareas:', error));
    };

    useEffect(() => {
        getTasks();
    }, []);

    return (
        <>
            <h1>Lista de Tareas</h1>
            <ul>
                {tasks.map((task, index) => (
                    <li key={index}>
                        {task.label}
                        <button onClick={() => deleteTask(index)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={addTask}>Añadir Tarea</button>
        </>
    );
};

export default ApiTask;
