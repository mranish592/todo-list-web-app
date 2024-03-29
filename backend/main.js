const express = require("express");
const statusCode = require("http-status");
const cors = require('cors');
require('dotenv').config();
const userRouter = require("./routes/user");
const todosRouter = require("./routes/todos");

const env = process.env;
const app = express();
app.use(express.json());
app.use(cors());    

console.log("Starting todo web app backend");

app.get("/", (req, res) => {
    res.status(statusCode.OK).json({
        message: "Hi from todo app"
    })
})
app.use("/user", userRouter)
app.use("/todos", todosRouter)

app.listen(env.HTTP_PORT, function () {
    console.log(`Todo web app backend listening on port ${env.HTTP_PORT}`);
});