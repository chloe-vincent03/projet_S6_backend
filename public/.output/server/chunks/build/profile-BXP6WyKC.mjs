import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { defineComponent, withAsyncContext, computed, ref, mergeProps, unref, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { a as useRouter, c as useRuntimeConfig } from './server.mjs';
import { u as useCookie } from './cookie-JaXj7jtq.mjs';
import { u as useTotems } from './useTotems-fFvG8yBz.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const tokenCookie = useCookie("auth_token");
    useRouter();
    const { getTotemMetadata } = useTotems();
    const { data: user, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/user/profile`, {
      headers: {
        "Authorization": `Bearer ${tokenCookie.value}`
      }
    }, "$-6sbaO0toW")), __temp = await __temp, __restore(), __temp);
    const { data: enigmas } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/enigmas`, "$pH-0-4vmPi")), __temp = await __temp, __restore(), __temp);
    const unlockedCount = computed(() => {
      if (!user.value || !user.value.progress) return 0;
      return user.value.progress.filter((p) => p.isCompleted).length;
    });
    const { data: places } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/places`, "$IqgAbfvMHU")), __temp = await __temp, __restore(), __temp);
    const totalPlaces = computed(() => places.value?.length || 0);
    const progressPercentage = computed(() => {
      if (totalPlaces.value === 0) return 0;
      return Math.round(unlockedCount.value / totalPlaces.value * 100);
    });
    const currentSlide = ref(0);
    const completedTotems = computed(() => {
      if (!enigmas.value || !user.value?.unlockedFragments) return [];
      const totems = {};
      enigmas.value.forEach((e) => {
        const tId = e.totem_id || 1;
        if (!totems[tId]) totems[tId] = [];
        if (e.reward && e.reward.fragment_id) {
          totems[tId].push(e.reward.fragment_id);
        }
      });
      const completed = [];
      Object.keys(totems).forEach((tIdKey) => {
        const tId = Number(tIdKey);
        const totemEnigmas = totems[tId] || [];
        if (totemEnigmas.length === 0) return;
        const isComplete = totemEnigmas.every(
          (eId) => user.value.unlockedFragments.some((uf) => {
            return String(uf.fragmentId) === String(eId);
          })
        );
        if (isComplete) {
          completed.push(getTotemMetadata(tId));
        }
      });
      return completed;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-[#e9ecf5] flex items-center justify-center p-6" }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="text-stone-500 animate-pulse">Chargement du profil...</div>`);
      } else if (unref(error)) {
        _push(`<div class="text-center"><p class="text-red-500 font-bold mb-4">Impossible de charger le profil</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/login",
          class: "text-[#2C3E50] underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Se reconnecter`);
            } else {
              return [
                createTextVNode("Se reconnecter")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="w-full max-w-md bg-white rounded-3xl shadow-xl overflow-hidden border border-stone-100"><div class="h-32 bg-[#2C3E50] relative overflow-hidden"><div class="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/",
          class: "absolute top-6 left-6 text-white/80 hover:text-white transition-colors bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-sm font-medium"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ← Accueil `);
            } else {
              return [
                createTextVNode(" ← Accueil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div><div class="px-8 pb-8 -mt-16 relative z-10"><div class="w-32 h-32 mx-auto bg-stone-100 rounded-full border-4 border-white shadow-md flex items-center justify-center text-[#2C3E50] mb-6"><svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div><div class="text-center mb-8"><h1 class="text-2xl font-serif font-bold text-[#2C3E50]">${ssrInterpolate(unref(user).username || "Explorateur")}</h1><p class="text-stone-500 text-sm">${ssrInterpolate(unref(user).email)}</p></div><div class="grid grid-cols-2 gap-4 mb-8"><div class="bg-stone-50 p-4 rounded-2xl text-center border border-stone-100"><span class="block text-3xl font-bold text-[#2C3E50] mb-1">${ssrInterpolate(unlockedCount.value)}</span><span class="text-xs text-stone-500 uppercase tracking-widest font-bold">Lieux Découverts</span></div><div class="bg-stone-50 p-4 rounded-2xl text-center border border-stone-100"><span class="block text-3xl font-bold text-[#2C3E50] mb-1">${ssrInterpolate(progressPercentage.value)}%</span><span class="text-xs text-stone-500 uppercase tracking-widest font-bold">Progression</span></div></div><div class="mb-8"><h3 class="text-[#2C3E50] font-serif font-bold text-lg mb-4 flex items-center gap-2"> Mes Totems </h3><div class="bg-stone-50 rounded-2xl p-4 border border-stone-100"><div class="relative w-full aspect-[2/3] bg-white rounded-xl shadow-sm border border-stone-200 overflow-hidden group">`);
        if (completedTotems.value.length > 0) {
          _push(`<div class="relative w-full h-full"><div class="w-full h-full relative flex flex-col items-center justify-center p-4 animate-fade-in"><img${ssrRenderAttr("src", completedTotems.value[currentSlide.value].image)}${ssrRenderAttr("alt", completedTotems.value[currentSlide.value].name)} class="w-full h-full object-contain p-4 drop-shadow-xl"><div class="absolute bottom-4 bg-white/90 px-4 py-2 rounded-full shadow-sm"><span class="text-sm font-bold text-stone-600 font-serif">${ssrInterpolate(completedTotems.value[currentSlide.value].name)}</span></div></div>`);
          if (completedTotems.value.length > 1) {
            _push(`<button class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow text-stone-600 hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100"> ❮ </button>`);
          } else {
            _push(`<!---->`);
          }
          if (completedTotems.value.length > 1) {
            _push(`<button class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow text-stone-600 hover:text-stone-900 transition-all opacity-0 group-hover:opacity-100"> ❯ </button>`);
          } else {
            _push(`<!---->`);
          }
          if (completedTotems.value.length > 1) {
            _push(`<div class="absolute bottom-1 w-full flex justify-center gap-2 pb-2"><!--[-->`);
            ssrRenderList(completedTotems.value, (_, index) => {
              _push(`<button class="${ssrRenderClass([currentSlide.value === index ? "bg-stone-600 w-4" : "bg-stone-300 hover:bg-stone-400", "w-2 h-2 rounded-full transition-all"])}"></button>`);
            });
            _push(`<!--]--></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        } else {
          _push(`<div class="w-full h-full flex flex-col items-center justify-center text-center p-6 text-stone-400"><div class="text-4xl mb-2 opacity-30">🔮</div><p class="italic text-sm">Aucun totem complété pour l&#39;instant.</p></div>`);
        }
        _push(`</div></div></div><div class="space-y-4">`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/map",
          class: "block w-full py-4 bg-[#2C3E50] text-white text-center rounded-xl font-bold hover:bg-[#34495E] hover:scale-[1.02] transition-all shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Accéder à la Carte `);
            } else {
              return [
                createTextVNode(" Accéder à la Carte ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/grimoire",
          class: "block w-full py-4 border-2 border-[#2C3E50] text-[#2C3E50] text-center rounded-xl font-bold hover:bg-stone-50 hover:scale-[1.02] transition-all shadow-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Ouvrir le Grimoire `);
            } else {
              return [
                createTextVNode(" Ouvrir le Grimoire ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="block w-full py-4 border border-red-200 text-red-500 rounded-xl font-bold hover:bg-red-50 transition-colors"> Déconnexion </button></div></div></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=profile-BXP6WyKC.mjs.map
