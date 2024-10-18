import 'cookie';
import 'kleur/colors';
import 'es-module-lexer';
import './chunks/shared_B6QDeGeF.mjs';
import { d as decodeKey } from './chunks/astro/server_BSSM3Nrv.mjs';
import 'clsx';
import './chunks/astro-designed-error-pages_B8MiNVx0.mjs';
import { compile } from 'path-to-regexp';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getRouteGenerator(segments, addTrailingSlash) {
  const template = segments.map((segment) => {
    return "/" + segment.map((part) => {
      if (part.spread) {
        return `:${part.content.slice(3)}(.*)?`;
      } else if (part.dynamic) {
        return `:${part.content}`;
      } else {
        return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      }
    }).join("");
  }).join("");
  let trailing = "";
  if (addTrailingSlash === "always" && segments.length) {
    trailing = "/";
  }
  const toPath = compile(template + trailing);
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    const path = toPath(sanitizedParams);
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware(_, next) {
      return next();
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///home/jeffsilva01/www/viva-solucoes-eletricas/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_actions/[...path]","pattern":"^\\/_actions(?:\\/(.*?))?$","segments":[[{"content":"_actions","dynamic":false,"spread":false}],[{"content":"...path","dynamic":true,"spread":true}]],"params":["...path"],"component":"node_modules/astro/dist/actions/runtime/route.js","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"inline","value":"const e=document.querySelector(\"form\");e?.addEventListener(\"submit\",async t=>{t.preventDefault();const o=new FormData(e);console.log(Object.fromEntries(o))});\n"}],"styles":[{"type":"external","src":"/_astro/index.Cb-rQbwK.css"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/home/jeffsilva01/www/viva-solucoes-eletricas/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000astro-internal:middleware":"_astro-internal_middleware.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/astro/dist/actions/runtime/route@_@js":"pages/_actions/_---path_.astro.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","/home/jeffsilva01/www/viva-solucoes-eletricas/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","/home/jeffsilva01/www/viva-solucoes-eletricas/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_BkR_XoPb.mjs","\u0000@astrojs-manifest":"manifest_Dsk_MbJY.mjs","\u0000astro:internal-actions":"chunks/_astro_internal-actions_Kw9dYmjK.mjs","/home/jeffsilva01/www/viva-solucoes-eletricas/src/components/quem-somos-slider.tsx":"_astro/quem-somos-slider.DkabTCm4.js","/astro/hoisted.js?q=0":"_astro/hoisted.FlJPRJ02.js","/home/jeffsilva01/www/viva-solucoes-eletricas/src/components/project.tsx":"_astro/project.DaNEK4Dq.js","@astrojs/react/client.js":"_astro/client.BY2mA-CD.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/atendimento-personalizado-icon.9fpgNj51.svg","/_astro/venda-consultiva-icon.B1KM-8AR.svg","/_astro/tecnologia-de-ultima-geracao-icon.DYH9mA5M.svg","/_astro/suporte-pos-venda-icon.C7_BVq62.svg","/_astro/home.D57rUzMn.webp","/_astro/corpo-tecnico-especializado-icon.CCSHO91B.svg","/_astro/porque-escolher-a-viva-logo.BvophzBU.svg","/_astro/section-porque-viva.BWKG_O91.webp","/_astro/instagram-logo.q_cQtziH.svg","/_astro/section-contatos.Hee2vmzj.webp","/_astro/logo-viva-energia-solar.ZHFWdxhJ.svg","/_astro/projeto1.BSJV5zx5.jpeg","/_astro/quem-somos-3.D6x4NaSo.jpeg","/_astro/quem-somos-1.CJwofi7R.jpeg","/_astro/quem-somos-2.Bih0rlYB.jpeg","/_astro/projeto2.BpxCWRo-.jpeg","/_astro/projeto4.CZycUTz-.jpeg","/_astro/projeto3.BhSlYJOc.jpeg","/_astro/projeto5.Ce-yyUBm.jpeg","/_astro/projeto6.BafaAkld.jpeg","/_astro/projeto7.q7S5g3Iy.jpeg","/_astro/projeto8.ClnIGSa-.jpeg","/_astro/projeto9.CdyLu3YU.jpeg","/_astro/index.Cb-rQbwK.css","/logo.svg","/_astro/client.BY2mA-CD.js","/_astro/index.B52nOzfP.js","/_astro/index.EKmKsbKj.css","/_astro/project.DaNEK4Dq.js","/_astro/quem-somos-slider.DkabTCm4.js","/_astro/swiper-react.DqVOKPD9.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[],"key":"wp2YxZNDhlOWdaKS+9QicEdDpJIbB3q4bRxD1qF0qyU=","experimentalEnvGetSecretEnabled":false});

export { manifest };
