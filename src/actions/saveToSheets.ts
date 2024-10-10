import type { Input } from ".";

const { GOOGLE_SHEET_DEPLOYMENT_CODE } = import.meta.env;

export async function saveToSheetsHandler({
  name,
  phone,
  email,
  address,
  energyConsumption,
  message,
}: Input) {
  const currentDate = new Date().toLocaleString("pt-BR");

  const result = await fetch(
    `https://script.google.com/macros/s/${GOOGLE_SHEET_DEPLOYMENT_CODE}/exec`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
        consumption: energyConsumption,
        message,
        dateTime: currentDate,
      }),
    },
  );

  console.log(result);
}
