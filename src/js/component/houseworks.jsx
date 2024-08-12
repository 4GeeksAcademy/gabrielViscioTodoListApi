import React, { useState } from 'react';

const HouseWorks = () => {
    const [houseWorks, setHouseWorks] = useState([]);
    const [newWork, setNewWork] = useState('');

    
    const addHouseWork = () => {
        if (newWork.trim()) {
            setHouseWorks([...houseWorks, newWork]);
            setNewWork('');  
        }
    };

  
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
                <h4>{houseWorks.length} items left</h4>
            </div>
        </>
    );
};

export default HouseWorks;
