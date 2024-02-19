import { Todo } from "./Todo";

export function Todos({pendingTodos, todos, setTodos}){

    const todoElements = pendingTodos.map((todo) => {
        return <><Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo></>
    })

    return <>
        <h3>Todos</h3>
        {todoElements}
    </>

}