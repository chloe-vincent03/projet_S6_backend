import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { defineComponent, ref, mergeProps, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { u as useCookie } from './cookie-JaXj7jtq.mjs';
import { _ as _export_sfc, a as useRouter, b as useRoute } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import './ssr-DzJ2wLrC.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'pinia';
import 'vue-router';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "map",
  __ssrInlineRender: true,
  setup(__props) {
    useCookie("auth_token");
    useRouter();
    ref(null);
    const isLoading = ref(true);
    const errorMsg = ref("");
    const discoveredPlaces = ref([]);
    const nextPlace = ref(null);
    useRoute();
    ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex flex-col md:flex-row h-[calc(100vh-5rem)] w-full bg-[#e9ecf5]" }, _attrs))} data-v-d99a6f59><aside class="w-full md:w-80 h-[40vh] md:h-full bg-white shadow-xl z-20 flex flex-col border-t md:border-t-0 md:border-r border-stone-200 order-2 md:order-1" data-v-d99a6f59><div class="p-6 border-b border-stone-100 bg-stone-50 relative" data-v-d99a6f59><h1 class="text-xl font-serif text-[#2C3E50] font-bold" data-v-d99a6f59>Mes Découvertes</h1>`);
      if (!isLoading.value) {
        _push(`<p class="text-xs text-stone-500 mt-1" data-v-d99a6f59>${ssrInterpolate(discoveredPlaces.value.length)} lieux révélés</p>`);
      } else {
        _push(`<!---->`);
      }
      if (nextPlace.value) {
        _push(`<div class="mt-6" data-v-d99a6f59>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: `/discovery/${nextPlace.value._id}`,
          class: "block w-full py-3 px-4 bg-[#2C3E50] text-white text-center rounded-xl font-bold hover:bg-[#34495E] hover:scale-[1.02] transition-all shadow-md"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` ✨ Continuer l&#39;aventure `);
            } else {
              return [
                createTextVNode(" ✨ Continuer l'aventure ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex-1 overflow-y-auto p-4 space-y-4" data-v-d99a6f59>`);
      if (isLoading.value) {
        _push(`<div class="space-y-4" data-v-d99a6f59><!--[-->`);
        ssrRenderList(3, (n) => {
          _push(`<div class="bg-stone-50 rounded-xl p-3 animate-pulse flex items-center gap-3" data-v-d99a6f59><div class="w-16 h-16 bg-stone-200 rounded-lg" data-v-d99a6f59></div><div class="flex-1 space-y-2" data-v-d99a6f59><div class="h-4 bg-stone-200 rounded w-3/4" data-v-d99a6f59></div><div class="h-3 bg-stone-200 rounded w-1/2" data-v-d99a6f59></div></div></div>`);
        });
        _push(`<!--]--></div>`);
      } else if (discoveredPlaces.value.length === 0) {
        _push(`<div class="text-center py-10 text-stone-500" data-v-d99a6f59><p class="mb-2" data-v-d99a6f59>👻</p><p class="text-sm" data-v-d99a6f59>Votre carte est vide...</p><p class="text-xs mt-2" data-v-d99a6f59>Explorez la ville pour remplir votre carnet !</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<!--[-->`);
      ssrRenderList(discoveredPlaces.value, (place) => {
        _push(`<div class="group bg-white border border-stone-100 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer flex gap-3 items-center" data-v-d99a6f59><img${ssrRenderAttr("src", place.watercolorLayer)}${ssrRenderAttr("alt", place.title)} class="w-16 h-16 object-cover rounded-lg bg-stone-100 shadow-sm" data-v-d99a6f59><div class="flex-1 min-w-0" data-v-d99a6f59><h3 class="font-bold text-[#2C3E50] text-sm truncate" data-v-d99a6f59>${ssrInterpolate(place.title)}</h3><p class="text-xs text-gray-500 line-clamp-2 mt-0.5" data-v-d99a6f59>${ssrInterpolate(place.description)}</p></div></div>`);
      });
      _push(`<!--]--></div></aside><div class="w-full md:flex-1 relative h-[60vh] md:h-full bg-[#e9ecf5] order-1 md:order-2" data-v-d99a6f59>`);
      if (errorMsg.value && !isLoading.value) {
        _push(`<div class="absolute top-20 left-1/2 -translate-x-1/2 z-[1000] bg-white px-6 py-4 rounded-xl shadow-xl text-center" data-v-d99a6f59><p class="text-gray-600 mb-2" data-v-d99a6f59>${ssrInterpolate(errorMsg.value)}</p></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="w-full h-full z-0 outline-none" data-v-d99a6f59></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/map.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const map = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d99a6f59"]]);

export { map as default };
//# sourceMappingURL=map-Dsqdoej3.mjs.map
