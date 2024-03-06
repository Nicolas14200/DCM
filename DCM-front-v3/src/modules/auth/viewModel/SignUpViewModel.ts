import { userApi } from "../../../api/user/UserApi";

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
    return result;
  }
}

export const signUpViewModel = new SignUpViewModel()
