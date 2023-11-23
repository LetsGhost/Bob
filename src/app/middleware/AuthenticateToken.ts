import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

class AuthenticateToken{
    async authenticateToken(req: Request, res: Response, next: NextFunction) {
        try {
            let token = req.headers.token; // Assuming you set the token as 'token' cookie

            if (!token) {
                return res.status(401).json({ message: 'Token not provided' });
            }

            // Ensure token is a string
            if (Array.isArray(token)) {
                token = token[0]; // or token.join('') depending on your use case
            }
            const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as any as { userId: string, userRole: string };

            req.params.userId = decodedToken.userId;
            req.params.userRole = decodedToken.userRole;

            next();
        } catch (error) {
            console.log("Error authenticating token: ", error)
            return res.status(401).json({ message: 'Invalid token' });
        }
    };
}

export default new AuthenticateToken();