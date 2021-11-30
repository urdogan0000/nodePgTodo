const express=require('express')
const userController=require('../controllers/userController')

const router=express.Router()


router.route('/login').post(userController.loginUser)

router.route('/logout').get(userController.logoutUser)

router.route('/:user_id').get(userController.getUser)

router.route('/signup').post(userController.createUser)

router.route('/:user_id').delete(userController.deleteUser)



module.exports= router