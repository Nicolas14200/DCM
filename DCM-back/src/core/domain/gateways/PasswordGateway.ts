export interface PasswordGateway {
    encrypt(password: string) : Promise<string>;
    comparePassword(password: string, passwordHash: string) : Promise<boolean>;
}