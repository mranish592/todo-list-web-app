export function AddTodoButton({showAddTodo, setShowAddTodo}){
    return <>
        {showAddTodo ?  <button onClick={() => {setShowAddTodo(false)}}>Cancel</button> 
        : <button onClick={()=>{setShowAddTodo(true)}}>+ Add Todo</button> }
    </>
}