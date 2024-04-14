import { Todo } from "./Todo";
import { Table, 
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "@/components/ui/table";

export function Todos({pendingTodos, todos, setTodos}){

    const todoElements = pendingTodos.map((todo) => (
        <TableRow>
            <TableCell>
                <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo>
            </TableCell>                    
        </TableRow>
    
    ));

    return <>
        <h3>Todos</h3>
        {todoElements}
    </>

}