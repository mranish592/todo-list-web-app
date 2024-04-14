import Cookies from 'js-cookie';
import React, { useState } from 'react';
import { Trash2Icon } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';

export function AddTodo({todos, setTodos, setShowAddTodo}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if title is empty
    if (!title.trim()) {
      return;
    }
    try {
        const response = await fetch("http://localhost:3000/todos/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${Cookies.get('accessToken')}`
            },
            body: JSON.stringify({
                title: title,
                description: description
            })
        });
      
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        console.log(data);
        const id = data.id;
        const newTodo = {
            id: id,
            title: title,
            description: description,
            completed: false
        }
        setTodos([...todos, newTodo]);
        setShowAddTodo(false);
        alert("Todo Added")
        
    } catch (error) {
        console.error('Error:', error);
        alert("Could not add todo. Issue with backend")
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
      {/* <h2>Add Todo</h2>
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
      <button type="submit">Add Todo</button> */}
      <div className="border-2 p-2 rounded-md">
        <div className="max-w-96 my-2">
          <Input type="text" id="title" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}/>
        </div>
        <div className="max-w-xl my-2">
          <Textarea id="description" value={description} placeholder="Type your description here." onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <div className="my-2">
          <Button type="submit" className="mx-2">Add Todo</Button>
          <Button variant="secondary" className="mx-2" onClick={() => {setShowAddTodo(false)}}>Cancel</Button>
        </div>
      </div>
    </form>
  );
}
