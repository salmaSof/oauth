// /app.ts



import express from "express";
import dotenv from "dotenv";
import cors from 'cors'
import { urlencoded, json } from "body-parser";
import { userRouter } from "./routes/userRoutes";
import { authRouter } from "./routes/authRoutes";
import { SRV_PORT, ENVIRONMENT, SWAGGER, DEFAULTPORT} from "./utils/env";
import { API_URI, APP_VERSION, APP_NAME} from './utils/constants'
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger/swagger.json';
import logger from "./utils/logger";

var path = require('path');
var passport = require('passport');

// Load environment variables from .env file
dotenv.config({ path: ".env" });

process.env.NODE_ENV=ENVIRONMENT;

// Create Express server
const app = express();
app.use(passport.initialize());

// Express configuration
app.use(cors());
app.use(urlencoded({extended: true}));
app.use(json());
app.set('port', SRV_PORT || DEFAULTPORT);
app.use(express.static(path.join(__dirname, 'public')));
app.use( API_URI + '/users', userRouter);
app.use( API_URI + '/auth', authRouter);
app.use(SWAGGER, swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/'+APP_NAME+'/version', function (req, res, next) {
    logger.info(" API getVersion used -> "+APP_VERSION)
    return res.json( APP_VERSION );
});
export default app;