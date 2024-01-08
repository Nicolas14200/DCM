import { EmailGateway } from "../../../core/domain/gateways/EmailGateway";
import { Msg } from "../../../core/domain/valueObjects/Msg";
import { DCMIdentifiers } from "../../../core/usecase/DCMIdentifiers";
import { inject, injectable } from "inversify";
import Mailjet from "node-mailjet";

@injectable()
export class MailJetGateway implements EmailGateway {
  constructor(
    @inject(DCMIdentifiers.mailjet)
    private readonly mailjet: Mailjet
  ) {}

  async send(msg: Msg): Promise<void> {
    await this.mailjet.post("send", { version: "v3.1" }).request({
      Messages: [msg],
    });
  }
}
