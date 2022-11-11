// /src/routes/authRoutes.ts

import express from "express";
import AuthController from '../controllers/authController';

export const authRouter = express.Router();
authRouter.route('/sign_in').post(AuthController.sign_in);