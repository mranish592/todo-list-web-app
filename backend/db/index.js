const mongoose = require("mongoose");
const dotenv = require('dotenv')
dotenv.config();

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
    competed: Boolean,
    createdAt: Date, 
});

const User = mongoose.model("User", UserSchema);
const Todo = mongoose.model("Todo", TodoSchema);

module.exports = {
    User,
    Todo,
};
