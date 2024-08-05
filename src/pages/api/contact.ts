import { Resend } from "resend";
import type { APIRoute } from "astro";
import { render } from "@react-email/components";
import { Email } from "../../components/email";

const resend = new Resend(import.meta.env.RESEND_API_KEY);
const { EMAIL_FROM, GOOGLE_SHEET_DEPLOYMENT_CODE } = import.meta.env;

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

export const POST: APIRoute = async ({ request }) => {
  const formData = await request.formData();

  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const consumption = formData.get("consumption") as string;
  const message = formData.get("message") as string;

  const currentDate = new Date();
  const formattedDateTime = currentDate.toLocaleString("pt-BR");

  try {
    await Promise.all([
      saveToGoogleSheet({
        name,
        email,
        phone,
        address,
        consumption,
        message,
        dateTime: formattedDateTime,
      }),
      resend.emails.send({
        from: EMAIL_FROM,
        to: email,
        subject: "Novo contato da Landing Page",
        html: render(Email({ name }), { pretty: true }),
      }),
    ]);

    return new Response(
      JSON.stringify({ message: "Email enviado com sucesso!", success: true }),
      { status: 200 },
    );
  } catch (error) {
    console.error("Erro:", error);
    return new Response(
      JSON.stringify({
        message: "Erro ao processar a requisição",
        success: false,
      }),
      { status: 500 },
    );
  }
};
