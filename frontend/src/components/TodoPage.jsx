import { Todos } from "./Todos"
import { CompletedTodos } from "./CompletedTodos";
import { useState } from "react";
import { ShowCompletedButton } from "./ShowCompletedButton";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { AddTodoButton } from "./AddTodoButton";
import { AddTodo } from "./AddTodo";

export function TodoPage(){
    const [todos, setTodos] = useState([
        {id: "1", title: "title 1", description: "description 1", completed: false},
        {id: "2", title: "title 2", description: "description 2", completed: false},
        {id: "3", title: "title 3", description: "description 3", completed: true},
    ]);
    const [showCompleted, setShowcompleted] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [username, setUsername] = useState("user");
    
    useEffect(() => {
        async function fetchTodos(){
            const token = Cookies.get('accessToken');
            const response = await fetch("http://localhost:3000/todos/", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const result = await response.json();
            console.log(result, result.todos);
            setTodos(result.todos);
        }
        setUsername(Cookies.get('username') ? Cookies.get('username'): "user")
        
        fetchTodos();
    }, []);

    return <>
        <h1>Hi {username}</h1>
        <AddTodoButton showAddTodo={showAddTodo} setShowAddTodo={setShowAddTodo}></AddTodoButton>
        {showAddTodo && <AddTodo todos={todos} setTodos={setTodos}></AddTodo>}
        <Todos pendingTodos={todos.filter((todo) => {return todo.completed === false})} setTodos={setTodos} todos={todos}></Todos>
        <ShowCompletedButton setShowCompleted={setShowcompleted} showCompleted={showCompleted}></ShowCompletedButton>
        {showCompleted && <CompletedTodos completedTodos={todos.filter((todo) => {return todo.completed === true})} setTodos={setTodos} todos={todos}></CompletedTodos>    }
        </>

}