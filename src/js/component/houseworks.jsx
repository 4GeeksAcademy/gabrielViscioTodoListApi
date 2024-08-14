import React, { useState } from 'react';
import '../../styles/index.css';
import backgroundimg from '/workspaces/gabrielViscioTodoList/src/img/gris.jpg';

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

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addHouseWork();
        }
    };

    return (
        <div 
            className="container" 
            style={{
                width: '50rem', 
                backgroundImage: `url(${backgroundimg})`, 
                backgroundSize: 'cover', 
                margin: 'auto' 
            }}>
            <h1 style={{opacity:'40%', fontSize: '6rem', textAlign:'center', color:'#7e610a', fontWeight: 100, textDecoration: 'none' }}>todos</h1>
            <div style={{ backgroundColor: 'white', width: '35rem', margin: 'auto' }}>
                <input
                    style={{ width: '35rem', height:'3.5rem', border:'none' }}
                    type="text"
                    value={newWork}
                    onChange={(e) => setNewWork(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="what needs to be done?"
                />
                <ul
                    style={{ listStyle: 'none', padding: 0 }}
                    className="list-group">
                    {houseWorks.map((work, index) => (
                        <li key={index} className="list-group-item" style={{color:'grey',display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                            <span>{work}</span>
                            <button 
                                onClick={() => removeHouseWork(index)}
                                id={`remove-button-${index}`}
                                className="remove-button"
                                style={{
                                    backgroundColor: 'transparent',
                                    border: 'none',
                                    color: 'grey',
                                    fontSize: '1.2rem',
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
