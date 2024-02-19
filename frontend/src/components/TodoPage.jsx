import { Todos } from "./Todos"
import { CompletedTodos } from "./CompletedTodos";
import { useState } from "react";
import { ShowCompletedButton } from "./ShowCompletedButton";
import { useEffect } from "react";
import Cookies from "js-cookie";

export function TodoPage(){
    const [todos, setTodos] = useState([
        {id: "1", title: "title 1", description: "description 1", completed: false},
        {id: "2", title: "title 2", description: "description 2", completed: false},
        {id: "3", title: "title 3", description: "description 3", completed: true},
    ]);
    const [showCompleted, setShowcompleted] = useState(false);
    // useEffect(() => {
        // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFuaXNoQGdtYWlsLmNvbSIsImlhdCI6MTcwODE1NTI3Nn0.ARqmyuM0gHuVFFPqN0bg7sCe6JYP7zTKrwyfWn6HzyY";
        // Cookies.set('accessToken', token, { expires: 7 }); // Set cookie with a 7-day expiration
    //   }, []);
    
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
        fetchTodos();
    }, [])

    return <>
        <h1>Hi User,</h1>
        <Todos pendingTodos={todos.filter((todo) => {return todo.completed === false})} setTodos={setTodos} todos={todos}></Todos>
        <ShowCompletedButton setShowCompleted={setShowcompleted} showCompleted={showCompleted}></ShowCompletedButton>
        {showCompleted && <CompletedTodos completedTodos={todos.filter((todo) => {return todo.completed === true})} setTodos={setTodos} todos={todos}></CompletedTodos>    }
        </>

}