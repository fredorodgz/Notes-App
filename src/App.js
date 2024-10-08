import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);
  const [editInput, setEditInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleAddNote = () => {
    if (input.trim()) {
      setNotes([...notes, input.trim()]);
      setInput('');
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditInput(notes[index]);
  };

  const handleSaveEdit = (index) => {
    const newNotes = notes.map((note, i) => {
      if (i === index) {
        return editInput.trim();
      }
      return note;
    });
    setNotes(newNotes);
    setEditingIndex(null);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  return (
    <div className="App">
      <h1>Notes App</h1>
      <div className="input-container">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type your note here"
        />
        <button onClick={handleAddNote}>Add Note</button>
      </div>
      <div className="notes-container">
        {notes.length === 0 ? (
          <p>No notes yet</p>
        ) : (
          notes.map((note, index) => (
            <div className="note" key={index}>
              {editingIndex === index ? (
                <>
                  <input
                    type="text"
                    value={editInput}
                    onChange={handleEditInputChange}
                  />
                  <button onClick={() => handleSaveEdit(index)}>Save</button>
                  <button onClick={() => setEditingIndex(null)}>Cancel</button>
                </>
              ) : (
              <>
                <p>{note}</p>
                <button onClick={() => handleDeleteNote(index)}>Delete</button>
                <button onClick={() => handleEditClick(index)}>Edit</button>
              </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;
