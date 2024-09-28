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

  // https://script.google.com/macros/s/AKfycbzRG_iZ7NToPGsOBXljYNWVZ9dwUDwTvcZY7dufSRdCnqjHOyu9cxGY_NhubFypBRoQ/exec
  // https://script.google.com/macros/s/AKfycbwqACYLRZUXH7MK-fwMOAGx6jcx6BQ1AnZh9Hd-n4Qf6sPkcNOcRxjudVS0LTAZWXwf/exec
  console.log("aqui");
  console.log(GOOGLE_SHEET_DEPLOYMENT_CODE);
  console.log({
    name,
    email,
    phone,
    address,
    consumption: energyConsumption,
    message,
    dateTime: currentDate,
  });

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
