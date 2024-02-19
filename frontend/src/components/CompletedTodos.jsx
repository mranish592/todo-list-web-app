import { Todo } from "./Todo";

export function CompletedTodos({completedTodos, todos, setTodos}){
    console.log("completedTodos", completedTodos)

    const todoElements = completedTodos.map((todo) => {
        return <><Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo></>
    })

    return <>
        <h3>Completed</h3>
        {todoElements}
    </>

}