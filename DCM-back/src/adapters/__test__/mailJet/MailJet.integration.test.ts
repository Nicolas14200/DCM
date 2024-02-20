import "reflect-metadata";
import Mailjet from "node-mailjet";
import { MailJetGateway } from "../../gateways/mailJet/MailJetGateway";
import { Msg } from "../../../core/domain/valueObjects/Msg";
import dotenv from "dotenv";
dotenv.config();

describe("Integration - MailJet", () => {
  let mailJetGateway: MailJetGateway;
  let msg: Msg;

  beforeAll(() => {
    const mailJet = new Mailjet({
      apiKey: process.env.MJ_APIKEY_PUBLIC,
      apiSecret: process.env.MJ_APIKEY_PRIVATE,
    });

    mailJetGateway = new MailJetGateway(mailJet);
    msg = {
      From: {
        Email: "nostradanar@outlook.com",
        Name: "Danar",
      },
      To: [
        {
          Email: "nostradanar@outlook.com",
          Name: "Danar",
        },
      ],
      Subject: "Greetings from Mailjet.",
      TextPart: "My first Mailjet email",
      HTMLPart:
        "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
      CustomID: "AppGettingStartedTest",
    };
  });

  afterAll(() => {});

  it("Should send a email", async () => {
    await mailJetGateway.send(msg);
  });
});
