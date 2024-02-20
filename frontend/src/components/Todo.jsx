import Cookies from 'js-cookie';

export function Todo({todo, setTodos, todos}){
    async function handleCheckboxChange(event){
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

    return <div id={todo.id}>
        <h4>{todo.title}</h4>
        <div>{todo.description}</div>
        {todo.completed ? <input type="checkbox" onChange={handleCheckboxChange} checked/> : <input type="checkbox" onChange={handleCheckboxChange}/>}
        <button onClick={handleDeleteTodo}>delete todo</button>
    </div>
}
