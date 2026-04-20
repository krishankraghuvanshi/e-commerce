import express from 'express'
const router = express.Router()

import { 
    authUser,
    authGoogleUser,
    registerUser, 
    getUserProfile, 
    updateUserProfile,
    logoutUser,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
 } from '../controllers/userController.js'

 import {protect, admin} from '../middleware/authMiddleware.js'

router.route('/').post(registerUser).get(protect, admin, getUsers)
router.post('/logout', logoutUser)
router.post('/login', authUser)
router.post('/google', authGoogleUser)
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)
router.route('/:id').delete(protect, admin, deleteUser).get(getUserById).put(protect, admin, updateUser)

export default router