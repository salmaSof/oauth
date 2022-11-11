// /src/controllers/userController.ts
import Web3Instance from "../utils/web3";
import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';
import User from '../models/userModel';

class UserController {


  public getUser(req: Request, res: Response, next: NextFunction): void {
    User.findOne({
      _id: req.params.id
    })
      .populate('role', '-_id -__v')
      .then((user) => {
        if (user) {
          user.password = undefined;
          logger.info(" API Get user(" + user.userName + ")");
          res.status(200).json(user);
        } else {
          res.status(404).json("User " + req.params.id + " not found!");
        }
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });
  }

  public getUsers(req: Request, res: Response, next: NextFunction): void {

    User.find()
      .populate('role', '-_id -__v')
      .sort({ createdAt: -1 })
      .select("-password")
      .select("-accessToken")
      .select("-CRSToken")
      .then((users) => {
        logger.info(" API Get list of users...");
        res.status(200).json(users);
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });



  }

  public async updateUserById(req: Request, res: Response, next: NextFunction) {

    let params = {
      userName: req.body.userName,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      roleOfUser: req.body.roleOfUser,
      email: req.body.email,
      password: req.body.password,
      provider: req.body.provider,
      account: req.body.account
    };

    for (let prop in params) if (!params[prop]) delete params[prop];
    User.findOneAndUpdate({ _id: req.params.id }, params, { new: true })
      .populate('role', '-_id -__v')
      .then((user) => {
        if (user) {
          logger.info(" API Update user(" + user.userName + ")");
          //user.password = undefined,
          res.status(200).json(user);
        } else {
          res.status(404).json("User not found!");
        }
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });
  }

  public async register(req: Request, res: Response, next: NextFunction) {
    let providerAccounts = await Web3Instance(req.query.provider).eth.getAccounts();
    let allocated = null;
    User.find().select("account").then((registred) => {
      const users = registred.map(registred => registred.account);
      for (const account of providerAccounts) {

        if (users.indexOf(account) == -1) {
          allocated = account;
          break;
        }

      }
      if (!allocated) {
        res.status(401).json("No available account")
        return;
      }

      User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        roleOfUser: req.body.roleOfUser,
        email: req.body.email,
        password: req.body.password,
        provider: req.query.provider,
        account: allocated
      })
        .then(async (user) => {
          user.password = undefined;
          logger.info("Register user: " + user.userName);

          res.status(201).json(user);
        })
        .catch((error: Error) => {
          logger.error("error: " + error.message + " errorStack:" + error.stack)
          res.status(500).json({
            error: "Internal Server Error"
          });
          next(error);
        })
    })



  }

  public deleteUser(req: Request, res: Response, next: NextFunction): void {
    User.findOneAndDelete({
      _id: req.params.id
    })
      .then((user) => {
        if (user) {
          logger.info(" API Delete user (" + user.userName + ")");
          res.status(202).json();
        } else {
          res.status(404).json("User " + req.params.id + " not found!");
        }
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });
  }

  public getUserByEmail(req: Request, res: Response, next: NextFunction): void {
    User.findOne({ email: req.params.email })
      .populate('role', '-_id -__v')
      .then((user) => {
        if (user) {
          user.password = undefined;
          logger.info(" API Get user(" + user.userName + ")");
          res.status(200).json(user);
        } else {
          res.status(404).json("User email " + req.params.email + " not found!");
        }
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });
  }

  public getUserByUserName(req: Request, res: Response, next: NextFunction): void {
    User.findOne({ userName: req.params.userName })
      .populate('role', '-_id -__v')
      .then((user) => {
        if (user) {
          user.password = undefined;
          logger.info(" API Get user(" + user.userName + ")");
          res.status(200).json(user);
        } else {
          res.status(404).json("User name " + req.params.userName + " not found!");
        }
      })
      .catch((error: Error) => {
        logger.error("error: " + error.message + " errorStack:" + error.stack)
        res.status(500).json({
          error: "Internal Server Error"
        });
        next(error);
      });
  }


}



export default new UserController();
