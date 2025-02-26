import bcrypt from 'bcrypt'
import { IPasswordHashing } from '../../application/security/IPasswordHashing'


export class PasswordHasher implements IPasswordHashing {
    async hashPassword(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    async verifyPassword(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }

}

