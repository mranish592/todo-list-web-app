import React, { useState } from 'react';

export function AddTodo({todos, setTodos}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Check if title is empty
    if (!title.trim()) {
      return;
    }
    // Create todo object
    const newTodo = {
      title: title,
      description: description
    };
    // Call the onAdd function with the new todo object
    // onAdd(newTodo);
    console.log(newTodo)
    // Clear form fields
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Todo</h2>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <button type="submit">Add Todo</button>
    </form>
  );
}
