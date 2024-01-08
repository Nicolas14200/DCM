import "reflect-metadata";
import Mailjet from "node-mailjet";
import { MailJetGateway } from "../../gateways/mailJet/MailJetGateway";
import { Msg } from "../../../core/domain/valueObjects/Msg";

describe("Integration - MailJet", () => {
  let mailJetGateway: MailJetGateway;
  let msg: Msg;

  beforeAll(() => {


    const mailJet = new Mailjet({
      apiKey: "",
      apiSecret: "",
    });

    mailJetGateway = new MailJetGateway(mailJet);
    msg = {
        From: {
            Email: "nostradanar@outlook.com",
            Name: "Danar",
          },
          To: [{
            Email: "nostradanar@outlook.com",
            Name: "Danar",
          }],
          Subject: "Greetings from Mailjet.",
          TextPart:  "My first Mailjet email",
          HTMLPart: "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
          CustomID: "AppGettingStartedTest"
    }
  });

  it("Should send a email", async () => {
    mailJetGateway.send(msg)
  });
});
