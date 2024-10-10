import { Resend } from "resend";
import { render } from "@react-email/components";
import { Email } from "../components/email";
import type { Input } from ".";

const { EMAIL_FROM, RESEND_API_KEY } = import.meta.env;
const resend = new Resend(RESEND_API_KEY);

export async function sendEmailHandler({ name, email }: Input) {
  await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Novo contato da Landing Page",
    html: render(Email({ name }), { pretty: true }),
  });

  return "success";
}
