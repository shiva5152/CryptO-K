import express from 'express'
import { getList,addToFavList,removeFromFavList,getFavList } from '../controllers/listControllers.js';
import {  isAuthenticatedUser, } from '../middleware/auth.js';

const router=express.Router();

router.route('/list').get(getList);
router.route('/adduser').put(isAuthenticatedUser,addToFavList);
router.route('/removeuser').put(isAuthenticatedUser,removeFromFavList);
router.route('/favlist').get(isAuthenticatedUser,getFavList);







export default router;  