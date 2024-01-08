import { userApi } from "../../../adapters/api/user/UserApi";

interface signUpProps {
  name: string;
  email: string;
  password: string;
}

class SignUpViewModel {
  async signUp(payload: signUpProps) {
    const result = await userApi.signUp({
      email: payload.email,
      name: payload.name,
      password: payload.password,
    });
    console.log(result);
    return result;
  }
}

export const signUpViewModel = new SignUpViewModel()
