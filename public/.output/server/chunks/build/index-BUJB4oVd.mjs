import { withAsyncContext, computed, ref, mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './nuxt-link-B-UF9dEV.mjs';
import { c as useRuntimeConfig } from './server.mjs';
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

const _sfc_main$1 = {
  __name: "ScratchReveal",
  __ssrInlineRender: true,
  props: {
    inkLayer: { type: String, required: true },
    watercolorLayer: { type: String, required: true },
    brushSize: { type: Number, default: 50 }
  },
  emits: ["progress", "complete"],
  setup(__props, { emit: __emit }) {
    const containerRef = ref(null);
    ref(null);
    const isLoaded = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        ref_key: "containerRef",
        ref: containerRef,
        class: "relative w-full h-full overflow-hidden cursor-crosshair touch-none"
      }, _attrs))}><img${ssrRenderAttr("src", __props.inkLayer)} alt="Background" class="${ssrRenderClass([{ "grayscale": __props.inkLayer === __props.watercolorLayer }, "absolute inset-0 w-full h-full object-cover pointer-events-none select-none transition-filter duration-300"])}"><canvas class="absolute inset-0 w-full h-full z-10"></canvas>`);
      if (!isLoaded.value) {
        _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm z-20"><span class="text-white font-medium bg-black/50 px-3 py-1 rounded-full text-sm">Chargement...</span></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ScratchReveal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$1, { __name: "ScratchReveal" });
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const tokenCookie = useCookie("auth_token");
    const { data: places, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/places`, "$orW8SXrfeA")), __temp = await __temp, __restore(), __temp);
    const { data: enigmas } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/enigmas`, "$Esc5XvxuRO")), __temp = await __temp, __restore(), __temp);
    const firstPlace = computed(() => places.value?.[0]);
    computed(() => {
      return enigmas.value?.find((e) => e.id === "enigma_001") || enigmas.value?.find((e) => e.id === "1") || enigmas.value?.[0];
    });
    ref(false);
    const isUnlocked = ref(false);
    const handleUnlock = async () => {
      if (!isUnlocked.value) {
        isUnlocked.value = true;
        if (tokenCookie.value && firstPlace.value) {
          console.log("Attempting to save progress for place:", firstPlace.value._id);
          try {
            const response = await fetch(`${config.public.apiBase}/user/progress`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${tokenCookie.value}`
              },
              body: JSON.stringify({ placeId: firstPlace.value._id })
            });
            if (response.ok) {
              console.log("Progress saved successfully!");
            } else {
              console.error("Failed to save progress:", await response.text());
            }
          } catch (err) {
            console.error("Erreur sauvegarde progression", err);
          }
        } else {
          console.warn("User not logged in, progress will not be saved permanently.");
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ScratchReveal = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["min-h-screen bg-stone-50 transition-all duration-1000", { "h-screen overflow-hidden": !isUnlocked.value }]
      }, _attrs))}>`);
      if (unref(pending)) {
        _push(`<div class="flex items-center justify-center h-screen"><p class="text-stone-500 animate-pulse">Chargement de la ville...</p></div>`);
      } else if (unref(error)) {
        _push(`<div class="flex flex-col items-center justify-center h-screen text-red-500"><p class="font-bold">Erreur de chargement</p><p class="text-sm mt-2">${ssrInterpolate(unref(error).message)}</p></div>`);
      } else if (unref(places) && unref(places).length > 0) {
        _push(`<div><section class="relative w-full h-screen"><div class="absolute inset-0 z-20 flex items-center justify-center pointer-events-none mix-blend-difference"><h1 class="text-5xl md:text-7xl font-serif font-bold text-white tracking-wider text-center px-4"> Réenchanter le Monde </h1></div>`);
        if (!isUnlocked.value) {
          _push(`<div class="w-full h-full relative z-10">`);
          _push(ssrRenderComponent(_component_ScratchReveal, {
            inkLayer: firstPlace.value.inkLayer,
            watercolorLayer: firstPlace.value.watercolorLayer,
            class: "w-full h-full",
            onComplete: handleUnlock
          }, null, _parent));
          _push(`</div>`);
        } else {
          _push(`<img${ssrRenderAttr("src", firstPlace.value.watercolorLayer)} alt="Révélé" class="absolute inset-0 w-full h-full object-cover z-10 transition-opacity duration-1000 ease-in-out">`);
        }
        _push(`<div class="${ssrRenderClass([{ "opacity-0": isUnlocked.value }, "absolute bottom-12 left-0 w-full text-center pointer-events-none z-20 flex flex-col items-center gap-4 transition-opacity duration-500"])}"><div class="px-6 py-3 bg-black/40 backdrop-blur-md rounded-full text-white/90 font-medium text-lg shadow-sm border border-white/10"> ✨ Coloriez pour découvrir ✨ </div>`);
        if (!unref(tokenCookie)) {
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "pointer-events-auto text-white/80 text-sm hover:text-white hover:underline transition-colors font-medium shadow-black drop-shadow-md"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Déjà un compte ? Se connecter `);
              } else {
                return [
                  createTextVNode(" Déjà un compte ? Se connecter ")
                ];
              }
            }),
            _: 1
          }, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="${ssrRenderClass([isUnlocked.value ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10", "absolute bottom-12 left-0 w-full flex justify-center pointer-events-none z-30 transition-all duration-700 transform"])}"><div class="animate-bounce p-2 bg-white/20 backdrop-blur-sm rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><path d="M12 5v14"></path><path d="m19 12-7 7-7-7"></path></svg></div></div></section><section class="container mx-auto px-6 py-24 max-w-4xl" id="content-start"><article class="flex flex-col gap-8 text-center"><span class="text-sm font-bold uppercase tracking-widest text-stone-500">Chapitre 1</span><h2 class="text-5xl font-serif text-[#2C3E50] leading-tight">${ssrInterpolate(firstPlace.value.title)}</h2><div class="w-24 h-1 bg-stone-200 mx-auto my-4"></div><p class="text-xl text-stone-600 leading-loose font-light">${ssrInterpolate(firstPlace.value.description)}</p></article><div class="mt-24 mb-12 w-full max-w-4xl mx-auto flex flex-col items-center gap-12 relative z-50"><div class="p-10 glass-panel rounded-[3rem] text-center max-w-4xl w-full"><div class="mb-10 max-w-2xl mx-auto"><h3 class="text-2xl font-serif text-[#2C3E50] font-bold mb-4">La Ville Lente</h3><p class="text-stone-600 text-lg leading-relaxed"> En découvrant les lieux de la ville, vous dévoilez son histoire et participez à sa création. Chaque secret révélé ajoute une pierre à l&#39;édifice. </p></div>`);
        if (unref(tokenCookie)) {
          _push(`<div class="grid grid-cols-1 md:grid-cols-2 gap-6">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/map",
            class: "group relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center h-72"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}><h4 class="text-2xl font-serif font-bold text-[#2C3E50] mb-2"${_scopeId}>La Carte</h4><p class="text-stone-500 font-light"${_scopeId}>Explorez les lieux et suivez votre progression.</p></div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-2xl font-serif font-bold text-[#2C3E50] mb-2" }, "La Carte"),
                    createVNode("p", { class: "text-stone-500 font-light" }, "Explorez les lieux et suivez votre progression.")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/grimoire",
            class: "group relative overflow-hidden bg-white p-8 rounded-3xl shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col items-center justify-center gap-6 text-center h-72"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<div${_scopeId}><h4 class="text-2xl font-serif font-bold text-[#2C3E50] mb-2"${_scopeId}>Le Grimoire</h4><p class="text-stone-500 font-light"${_scopeId}>Résolvez les énigmes et trouvez les totems.</p></div>`);
              } else {
                return [
                  createVNode("div", null, [
                    createVNode("h4", { class: "text-2xl font-serif font-bold text-[#2C3E50] mb-2" }, "Le Grimoire"),
                    createVNode("p", { class: "text-stone-500 font-light" }, "Résolvez les énigmes et trouvez les totems.")
                  ])
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div>`);
        } else {
          _push(`<div class="flex flex-col gap-4 items-center mt-6"><p class="text-sm text-stone-500 italic">Connectez-vous pour sauvegarder votre progression.</p><div class="flex gap-4">`);
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/login",
            class: "px-6 py-2 border border-[#2C3E50] text-[#2C3E50] rounded-full font-bold hover:bg-stone-50 transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Connexion `);
              } else {
                return [
                  createTextVNode(" Connexion ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(ssrRenderComponent(_component_NuxtLink, {
            to: "/register",
            class: "px-6 py-2 bg-[#2C3E50] text-white rounded-full font-bold hover:bg-[#34495E] transition-colors"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(` Inscription `);
              } else {
                return [
                  createTextVNode(" Inscription ")
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</div></div>`);
        }
        _push(`</div></div></section></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BUJB4oVd.mjs.map
