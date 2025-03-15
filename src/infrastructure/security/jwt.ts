import { User } from "../../features/Users/domain/User";
import * as jwt from "jsonwebtoken";

// JwtService class to handle JWT token generation and verification
export class JwtService {

    private secret = "N345346#$%TBIHD" // Secret key for signing tokens

    // Generate a JWT token for a user
    generateToken(user: User) {
        return jwt.sign({  email: user.getEmail(), username:user.profile.username, id:user.id }, this.secret, { expiresIn: "1h" });
    }
    
    // Verify a JWT token
    verifyToken(token: string) {
        try {
            return jwt.verify(token, this.secret);
        } catch (error) {
            return null
        }
        
    }
}