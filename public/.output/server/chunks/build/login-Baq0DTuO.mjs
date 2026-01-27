import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { u as useCookie } from './cookie-JaXj7jtq.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './server.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import './ssr-DzJ2wLrC.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const email = ref("");
    const password = ref("");
    const isLoading = ref(false);
    const errorMsg = ref("");
    useCookie("auth_token", {
      maxAge: 60 * 60 * 24
      // 24 hours, matching backend expiry
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f4f6fb] to-[#e9ecf5] p-4 font-sans" }, _attrs))}><div class="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_20px_40px_rgba(0,0,0,0.08)]"><h1 class="text-3xl font-bold text-center mb-8" style="${ssrRenderStyle({ "color": "#2C3E50" })}"> Connexion </h1><form class="flex flex-col gap-5"><div class="flex flex-col gap-1.5"><label for="email" class="text-sm font-medium text-gray-700"> Email </label><input id="email"${ssrRenderAttr("value", unref(email))} type="email" placeholder="exemple@test.com" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 outline-none transition-all placeholder-gray-400" style="${ssrRenderStyle({ "accent-color": "#2C3E50", "caret-color": "#2C3E50" })}"></div><div class="flex flex-col gap-1.5"><label for="password" class="text-sm font-medium text-gray-700"> Mot de passe </label><input id="password"${ssrRenderAttr("value", unref(password))} type="password" placeholder="Mot de passe" required class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 outline-none transition-all placeholder-gray-400" style="${ssrRenderStyle({ "accent-color": "#2C3E50", "caret-color": "#2C3E50" })}"></div>`);
      if (unref(errorMsg)) {
        _push(`<div class="text-red-500 text-sm text-center bg-red-50 p-2 rounded">${ssrInterpolate(unref(errorMsg))}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="flex flex-col items-center gap-4 mt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(isLoading)) ? " disabled" : ""} class="w-full py-3 px-4 disabled:bg-gray-400 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5 flex justify-center items-center" style="${ssrRenderStyle({ "background-color": "#2C3E50" })}">`);
      if (unref(isLoading)) {
        _push(`<span>Connexion...</span>`);
      } else {
        _push(`<span>Se connecter</span>`);
      }
      _push(`</button><p class="text-sm text-gray-600"> Pas encore de compte ? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/register",
        class: "font-medium hover:underline transition-colors",
        style: { "color": "#2C3E50" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Créer un compte `);
          } else {
            return [
              createTextVNode(" Créer un compte ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</p></div></form></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=login-Baq0DTuO.mjs.map
