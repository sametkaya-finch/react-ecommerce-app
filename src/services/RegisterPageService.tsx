import type { AxiosResponse } from "axios";
import axios from "../config/AxiosConfig";
import type { UserType } from "../types/Types";

class RegisterPageService {

    register(newUser: UserType): Promise<any> {
        return new Promise((resolve: any, reject: any) => {
            /*baseurlden alacak zaten oncesini doldurmaya gerek yok */
            axios.post("/users", newUser)
                .then((response: AxiosResponse<any, any>) => resolve(response.data))
                .catch((error: any) => reject(error));
        })
    }
}

export default new RegisterPageService();