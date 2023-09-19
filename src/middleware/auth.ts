import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express'; // Import express types
dotenv.config();

// Extend the Express Request interface to include the user property
declare global {
    namespace Express {
      interface Request {
        user?: any; // Adjust the type as needed for your user data
      }
    }
  }

const authenticateJwt = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.SECRET || "", (err, info) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = info
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

export {
  authenticateJwt,
};
