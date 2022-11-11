// /src/controllers/authController.ts

import { Response , NextFunction} from 'express';
import passport from '../utils/passport';

class AuthController {

  public sign_in(req: any, res: Response, next: NextFunction): void {
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(401).json({
              message: 'Authentication failed. Wrong password.',
              user   : user
          });
      }
      req.login(user, {session: false}, async (err) => {
        if (err) {
            res.send(err);
        }
        user.password = undefined;
        return res.json(user);
      });
    })(req, res);
  }
}

export default new AuthController();
