import { Button } from "./ui/button"
export function AddTodoButton({showAddTodo, setShowAddTodo}){
    return <>
        {showAddTodo ? <></>
        : <Button onClick={()=>{setShowAddTodo(true)}}>+ Add Todo</Button> }
    </>
}