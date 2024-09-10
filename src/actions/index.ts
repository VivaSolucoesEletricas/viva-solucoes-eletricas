import { defineAction } from "astro:actions";
import { input, handler } from "./sendEmail";

export const server = {
  sendEmail: defineAction({
    input,
    accept: "form",
    handler,
  }),
};
