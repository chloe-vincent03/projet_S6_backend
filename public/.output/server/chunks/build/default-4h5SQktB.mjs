import { c as useRuntimeConfig, d as __nuxt_component_0$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderStyle, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { u as useCookie } from './cookie-JaXj7jtq.mjs';
import { u as useFetch } from './fetch-Clcf5u9m.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';
import './ssr-DzJ2wLrC.mjs';
import '@vue/shared';

const useGlobalColorization = () => {
  useCookie("auth_token");
  const calculateSaturation = (user, enigmas) => {
    if (!user || !user.unlockedFragments || !enigmas) return 0;
    const totems = {};
    enigmas.forEach((e) => {
      const tId = e.totem_id || 1;
      if (!totems[tId]) totems[tId] = [];
      if (e.reward && e.reward.fragment_id) {
        totems[tId].push(e.reward.fragment_id);
      }
    });
    let completedCount = 0;
    const totalTotems = Object.keys(totems).length;
    Object.keys(totems).forEach((tIdKey) => {
      const tId = Number(tIdKey);
      const totemEnigmas = totems[tId] || [];
      if (totemEnigmas.length === 0) return;
      const isComplete = totemEnigmas.every(
        (eId) => user.unlockedFragments.some((uf) => String(uf.fragmentId) === String(eId))
      );
      if (isComplete) completedCount++;
    });
    if (totalTotems === 0) return 0;
    return Math.min(completedCount / totalTotems, 1);
  };
  return {
    calculateProgress: calculateSaturation
  };
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const config = useRuntimeConfig();
    const tokenCookie = useCookie("auth_token");
    const { calculateProgress } = useGlobalColorization();
    const { data: user, refresh: refreshUser } = useFetch(`${config.public.apiBase}/user/profile`, {
      headers: computed(() => ({ "Authorization": `Bearer ${tokenCookie.value}` })),
      lazy: true,
      server: false,
      // Client side mostly for visual effect updates
      watch: [tokenCookie]
    }, "$sBXLId4RTz");
    const { data: enigmas } = useFetch(`${config.public.apiBase}/enigmas`, {
      lazy: true,
      server: false
    }, "$Zav9sUhl7G");
    const progressRatio = computed(() => {
      if (!user.value || !enigmas.value) return 0;
      return calculateProgress(user.value, enigmas.value);
    });
    const interpolateColor = (color1, color2, factor) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color1);
      const result2 = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(color2);
      if (!result || !result2 || !result[1] || !result[2] || !result[3] || !result2[1] || !result2[2] || !result2[3]) return color1;
      const r1 = parseInt(result[1], 16);
      const g1 = parseInt(result[2], 16);
      const b1 = parseInt(result[3], 16);
      const r2 = parseInt(result2[1], 16);
      const g2 = parseInt(result2[2], 16);
      const b2 = parseInt(result2[3], 16);
      const r = Math.round(r1 + factor * (r2 - r1));
      const g = Math.round(g1 + factor * (g2 - g1));
      const b = Math.round(b1 + factor * (b2 - b1));
      return `rgb(${r}, ${g}, ${b})`;
    };
    const dynamicColor = computed(() => {
      return interpolateColor("#2C3E50", "#93C5FD", progressRatio.value);
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0$1;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        style: { "--theme-dynamic": dynamicColor.value }
      }, _attrs))}>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      if (unref(tokenCookie)) {
        _push(`<header class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-white/50 px-6 py-4 flex items-center justify-between transition-all">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "flex items-center gap-2 hover:scale-105 transition-transform text-dynamic"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-2xl font-bold tracking-widest" style="${ssrRenderStyle({ "font-family": "'Cinzel', serif" })}"${_scopeId}>La Ville Lente</span>`);
            } else {
              return [
                createVNode("span", {
                  class: "text-2xl font-bold tracking-widest",
                  style: { "font-family": "'Cinzel', serif" }
                }, "La Ville Lente")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<nav class="flex items-center gap-6">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/grimoire",
          class: "font-medium text-stone-600 hover:text-stone-900 transition-colors",
          "active-class": "!text-stone-900 font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Grimoire `);
            } else {
              return [
                createTextVNode(" Grimoire ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/map",
          class: "font-medium text-stone-600 hover:text-stone-900 transition-colors",
          "active-class": "!text-stone-900 font-bold"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Carte `);
            } else {
              return [
                createTextVNode(" Carte ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "px-4 py-2 rounded-full border border-stone-200 bg-white hover:bg-stone-50 transition-all shadow-sm hover:shadow-md text-sm font-bold text-stone-700",
          "active-class": "border-stone-400"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Mon Profil `);
            } else {
              return [
                createTextVNode(" Mon Profil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</nav></header>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<main class="${ssrRenderClass([{ "pt-20": unref(tokenCookie) }, "flex-grow min-h-[calc(100vh-80px)]"])}">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</main><footer class="w-full py-8 mt-auto bg-white/50 border-t border-stone-100 backdrop-blur-sm"><div class="container mx-auto px-6 text-center"><div class="flex flex-wrap justify-center gap-6 mb-4 text-sm font-medium">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/mentions-legales",
        class: "text-stone-500 hover:text-dynamic transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Mentions Légales `);
          } else {
            return [
              createTextVNode(" Mentions Légales ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/cgu",
        class: "text-stone-500 hover:text-dynamic transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` CGU `);
          } else {
            return [
              createTextVNode(" CGU ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/politique-confidentialite",
        class: "text-stone-500 hover:text-dynamic transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Politique de Confidentialité `);
          } else {
            return [
              createTextVNode(" Politique de Confidentialité ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/contact",
        class: "text-stone-500 hover:text-dynamic transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Contact `);
          } else {
            return [
              createTextVNode(" Contact ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><p class="text-xs text-stone-400"> © 2026 La Ville Lente. Tous droits réservés. </p></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-4h5SQktB.mjs.map
