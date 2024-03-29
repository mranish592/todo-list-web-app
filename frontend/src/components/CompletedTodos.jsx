import { Todo } from "./Todo";

export function CompletedTodos({completedTodos, todos, setTodos}){
    const completedTodoElements = completedTodos.map((todo) => (
        <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo>
    ))

    return <>
        <h3>Completed</h3>
        {completedTodoElements}
    </>

}