import { z } from "astro:schema";
import { defineAction } from "astro:actions";
import { sendEmailHandler } from "./sendEmail";
import { saveToSheetsHandler } from "./saveToSheets";

export const input = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string().min(3),
  energyConsumption: z.coerce.number().min(1),
  message: z.string().min(3).nullable(),
});

export type Input = z.infer<typeof input>;

export const server = {
  sendEmail: defineAction({
    input,
    accept: "form",
    handler: sendEmailHandler,
  }),
  saveToSheets: defineAction({
    input,
    accept: "form",
    handler: saveToSheetsHandler,
  }),
};
