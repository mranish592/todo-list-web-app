export function Todo({todo, setTodos, todos}){
    function handleCheckboxChange(event){
        const isCompleted = event.target.checked;
        const updatedTodos = todos.map( it => {
            if (it.id === todo.id) {
              return { ...it, completed: isCompleted }; // Toggle the completed status
            }
            return it;
          });
        setTodos(updatedTodos)
    }

    return <div id={todo.id}>
        <h4>{todo.title}</h4>
        <div>{todo.description}</div>
        {todo.completed ? <input type="checkbox" onChange={handleCheckboxChange} checked/> : <input type="checkbox" onChange={handleCheckboxChange}/>}
    </div>
}
