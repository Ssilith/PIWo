import React from 'react';

const buttonStyle = {
    padding: '10px 20px',
    margin: '10px',
    backgroundColor: '#f0f0f0',
    border: '1px solid #ddd',
    borderRadius: '5px',
    cursor: 'pointer',
};

const NoIdea = () => {
    const buttons = Array.from({ length: 100 }, (_, i) => (
        <button key={i} style={buttonStyle} onClick={() => alert('No idea')}>
            No idea {i + 1}
        </button>
    ));

    return (
        <div>
            <h1>No Idea</h1>
            {buttons}
        </div>
    );
};

export default NoIdea;