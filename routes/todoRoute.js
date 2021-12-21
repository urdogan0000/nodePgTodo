const express=require('express')
const todoController=require('../controllers/todoController')

const router=express.Router()


//get all todos     url: http://localhost:8080/
router.route('/').get(todoController.getAllTodo)

//get todo by id
router.route('/:todo_id').get(todoController.getTodo)

//the route needs authantication to create todos
//create a todo
router.route('/').post(todoController.createTodo)

//update a todo
router.route('/:todo_id').put(todoController.updateTodo)

//delete a todo 
router.route('/:todo_id').delete(todoController.deleteTodo)

module.exports= router