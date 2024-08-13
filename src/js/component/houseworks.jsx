import React, { useState } from 'react';
import '../../styles/index.css';

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
        <div className="" style={{ width: '50rem', backgroundColor: 'lightgrey', margin: 'auto' }}>
            <h1 style={{ fontSize: '5rem', textAlign:'center', color:'grey', }}>todos</h1>
            <div style={{ backgroundColor: 'white', width: '35rem', margin: 'auto' }}>
                <input
                    style={{ width: '35rem' }}
                    type="text"
                    value={newWork}
                    onChange={(e) => setNewWork(e.target.value)}
                    placeholder="what needs to be done?"
                />
                <button onClick={addHouseWork}>Agregar</button>
                <ul
                    style={{ listStyle: 'none', padding: 0 }}
                    className="list-group">
                    {houseWorks.map((work, index) => (
                        <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                            <span>{work}</span>
                            <button 
                                onClick={() => removeHouseWork(index)}
                                id={`remove-button-${index}`}
                                style={{
                                   // Por defecto oculto
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'red',
                                    fontSize: '1rem',
                                    cursor: 'pointer'
                                }}>
                                x
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
            <div style={{height:'8px',backgroundColor:'white',width:'34.7rem',margin:'auto',marginTop:'1px',}}></div>
            <div style={{height:'6px',backgroundColor:'white',width:'34rem',margin:'auto',marginTop:'1px'}}></div>
            <h4 style={{marginLeft:'1rem', color:'grey',}}>{houseWorks.length} items left</h4>
        </div>
    );
};

export default HouseWorks;
