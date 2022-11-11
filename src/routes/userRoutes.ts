// /src/routes/userRoutes.ts

import express from "express";
import UserController from '../controllers/userController';
import { jwtGuard }  from '../utils/passport'

export const userRouter = express.Router();
userRouter.route('').post(jwtGuard, UserController.register);
userRouter.route('/:id').get(jwtGuard, UserController.getUser);
userRouter.route('/getUserByUserName/:userName').get(jwtGuard, UserController.getUserByUserName);
userRouter.route('/getUserByEmail/:email').get(jwtGuard, UserController.getUserByEmail);
userRouter.route('/:id').delete(jwtGuard,  UserController.deleteUser);
userRouter.route('/:id').put(jwtGuard, UserController.updateUserById);
userRouter.route('').get(jwtGuard, UserController.getUsers);

