export class Password {
    value : string;
    constructor(password : string){
        const passwordValidate: boolean = this.passwordValid(password);
        if(!passwordValidate){
            throw new Error("INVALID_PASSWORD_FORMAT")
        }
        this.value = password;
    }
    passwordValid(password: string){
        const regexp = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/gm);
        return regexp.test(password)
    }
}