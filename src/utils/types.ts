import { User } from "src/user/model/User.model";

export interface ILogin {
    token: string;
    user: User
}

export interface IJwtPayload {
    _id: string;
    email: string;
    role: string;
}