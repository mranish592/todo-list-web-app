import { Todo } from "./Todo";
import { Table, 
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow, } from "@/components/ui/table";
    
export function CompletedTodos({completedTodos, todos, setTodos}){
    const completedTodoElements = completedTodos.map((todo) => (
        <TableRow>
            <TableCell>
                <Todo key={todo.id} todo={todo} setTodos={setTodos} todos={todos}></Todo>
            </TableCell>                    
        </TableRow>
    ))

    return <>
        <div className="text-xl font-bold my-1.5">Completed</div>
        {completedTodoElements}
    </>

}