import { z } from "astro:schema";
import { Resend } from "resend";
import { render } from "@react-email/components";
import { Email } from "../components/email";

const { EMAIL_FROM, GOOGLE_SHEET_DEPLOYMENT_CODE, RESEND_API_KEY } = import.meta
  .env;
const resend = new Resend(RESEND_API_KEY);

function saveToGoogleSheet(data: Record<string, string>) {
  return fetch(
    `https://script.google.com/macros/s/${GOOGLE_SHEET_DEPLOYMENT_CODE}/exec`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    },
  );
}

export const input = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string().min(3),
  energyConsumption: z.coerce.number().min(1),
  message: z.string().min(3).nullable(),
});

type Input = z.infer<typeof input>;

export async function handler({
  name,
  email,
  phone,
  address,
  energyConsumption,
  message,
}: Input) {
  console.log("Enviando email...");
  const currentDate = new Date().toLocaleString("pt-BR");

  await Promise.all([
    saveToGoogleSheet({
      name,
      email,
      phone,
      address,
      consumption: energyConsumption.toString(),
      message: message || "",
      dateTime: currentDate,
    }),
    resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: "Novo contato da Landing Page",
      html: render(Email({ name }), { pretty: true }),
    }),
  ]);

  return "success";
}
