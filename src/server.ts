// /server.ts

import errorHandler from "errorhandler";

import * as https from 'https';
import * as fs from 'fs';
import { startDB, initDB } from './models/db'

import app from "./app";
import { ENVIRONMENT, SSL, APP_URI, SWAGGER_URI} from "./utils/env";
import logger from './utils/logger';

async function startserver() {
  try{
    logger.info(" Start Oauth server in mode "+ ENVIRONMENT + " [SSL=" + SSL + "]")
    await startDB();
    await initDB();

    let serverMessage = " App is running at "+ APP_URI +" in ("+ app.get("env") +" mode). Swagger access: "+ SWAGGER_URI +"  Press CTRL-C to stop server.";
    
    if (ENVIRONMENT !== "production")
      app.use(errorHandler());
    
    if (SSL) {

      if (!fs.existsSync("./keys/key.pem")) {
        logger.error("key file does not exist (./keys/key.pem)");
        process.exit(1);
      }

      const httpsOptions = {
          key: fs.readFileSync('./keys/key.pem'),
          cert: fs.readFileSync('./keys/cert.pem')
      }
      https.createServer(httpsOptions, app).listen(app.get("port"), () => {
        logger.info(serverMessage);
      });
    } else {
      app.listen(app.get("port"), () => {
        logger.info(serverMessage);
      });
    }
  }catch(error){
    console.error(error);
    process.exit(1);
  }
}

startserver();
