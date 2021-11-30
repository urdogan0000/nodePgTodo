const express=require('express')
const todoController=require('../controllers/todoController')

const router=express.Router()


//get all todos     url: http://localhost:8080/
router.route('/').get(todoController.getAllTodo)

//get todo by id

//create a todo

//update a todo

//delete a todo 


module.exports= router