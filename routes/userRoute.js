const express=require('express')
const userController=require('../controllers/userController')
const redirectMiddleware=require('../middlewares/redirectMiddleware')

const router=express.Router()

//this redirectMiddleware check the user logged in before if login redirect main page else usercontroller.loginUser
router.route('/login').post(redirectMiddleware,userController.loginUser)

router.route('/logout').get(userController.logoutUser)

router.route('/:user_id').get(userController.getUser)

router.route('/signup').post(redirectMiddleware,userController.createUser)

router.route('/:user_id').delete(userController.deleteUser)



module.exports= router