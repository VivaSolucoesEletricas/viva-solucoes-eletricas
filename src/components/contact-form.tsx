import type { FormEvent } from "react";

export function ContactForm() {
  async function sendEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;

    const formData = new FormData(form);

    const response = await fetch("/api/contact", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      form.reset();
    }
  }

  return (
    <form onSubmit={sendEmail} className="grid grid-cols-1 gap-6">
      <input
        type="text"
        name="name"
        placeholder="Nome Completo"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Endereço de E-mail"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="tel"
        name="phone"
        placeholder="Telefone"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="address"
        placeholder="Endereço"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <input
        type="text"
        name="consumption"
        placeholder="Consumo Mensal de Energia"
        className="p-2 border border-gray-300 rounded"
        required
      />
      <textarea
        name="message"
        placeholder="Mensagem/Comentários"
        className="p-2 border border-gray-300 rounded"
      ></textarea>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
      >
        Receber Orçamento
      </button>
    </form>
  );
}
