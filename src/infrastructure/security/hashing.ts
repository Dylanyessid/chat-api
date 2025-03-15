import bcrypt from 'bcrypt'
import { IPasswordHashing } from '../../application/security/IPasswordHashing'

// This class provides methods for hashing and verifying passwords using bcrypt
export class PasswordHasher implements IPasswordHashing {
    // Hashes a password with a salt rounds of 10
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    // Verifies a password against a given hash
    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}

