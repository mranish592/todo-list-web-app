import { Todo } from "./Todo";
import { Table, 
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "@/components/ui/table";

import { AddTodo } from "./AddTodo";

export function Todos({pendingTodos, todos, setTodos}){

    const todoElements = pendingTodos.map((todo) => (
        <TableRow key={todo.id}>
            <TableCell>
                <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo>
            </TableCell>                    
        </TableRow>
    
    ));

    return <>
        <div className="text-xl font-bold my-1.5">Todos</div>
        {todoElements}
    </>

}