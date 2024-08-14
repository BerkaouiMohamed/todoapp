const { getTodos, addTodo } = require('../controllers/todosContorllers');

const todoRouter=require('express').Router()

todoRouter.get("/", getTodos);
todoRouter.post("/add",addTodo);

module.exports=todoRouter