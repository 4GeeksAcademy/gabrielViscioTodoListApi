import React, { useState } from 'react';

const HouseWorks = () => {
    const [houseWorks, setHouseWorks] = useState([]);
    const [newWork, setNewWork] = useState('');

    // Función para agregar una nueva tarea
    const addHouseWork = () => {
        if (newWork.trim()) {
            setHouseWorks([...houseWorks, newWork]);
            setNewWork('');  // Limpiar el input después de agregar
        }
    };

    // Función para eliminar una tarea
    const removeHouseWork = (indexToRemove) => {
        const updatedHouseWorks = houseWorks.filter((_, index) => index !== indexToRemove);
        setHouseWorks(updatedHouseWorks);
    };

    return (
        <>  
            <div className="text-center">
                <h1>todos</h1>
                <input 
                    type="text" 
                    value={newWork}
                    onChange={(e) => setNewWork(e.target.value)}
                    placeholder="what needs to be done?"
                />
                <button onClick={addHouseWork}>Agregar</button>
                <ul>
                    {houseWorks.map((work, index) => (
                        <li key={index}>
                            {work}
                            <button onClick={() => removeHouseWork(index)}>x</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default HouseWorks;
