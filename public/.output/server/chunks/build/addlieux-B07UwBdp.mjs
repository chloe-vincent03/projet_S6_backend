import { reactive, withAsyncContext, ref, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderClass } from 'vue/server-renderer';
import { c as useRuntimeConfig } from './server.mjs';
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
import '@vue/shared';
import './ssr-DzJ2wLrC.mjs';

const _sfc_main = {
  __name: "addlieux",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const config = useRuntimeConfig();
    const form = reactive({
      title: "",
      description: "",
      order: 1,
      // Will be updated automatically
      inkLayer: "",
      watercolorLayer: ""
    });
    const { data: existingPlaces } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/places`, "$SmxnR8OVDW")), __temp = await __temp, __restore(), __temp);
    if (existingPlaces.value && existingPlaces.value.length > 0) {
      const maxOrder = Math.max(...existingPlaces.value.map((p) => p.order || 0));
      form.order = maxOrder + 1;
    }
    const files = reactive({
      ink: null,
      watercolor: null
    });
    const isUploading = ref(false);
    const status = reactive({ type: "", message: "" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto px-4 py-24 max-w-2xl text-stone-800" }, _attrs))}><h1 class="text-3xl font-serif font-bold mb-8 text-center text-emerald-800">Ajouter un nouveau lieu</h1><form class="bg-white p-8 rounded-2xl shadow-sm border border-stone-100 flex flex-col gap-6"><div><label class="block text-sm font-medium text-stone-600 mb-1">Titre du lieu</label><input${ssrRenderAttr("value", form.title)} type="text" required placeholder="Ex: La Librairie Cachée" class="w-full px-4 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"></div><div><label class="block text-sm font-medium text-stone-600 mb-1">Description</label><textarea required rows="4" placeholder="Raconte l&#39;histoire de ce lieu..." class="w-full px-4 py-2 rounded-lg bg-stone-50 border border-stone-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/50">${ssrInterpolate(form.description)}</textarea></div><div><label class="block text-sm font-medium text-stone-600 mb-1">Image Principale (Couleur)</label><div class="flex items-center gap-4"><input type="file" accept="image/*" class="text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100">`);
      if (files.watercolor) {
        _push(`<span class="text-xs text-emerald-600 font-medium">Fichier sélectionné</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div><label class="block text-sm font-medium text-stone-600 mb-1 flex justify-between"><span>Image &quot;Avant&quot; (Noir &amp; Blanc)</span><span class="text-stone-400 font-normal italic">Optionnel (sera généré auto si vide)</span></label><div class="flex items-center gap-4"><input type="file" accept="image/*" class="text-sm text-stone-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-stone-100 file:text-stone-700 hover:file:bg-stone-200">`);
      if (files.ink) {
        _push(`<span class="text-xs text-stone-600 font-medium">Fichier sélectionné</span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><button type="submit"${ssrIncludeBooleanAttr(isUploading.value) ? " disabled" : ""} class="mt-4 px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center">`);
      if (isUploading.value) {
        _push(`<span>Envoi en cours...</span>`);
      } else {
        _push(`<span>Ajouter le lieu</span>`);
      }
      _push(`</button>`);
      if (status.message) {
        _push(`<div class="${ssrRenderClass(["p-4 rounded-lg text-sm text-center", status.type === "error" ? "bg-red-50 text-red-600" : "bg-green-50 text-green-700"])}">${ssrInterpolate(status.message)}</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</form></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/addlieux.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=addlieux-B07UwBdp.mjs.map
