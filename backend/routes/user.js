const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middlewares/user");
const { User, Todo } = require("../db");
const jwt = require("jsonwebtoken");
const jwtPassword = process.env.JWT_PASSWORD
const statusCode = require("http-status")

// User Routes
router.post("/signup", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username: username });
    console.log(existingUser);
    if (existingUser) {
        return res.status(statusCode.BAD_REQUEST).json({
            message: "Can't signup, username already exists",
        });
    }

    const user = new User({
        username: username,
        password: password,
        todos: [],
    });

    user.save()
        .then(() => {
            console.log("User saved");
            res.status(statusCode.OK).json({ message: "User created successfully" });
        })
        .catch((error) => {
            console.error("Error in saving user", error);
            res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Error Saving user" });
        });
});

router.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "Incorrect username or password",
        });
    }

    if (
        existingUser.username != username ||
        existingUser.password != password
    ) {
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "Incorrect username or password",
        });
    }

    const token = jwt.sign({ username }, jwtPassword);
    return res.status(statusCode.OK).json({
        username: username,
        token: token,
    });
});

router.get("/info", userMiddleware, async (req, res) => {
    const username = res.locals.username;
    if(username === undefined){
        return res.status(statusCode.UNAUTHORIZED).json({
            message: "Could not get username from token",
        });
    }
    const existingUser = await User.findOne({ username: username });
    if (!existingUser) {
        return res.status(statusCode.NOT_FOUND).json({
            message: "Can't get info, username does not exists",
        });
    }

    return res.status(statusCode.OK).json({
        username: existingUser.username,
        todos: existingUser.todos
    })
});

module.exports = router;
