// /src/models/db.ts
import mongoose from "mongoose";
import User from './userModel';
import { MONGODB_URI, DEFAULT_ADMIN_NAME, DEFAULT_ADMIN_PWD, DEFAULT_ADMIN_EMAIL, DEFAULT_ADMIN_LASTNAME, DEFAULT_ADMIN_FIRSTNAME,DEFAULT_ADMIN_PROVIDER,DEFAULT_ADMIN_ACCOUNT, DEFAULT_ADMIN_ROLE} from "../utils/env";
import logger from "../utils/logger";


export function startDB(){
    const mongoUrl = MONGODB_URI
    logger.info(" URL MongoDB="+mongoUrl);
    mongoose.connect(mongoUrl, { useNewUrlParser: true , useCreateIndex: true, useUnifiedTopology: true }, (err: any) => {
        if (!err) {
            logger.info (" Successfully connected to MongoDB: "+mongoUrl); 
        } else {
            logger.error(err.message);
            process.exit(1);
        }
    });
}

export var wait = ms => new Promise((r, j)=>setTimeout(r, ms))

export async function initDB(){
    await createAdmin()
}

async function createAdmin(){
    let count = await User.estimatedDocumentCount().exec();
    if( count === 0) {
        logger.info (" Create initial ADMIN account")
        let userData = {
            //_id: mongoose.Types.ObjectId(DEFAULT_ADMIN_ID),
            userName:DEFAULT_ADMIN_NAME,
            firstName:DEFAULT_ADMIN_FIRSTNAME,
            lastName:DEFAULT_ADMIN_LASTNAME,
            roleOfUser:DEFAULT_ADMIN_ROLE,
            email:DEFAULT_ADMIN_EMAIL,
            password:DEFAULT_ADMIN_PWD,
            provider:DEFAULT_ADMIN_PROVIDER,
            account: DEFAULT_ADMIN_ACCOUNT
            }
        await User.create(userData, (err, user) => {
            if(err){
                return logger.error(err.stack)
            }
        });
     }else {
        logger.info (" ADMIN account already exist!")
    }
}


