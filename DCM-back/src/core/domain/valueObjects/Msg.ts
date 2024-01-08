export interface Msg {
  From: {
    Email: string;
    Name: string;
  };
  To: {
    Email: string;
    Name: string;
  }[];
  Subject: string;
  TextPart: string;
  HTMLPart: string;
  CustomID:string;
}
