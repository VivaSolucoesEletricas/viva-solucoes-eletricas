import { Resend } from "resend";
import type { APIContext } from "astro";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST({ request }: APIContext) {
  const formData = await request.formData();

  try {
    await resend.emails.send({
      from: "sua@conta.com",
      to: formData.get("email") as string,
      subject: "Novo contato da Landing Page",
      html: `
        <p><strong>Nome:</strong> ${formData.get("nome")}</p>
        <p><strong>Email:</strong> ${formData.get("email")}</p>
        <p><strong>Mensagem:</strong> ${formData.get("mensagem")}</p>
      `,
    });

    return new Response("Email enviado com sucesso!", { status: 200 });
  } catch (error) {
    console.error(error);
    return new Response("Erro ao enviar email.", { status: 500 });
  }
}
