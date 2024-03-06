import { userApi } from "../../../api/user/UserApi";

interface UserResponse {
    id: string;
    email: string;
    role: number;
    token: string;
    name:string
}

class SignInViewModel {
    async signIn(username: string, password: string) {
        const result: UserResponse = await userApi.login({
            email: username,
            password: password,
          })
        return result
    }
  }

export const signInViewModel = new SignInViewModel()

