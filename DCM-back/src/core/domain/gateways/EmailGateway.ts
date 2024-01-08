import { Msg } from "../valueObjects/Msg";

export interface EmailGateway {
    send(msg: Msg): Promise<void>;
}