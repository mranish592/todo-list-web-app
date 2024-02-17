const z = require("zod");

const createTodo = z.object({
	title: z.string(),
	description: z.string()
});

const updateTodo = z.object({
    id: z.string(),
	title: z.string(),
	description: z.string(),
    completed: z.boolean()
});

module.exports = {
	createTodo: createTodo,
	updateTodo: updateTodo
}