import { Todos } from "./Todos"
import { CompletedTodos } from "./CompletedTodos";
import { useState } from "react";
import { ShowCompletedButton } from "./ShowCompletedButton";

export function TodoPage(){
    const [todos, setTodos] = useState([
        {id: "1", title: "title 1", description: "description 1", completed: false},
        {id: "2", title: "title 2", description: "description 2", completed: false},
        {id: "3", title: "title 3", description: "description 3", completed: true},
    ]);
    const [showCompleted, setShowcompleted] = useState(false);

    return <>
        <h1>Hi User,</h1>
        <Todos pendingTodos={todos.filter((todo) => {return todo.completed === false})} setTodos={setTodos} todos={todos}></Todos>
        <ShowCompletedButton setShowCompleted={setShowcompleted} showCompleted={showCompleted}></ShowCompletedButton>
        {showCompleted && <CompletedTodos completedTodos={todos.filter((todo) => {return todo.completed === true})} setTodos={setTodos} todos={todos}></CompletedTodos>    }
        </>

}