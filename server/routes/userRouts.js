import express from 'express'
import { registerUser,loginUser,logoutUser,updateUserRole,deleteUser,getAllUser,getCurrentUser } from '../controllers/userController.js';
import { isAdmin, isAuthenticatedUser } from '../middleware/auth.js';

const router=express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/getCurrUser').get(isAuthenticatedUser,getCurrentUser);
router.route('/admin/users').get(isAuthenticatedUser,isAdmin('admin'),getAllUser);
router.route('/admin/user/:id').patch(isAuthenticatedUser,isAdmin('admin') ,updateUserRole)
                                .delete(isAuthenticatedUser,isAdmin('admin'),deleteUser);


export default router;  