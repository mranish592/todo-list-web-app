const mongoose = require("mongoose");
require('dotenv').config();
// dotenv.config();


// Connect to MongoDB
mongoose.connect(
    process.env.MONGO_DB_CONNECTION_STRING
);

const UserSchema = new mongoose.Schema({
    // Schema definition here
    username: String,
    password: String,
    todos: Array,
});

const TodoSchema = new mongoose.Schema({
    // Schema definition here
    title: String,
    description: String,
    completed: Boolean,
    createdAt: Date, 
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
    User,
    Todo,
};
