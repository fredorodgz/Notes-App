import React, { useState } from 'react';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]); 
  const [title, setTitle] = useState(''); 
  const [input, setInput] = useState(''); 
  const [category, setCategory] = useState(''); 
  const [editingIndex, setEditingIndex] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editInput, setEditInput] = useState('');
  const [editCategory, setEditCategory] = useState(''); 
  const [searchTerm, setSearchTerm] = useState('');

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleAddNote = () => {
    if (title.trim() && input.trim() && category.trim()) {
      setNotes([...notes, { title: title.trim(), text: input.trim(), category: category.trim() }]);
      setTitle('');
      setInput('');
      setCategory('');
    }
  };

  const handleDeleteNote = (index) => {
    const newNotes = notes.filter((note, i) => i !== index);
    setNotes(newNotes);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditTitle(notes[index].title);
    setEditInput(notes[index].text); 
    setEditCategory(notes[index].category);
  };

  const handleSaveEdit = (index) => {
    const newNotes = notes.map((note, i) => {
      if (i === index) {
        return { title: editTitle.trim(), text: editInput.trim(), category: editCategory.trim() }; 
      }
      return note;
    });
    setNotes(newNotes);
    setEditingIndex(null);
  };

  const handleEditTitleChange = (e) => {
    setEditTitle(e.target.value);
  };

  const handleEditInputChange = (e) => {
    setEditInput(e.target.value);
  };

  const handleEditCategoryChange = (e) => {
    setEditCategory(e.target.value);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredNotes = notes.filter(note => 
    note.title.toLowerCase().includes(searchTerm) || 
    note.text.toLowerCase().includes(searchTerm) || 
    note.category.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <div className="search-container">
        <h1 id='app-title'>Notes</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search notes or categories..."
        />
      </div>
      <div className="both-containers">
        <div className="input-main">
          <div className="input-container">
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              placeholder="Enter title"
            />
            <textarea
              value={input}
              onChange={handleInputChange}
              placeholder="Type your note here"
            />
            <input
              type="text"
              value={category}
              onChange={handleCategoryChange}
              placeholder="Enter category"
            />
            <button onClick={handleAddNote}>Add Note</button>
          </div>
        </div>
        <div className="all-notes-container">
          <h1 id='notes-title'>My Notes</h1>
          <div className="notes-container">
            {filteredNotes.length === 0 ? (
              <p>No notes found</p>
            ) : (
              filteredNotes.map((note, index) => (
                <div className="note" key={index}>
                  {editingIndex === index ? (
                    <>
                    <div className="editing-note-cont">
                      <input
                        type="text"
                        value={editTitle}
                        onChange={handleEditTitleChange}
                        placeholder="Edit title"
                      />
                      <textarea
                        value={editInput}
                        onChange={handleEditInputChange}
                        placeholder="Edit note"
                      />
                      <input
                        type="text"
                        value={editCategory}
                        onChange={handleEditCategoryChange}
                        placeholder="Edit category"
                      />
                      <div className="note-buttons">
                        <button id="save-button" onClick={() => handleSaveEdit(index)}>Save</button>
                        <button id="cancel-button" onClick={() => setEditingIndex(null)}>Cancel</button>
                      </div>
                    </div>
                    </>
                  ) : (
                    <>
                      <p className="note-title"><strong>{note.title}</strong></p>
                      <p className="note-text">{note.text}</p>
                      <p className="note-category"><strong>{note.category}</strong></p>
                      <div className="note-buttons">
                        <button id="delete-button" onClick={() => handleDeleteNote(index)}>Delete</button>
                        <button id="edit-button" onClick={() => handleEditClick(index)}>Edit</button>
                      </div>
                    </>
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
