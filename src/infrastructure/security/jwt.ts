import { User } from "../../features/Users/domain/User";
import * as jwt from "jsonwebtoken"



export class JwtService {

    private secret = "N345346#$%TBIHD"

    generateToken(user: User) {
        return jwt.sign({  email: user.getEmail() }, this.secret, { expiresIn: "1h" });
    }
    
    verifyToken(token: string) {
        return jwt.verify(token, this.secret);
    }
}