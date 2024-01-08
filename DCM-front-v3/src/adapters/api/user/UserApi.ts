import  { AxiosResponse } from "axios";
import { httpClient } from "../httpClient";

class UserApi {
  async login(payload:{email: string, password: string}) {
    try {
      const response: AxiosResponse = await httpClient.post("/user/signin", {
        email: payload.email,
        password: payload.password,
      });
      return response.data;

    } catch (error) {
      console.error("Une erreur s'est produite lors de l'appel API :", error);
    }
  }  
  async signUp(payload:{email: string, password: string, name:string}) {
    try {
      const response: AxiosResponse = await httpClient.post("/user/create", {
        email:payload.email,
        name:payload.name,
        password:payload.password,
        role:"PROLO",
      });
      return response.data;

    } catch (error) {
      console.error("Une erreur s'est produite lors de l'appel API :", error);
    }
  }
}

export const userApi = new UserApi()


