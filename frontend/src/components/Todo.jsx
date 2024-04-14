import Cookies from 'js-cookie';
import { Button } from './ui/button';
import { Trash2Icon } from 'lucide-react';

  

export function Todo({todo, setTodos, todos}){
    async function handleCheckboxChange(event){
        console.log(event)
        const isCompleted = event.target.checked;
        console.log(isCompleted)
        try {
            const response = await fetch("http://localhost:3000/todos/", {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`
                },
                body: JSON.stringify({
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    completed: isCompleted
                })
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            const updatedTodos = todos.map( it => {
                if (it.id === todo.id) {
                return { ...it, completed: isCompleted }; // Toggle the completed status
                }
                return it;
            });
            setTodos(updatedTodos)
      } catch (error) {
          console.error('Error:', error);
          alert("Could not update todo. Issue with backend")
      }
    }

    async function handleDeleteTodo(){
        try {
            const todoId = todo.id
            const response = await fetch(`http://localhost:3000/todos/${todoId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${Cookies.get('accessToken')}`
                }
            });
        
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
    
            const data = await response.json();
            console.log(data);
            const updatedTodos = todos.filter( it => {
                return it.id !== todo.id
            });
            setTodos(updatedTodos)
      } catch (error) {
          console.error('Error:', error);
          alert("Could not delete todo. Issue with backend")
      }
    }

    return <>
        <div className="grid sm:grid-cols-12">
            <div className="align-middle sm:col-span-1">
                {todo.completed ? <input type="checkbox" onChange={handleCheckboxChange} checked/> : <input type="checkbox" onChange={handleCheckboxChange}/>}
            </div>
            <div className="align-middle sm:col-span-10">
                <div className="font-semibold">{todo.title}</div>
                <div className="text-sm">{todo.description}</div>
            </div>
            <div className="align-middle sm:col-span-1">
            <Button variant="outline" size="icon" onClick={handleDeleteTodo}>
                <Trash2Icon className="h-4 w-4" />
            </Button>
            </div>
        </div>
    </>



}
