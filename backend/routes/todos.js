const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Todo } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_PASSWORD
const statusCode = require("http-status")
const { createTodo, updateTodo } = require("../utils/types");

router.post("/", userMiddleware, async(req, res) => {
    const payload = req.body;
    const parsedPayload = createTodo.safeParse(payload);
    if(!parsedPayload.success) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Ill-formatted request body"
        })
    }
    const username = res.locals.username;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(statusCode.NOT_FOUND).json({
            message: "Did not find associated user for token",
        });
    }

    const todoPayload = parsedPayload.data;
    const todo = new Todo({
        title: todoPayload.title,
        description: todoPayload.description,
        completed: false,
        createdAt: new Date(),
    })

    try {
        const savedTodo = await todo.save();
        console.log("Todo saved", savedTodo)
        const oldTodos = existingUser.todos
        const newTodos = [...oldTodos, todo._id.toString()]
        const updatedUser = await User.findByIdAndUpdate(existingUser._id, {todos: newTodos}, {new: true});
        console.log("user updated", updatedUser)
        return res.status(statusCode.OK).json({ 
            message: "Todo created successfully", 
            id: todo._id.toString()
        });
    } catch (error) {
        console.error("Error in saving todo", error);
        return es.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Error Saving todo" });
    }
})

router.get("/", userMiddleware, async(req, res) => {
    const username = res.locals.username;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Can't signup, username already exists",
        });
    }
    const todoIds = existingUser.todos
    try {
        const todosFromDB = await Todo.find({ _id: { $in: todoIds } });
        const todos = todosFromDB.map((todo) => {
            return {
                title: todo.title,
                description: todo.description,
                completed: todo.completed
            }
        })
        console.log("Todos found", todos);
        return res.status(statusCode.OK).json({
            username: username, 
            todos: todos 
        });
      } catch (error) {
        console.error("Error finding todos", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ 
            message: "Error finding todos" 
        });
      }
})

router.put("/", userMiddleware, async(req, res) => {
    const payload = req.body;
    const parsedPayload = updateTodo.safeParse(payload);
    if(!parsedPayload.success) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Ill-formatted request body"
        })
    }
    const todoPayload = parsedPayload.data;
    const newTodo = {
        title: todoPayload.title,
        description: todoPayload.description,
        completed: false,
    }

    const username = res.locals.username;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser.todos.includes(todoPayload.id)) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: `Invalid update. todoId: ${todoPayload.id} is not associated with the username: ${username}`,
        });
    }

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(todoPayload.id, newTodo, {new: true})
        console.log("Todo updated", updatedTodo);
        return res.status(statusCode.OK).json({ 
            message: "Todo updated successfully", 
            id: updatedTodo._id.toString()
        });
    } catch (error) {
        console.error("Error in updating todo", error);
        return es.status(statusCode.INTERNAL_SERVER_ERROR).json({ 
            message: `Error updating todo: ${todoPayload.id}` 
        });
    }
})

router.delete("/:todoId", userMiddleware, async(req, res) => {
    const username = res.locals.username;
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(statusCode.NOT_FOUND).json({
            message: "Did not find associated user for token",
        });
    }
    const deleteTodoId = req.params.todoId;
    const newTodos = existingUser.todos.filter((todo) => {
        return todo != deleteTodoId
    })

    try {
        const updatedUser = await User.findByIdAndUpdate(existingUser._id, {todos: newTodos}, {new: true});
        console.log(`deleted todo ${deleteTodoId} and updated user`, updatedUser)
        const deletedTodo = await Todo.findByIdAndDelete(deleteTodoId);
        console.log("Todo deleted", deletedTodo);
        if(deletedTodo === null){
            return res.status(statusCode.NOT_FOUND).json({ 
                message: `No Todo found with id: ${deleteTodoId}`, 
            });
        }
        return res.status(statusCode.OK).json({ 
            message: "Todo deleted successfully", 
        });
    } catch (error) {
        console.error("Error in deleting todo", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Error deleting todo" });
    }
})

module.exports = router;
