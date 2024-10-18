import * as z from 'zod';
import { z as z$1 } from 'zod';
import { c as callSafely, a as ActionError, b as ActionInputError, g as getActionQueryString, d as ACTION_QUERY_PARAMS } from './shared_B6QDeGeF.mjs';
import { Resend } from 'resend';
import { Html, Head, Body, Container, Section, Img, Heading, Text, Link, render } from '@react-email/components';
import { jsxs, jsx } from 'react/jsx-runtime';
import { A as AstroError, j as ActionCalledFromServerError } from './astro/assets-service_BdMEtjcb.mjs';

function defineAction({
  accept,
  input: inputSchema,
  handler
}) {
  const serverHandler = accept === "form" ? getFormServerHandler(handler, inputSchema) : getJsonServerHandler(handler, inputSchema);
  async function safeServerHandler(unparsedInput) {
    if (typeof this === "function") {
      throw new AstroError(ActionCalledFromServerError);
    }
    return callSafely(() => serverHandler(unparsedInput, this));
  }
  Object.assign(safeServerHandler, {
    orThrow(unparsedInput) {
      if (typeof this === "function") {
        throw new AstroError(ActionCalledFromServerError);
      }
      return serverHandler(unparsedInput, this);
    }
  });
  return safeServerHandler;
}
function getFormServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (!(unparsedInput instanceof FormData)) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts FormData."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const baseSchema = unwrapSchemaEffects(inputSchema);
    const parsed = await inputSchema.safeParseAsync(
      baseSchema instanceof z$1.ZodObject ? formDataToObject(unparsedInput, baseSchema) : unparsedInput
    );
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function getJsonServerHandler(handler, inputSchema) {
  return async (unparsedInput, context) => {
    if (unparsedInput instanceof FormData) {
      throw new ActionError({
        code: "UNSUPPORTED_MEDIA_TYPE",
        message: "This action only accepts JSON."
      });
    }
    if (!inputSchema) return await handler(unparsedInput, context);
    const parsed = await inputSchema.safeParseAsync(unparsedInput);
    if (!parsed.success) {
      throw new ActionInputError(parsed.error.issues);
    }
    return await handler(parsed.data, context);
  };
}
function formDataToObject(formData, schema) {
  const obj = schema._def.unknownKeys === "passthrough" ? Object.fromEntries(formData.entries()) : {};
  for (const [key, baseValidator] of Object.entries(schema.shape)) {
    let validator = baseValidator;
    while (validator instanceof z$1.ZodOptional || validator instanceof z$1.ZodNullable || validator instanceof z$1.ZodDefault) {
      if (validator instanceof z$1.ZodDefault && !formData.has(key)) {
        obj[key] = validator._def.defaultValue();
      }
      validator = validator._def.innerType;
    }
    if (!formData.has(key) && key in obj) {
      continue;
    } else if (validator instanceof z$1.ZodBoolean) {
      const val = formData.get(key);
      obj[key] = val === "true" ? true : val === "false" ? false : formData.has(key);
    } else if (validator instanceof z$1.ZodArray) {
      obj[key] = handleFormDataGetAll(key, formData, validator);
    } else {
      obj[key] = handleFormDataGet(key, formData, validator, baseValidator);
    }
  }
  return obj;
}
function handleFormDataGetAll(key, formData, validator) {
  const entries = Array.from(formData.getAll(key));
  const elementValidator = validator._def.type;
  if (elementValidator instanceof z$1.ZodNumber) {
    return entries.map(Number);
  } else if (elementValidator instanceof z$1.ZodBoolean) {
    return entries.map(Boolean);
  }
  return entries;
}
function handleFormDataGet(key, formData, validator, baseValidator) {
  const value = formData.get(key);
  if (!value) {
    return baseValidator instanceof z$1.ZodOptional ? void 0 : null;
  }
  return validator instanceof z$1.ZodNumber ? Number(value) : value;
}
function unwrapSchemaEffects(schema) {
  while (schema instanceof z$1.ZodEffects || schema instanceof z$1.ZodPipeline) {
    if (schema instanceof z$1.ZodEffects) {
      schema = schema._def.schema;
    }
    if (schema instanceof z$1.ZodPipeline) {
      schema = schema._def.in;
    }
  }
  return schema;
}

function toActionProxy(actionCallback = {}, aggregatedPath = "") {
  return new Proxy(actionCallback, {
    get(target, objKey) {
      if (objKey in target || typeof objKey === "symbol") {
        return target[objKey];
      }
      const path = aggregatedPath + objKey.toString();
      function action(param) {
        return handleAction(param, path, this);
      }
      Object.assign(action, {
        queryString: getActionQueryString(path),
        toString: () => action.queryString,
        // Progressive enhancement info for React.
        $$FORM_ACTION: function() {
          const searchParams = new URLSearchParams(action.toString());
          searchParams.set(ACTION_QUERY_PARAMS.actionRedirect, "false");
          return {
            method: "POST",
            // `name` creates a hidden input.
            // It's unused by Astro, but we can't turn this off.
            // At least use a name that won't conflict with a user's formData.
            name: "_astroAction",
            action: "?" + searchParams.toString()
          };
        },
        // Note: `orThrow` does not have progressive enhancement info.
        // If you want to throw exceptions,
        //  you must handle those exceptions with client JS.
        async orThrow(param) {
          const { data, error } = await handleAction(param, path, this);
          if (error) throw error;
          return data;
        }
      });
      return toActionProxy(action, path + ".");
    }
  });
}
async function handleAction(param, path, context) {
  {
    const { getAction } = await import('./get-action_CptJZDnG.mjs').then(n => n.a);
    const action = await getAction(path);
    if (!action) throw new Error(`Action not found: ${path}`);
    return action.bind(context)(param);
  }
}
toActionProxy();

function Email({ name }) {
  return /* @__PURE__ */ jsxs(Html, { children: [
    /* @__PURE__ */ jsx(Head, {}),
    /* @__PURE__ */ jsx(Body, { className: "bg-gray-100", children: /* @__PURE__ */ jsxs(Container, { className: "max-w-lg mx-auto bg-white shadow-md rounded-lg overflow-hidden", children: [
      /* @__PURE__ */ jsx(Section, { className: "bg-blue-600 p-6 text-center", children: /* @__PURE__ */ jsx(
        Img,
        {
          src: "https://via.placeholder.com/150",
          alt: "Logomarca da VIVA Soluções",
          className: "mx-auto mb-4",
          style: { maxWidth: "150px" }
        }
      ) }),
      /* @__PURE__ */ jsxs(Section, { className: "p-6", children: [
        /* @__PURE__ */ jsx(Heading, { className: "text-2xl font-bold text-blue-600 mb-4", children: "Bem-vindo à VIVA Soluções!" }),
        /* @__PURE__ */ jsxs(Text, { className: "mb-4", children: [
          "Olá ",
          name,
          ","
        ] }),
        /* @__PURE__ */ jsx(Text, { className: "mb-4", children: "Obrigado por se cadastrar para receber um orçamento de nossos serviços de energia solar. Estamos animados em tê-lo conosco e esperamos poder ajudá-lo a alcançar seus objetivos de sustentabilidade." }),
        /* @__PURE__ */ jsx(Text, { className: "mb-4", children: "Em breve, um de nossos consultores entrará em contato com você para discutir suas necessidades e fornecer mais informações sobre como podemos ajudá-lo a economizar energia e reduzir custos." }),
        /* @__PURE__ */ jsx(Text, { className: "mb-4", children: "Se você tiver alguma dúvida ou precisar de assistência imediata, não hesite em nos contatar." }),
        /* @__PURE__ */ jsxs(Text, { children: [
          "Atenciosamente,",
          /* @__PURE__ */ jsx("br", {}),
          "Equipe VIVA Soluções"
        ] })
      ] }),
      /* @__PURE__ */ jsx(Section, { className: "bg-blue-600 text-white text-center p-4", children: /* @__PURE__ */ jsxs(Text, { children: [
        "VIVA Soluções - Energia Solar",
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "mailto:contato@vivasolucoes.com.br",
            className: "text-white underline",
            children: "contato@vivasolucoes.com.br"
          }
        ),
        /* @__PURE__ */ jsx("br", {}),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: "https://www.vivasolucoes.com.br",
            className: "text-white underline",
            children: "www.vivasolucoes.com.br"
          }
        ),
        /* @__PURE__ */ jsx("br", {}),
        "Siga-nos nas redes sociais:",
        " ",
        /* @__PURE__ */ jsx(Link, { href: "#", className: "text-white underline", children: "Facebook" }),
        " ",
        "|",
        " ",
        /* @__PURE__ */ jsx(Link, { href: "#", className: "text-white underline", children: "Instagram" }),
        " ",
        "|",
        " ",
        /* @__PURE__ */ jsx(Link, { href: "#", className: "text-white underline", children: "LinkedIn" })
      ] }) })
    ] }) })
  ] });
}

const __vite_import_meta_env__$1 = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const { EMAIL_FROM, RESEND_API_KEY } = Object.assign(__vite_import_meta_env__$1, { MAIL: process.env.MAIL, _: process.env._ });
const resend = new Resend(RESEND_API_KEY);
async function sendEmailHandler({ name, email }) {
  await resend.emails.send({
    from: EMAIL_FROM,
    to: email,
    subject: "Novo contato da Landing Page",
    html: render(Email({ name }), { pretty: true })
  });
  return "success";
}

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "SITE": undefined, "SSR": true};
const { GOOGLE_SHEET_DEPLOYMENT_CODE } = Object.assign(__vite_import_meta_env__, { _: process.env._ });
async function saveToSheetsHandler({
  name,
  phone,
  email,
  address,
  energyConsumption,
  message
}) {
  const currentDate = (/* @__PURE__ */ new Date()).toLocaleString("pt-BR");
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
        dateTime: currentDate
      })
    }
  );
  console.log(result);
}

const input = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  phone: z.string().min(11),
  address: z.string().min(3),
  energyConsumption: z.coerce.number().min(1),
  message: z.string().min(3).nullable()
});
const server = {
  sendEmail: defineAction({
    input,
    accept: "form",
    handler: sendEmailHandler
  }),
  saveToSheets: defineAction({
    input,
    accept: "form",
    handler: saveToSheetsHandler
  })
};

export { server };
