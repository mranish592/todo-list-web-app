import { Todos } from "./Todos"
import { CompletedTodos } from "./CompletedTodos";
import { useState } from "react";
import { ShowCompletedButton } from "./ShowCompletedButton";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { AddTodoButton } from "./AddTodoButton";
import { AddTodo } from "./AddTodo";
import { LogoutButton } from "./LogoutButton";
import { Navbar } from "./Navbar";

const SERVER_URL = process.env.SERVER_URL; 


export function TodoPage(){
    const [todos, setTodos] = useState([]);
    const [showCompleted, setShowcompleted] = useState(false);
    const [showAddTodo, setShowAddTodo] = useState(false);
    const [username, setUsername] = useState("user");
    
    useEffect(() => {
        async function fetchTodos(){
            const token = Cookies.get('accessToken');
            const response = await fetch(`${SERVER_URL}/todos/`, {
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

    return <div className="m-4">
        {/* <h1 className="text-2xl font-bold my-1.5">Hi {username}</h1> */}
        {/* <LogoutButton></LogoutButton> */}
        <Navbar username={username}></Navbar>
        <Todos pendingTodos={todos.filter((todo) => {return todo.completed === false})} setTodos={setTodos} todos={todos}></Todos>
        <AddTodoButton showAddTodo={showAddTodo} setShowAddTodo={setShowAddTodo}></AddTodoButton>
        {showAddTodo && <AddTodo todos={todos} setTodos={setTodos} setShowAddTodo={setShowAddTodo}></AddTodo>}

        <div className="mt-20">
            <ShowCompletedButton setShowCompleted={setShowcompleted} showCompleted={showCompleted}></ShowCompletedButton>
            {showCompleted && <CompletedTodos completedTodos={todos.filter((todo) => {return todo.completed === true})} setTodos={setTodos} todos={todos}></CompletedTodos> }
        </div>
        
        </div>

}