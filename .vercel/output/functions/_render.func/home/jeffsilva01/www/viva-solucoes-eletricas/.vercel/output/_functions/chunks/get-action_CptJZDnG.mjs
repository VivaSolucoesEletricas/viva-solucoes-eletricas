import { A as AstroError, f as ActionNotFoundError } from './astro/assets-service_BdMEtjcb.mjs';

const formContentTypes = ["application/x-www-form-urlencoded", "multipart/form-data"];
function hasContentType(contentType, expected) {
  const type = contentType.split(";")[0].toLowerCase();
  return expected.some((t) => type === t);
}

async function getAction(path) {
  const pathKeys = path.replace("/_actions/", "").split(".");
  let { server: actionLookup } = await import('./_astro_internal-actions_Kw9dYmjK.mjs');
  if (actionLookup == null || !(typeof actionLookup === "object")) {
    throw new TypeError(
      `Expected \`server\` export in actions file to be an object. Received ${typeof actionLookup}.`
    );
  }
  for (const key of pathKeys) {
    if (!(key in actionLookup)) {
      throw new AstroError({
        ...ActionNotFoundError,
        message: ActionNotFoundError.message(pathKeys.join("."))
      });
    }
    actionLookup = actionLookup[key];
  }
  if (typeof actionLookup !== "function") {
    throw new TypeError(
      `Expected handler for action ${pathKeys.join(".")} to be a function. Received ${typeof actionLookup}.`
    );
  }
  return actionLookup;
}

const getAction$1 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  getAction
}, Symbol.toStringTag, { value: 'Module' }));

export { getAction$1 as a, formContentTypes as f, getAction as g, hasContentType as h };
