import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { defineComponent, ref, withAsyncContext, computed, mergeProps, unref, withCtx, createTextVNode, createVNode, resolveDynamicComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderVNode, ssrRenderAttr, ssrInterpolate, ssrRenderStyle, ssrRenderClass, ssrIncludeBooleanAttr, ssrRenderList } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRoute, a as useRouter, c as useRuntimeConfig } from './server.mjs';
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

const _sfc_main$8 = /* @__PURE__ */ defineComponent({
  __name: "MechanicFocus",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const focusLevel = ref(0);
    const isCompleted = ref(false);
    const blurAmount = computed(() => Math.max(0, 20 - focusLevel.value / 100 * 20));
    const grayscaleAmount = computed(() => Math.max(0, 100 - focusLevel.value));
    const contrastAmount = computed(() => 80 + focusLevel.value / 100 * 20);
    const brightnessAmount = computed(() => 80 + focusLevel.value / 100 * 20);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full" }, _attrs))} data-v-9f828ea7><img${ssrRenderAttr("src", __props.image)} class="absolute inset-0 w-full h-full object-cover transition-all duration-100 ease-out will-change-[filter]" style="${ssrRenderStyle({
        filter: `blur(${blurAmount.value}px) grayscale(${grayscaleAmount.value}%) contrast(${contrastAmount.value}%) brightness(${brightnessAmount.value}%)`
      })}" data-v-9f828ea7><div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-9f828ea7><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value }, "mb-8 text-center transition-opacity duration-500 px-6"])}" data-v-9f828ea7><h2 class="text-white font-serif text-2xl md:text-3xl mb-2 text-shadow-lg drop-shadow-md" data-v-9f828ea7> Ajustez la netteté... </h2><p class="text-white/80 text-sm max-w-md mx-auto drop-shadow" data-v-9f828ea7> Glissez pour faire la mise au point sur ce lieu. </p></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2"])}" data-v-9f828ea7><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-9f828ea7>${ssrInterpolate(__props.title)}</h1></div><div class="${ssrRenderClass([{ "translate-y-32 opacity-0": isCompleted.value }, "w-full max-w-md px-8 pointer-events-auto transition-all duration-700 transform"])}" data-v-9f828ea7><div class="relative h-12 bg-black/30 backdrop-blur-md rounded-full border border-white/20 flex items-center px-2" data-v-9f828ea7><div class="absolute left-4 text-white/50 text-xs" data-v-9f828ea7>Flou</div><div class="absolute right-4 text-white/50 text-xs" data-v-9f828ea7>Net</div><input type="range" min="0" max="100"${ssrRenderAttr("value", focusLevel.value)}${ssrIncludeBooleanAttr(isCompleted.value) ? " disabled" : ""} class="w-full h-full opacity-0 absolute inset-0 z-20 cursor-pointer" data-v-9f828ea7><div class="absolute top-1 bottom-1 w-10 bg-white rounded-full shadow-lg transition-all duration-75 ease-out flex items-center justify-center" style="${ssrRenderStyle({ left: `calc(${focusLevel.value}% - 20px + ${(50 - focusLevel.value) * 0.4}px)` })}" data-v-9f828ea7><div class="w-1.5 h-4 border-l border-r border-stone-300" data-v-9f828ea7></div></div><div class="absolute top-1/2 left-2 right-2 h-0.5 bg-white/20 -z-10" data-v-9f828ea7></div></div></div></div></div>`);
    };
  }
});
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicFocus.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const MechanicFocus = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$8, [["__scopeId", "data-v-9f828ea7"]]), { __name: "MechanicsMechanicFocus" });
const TOTAL_CELLS_X = 10;
const TOTAL_CELLS_Y = 10;
const REQUIRED_COVERAGE = 0.6;
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "MechanicFlashlight",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const container = ref(null);
    const x = ref(-500);
    const y = ref(-500);
    const isCompleted = ref(false);
    const visitedCount = ref(0);
    const progress = computed(() => {
      return Math.min(100, visitedCount.value / (TOTAL_CELLS_X * TOTAL_CELLS_Y * REQUIRED_COVERAGE) * 100);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: "relative w-full h-full cursor-none overflow-hidden touch-none",
        ref_key: "container",
        ref: container
      }, _attrs))} data-v-9b3324f3><img${ssrRenderAttr("src", __props.image)} class="${ssrRenderClass([{ "brightness-100": isCompleted.value, "brightness-50": !isCompleted.value }, "absolute inset-0 w-full h-full object-cover pointer-events-none transition-all duration-1000"])}" data-v-9b3324f3><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value, "opacity-100": !isCompleted.value }, "absolute inset-0 bg-black z-10 transition-opacity duration-1000 pointer-events-none"])}" style="${ssrRenderStyle({
        "mask-image": `radial-gradient(circle 200px at ${x.value}px ${y.value}px, transparent 10%, black 100%)`,
        "-webkit-mask-image": `radial-gradient(circle 200px at ${x.value}px ${y.value}px, transparent 10%, black 100%)`
      })}" data-v-9b3324f3></div><div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-9b3324f3><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value }, "mb-8 text-center transition-opacity duration-500 px-6"])}" data-v-9b3324f3><h2 class="text-white font-serif text-2xl md:text-3xl mb-2 text-shadow-lg drop-shadow-md" data-v-9b3324f3> Explorez l&#39;obscurité... </h2><p class="text-white/80 text-sm max-w-md mx-auto drop-shadow" data-v-9b3324f3> Utilisez votre lumière pour révéler les secrets de ce lieu. </p><p class="text-white/50 text-xs mt-2" data-v-9b3324f3>${ssrInterpolate(Math.round(progress.value))}% exploré</p></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2"])}" data-v-9b3324f3><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-9b3324f3>${ssrInterpolate(__props.title)}</h1></div></div></div>`);
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicFlashlight.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const MechanicFlashlight = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$7, [["__scopeId", "data-v-9b3324f3"]]), { __name: "MechanicsMechanicFlashlight" });
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "MechanicPuzzle",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const tiles = ref([]);
    const selectedIdx = ref(null);
    const isCompleted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full flex flex-col items-center justify-center bg-black/90 p-4" }, _attrs))} data-v-f9410926><div class="${ssrRenderClass([{ "gap-0 p-0 scale-105 shadow-inner": isCompleted.value }, "relative aspect-square w-full max-w-md grid grid-cols-3 gap-1 bg-stone-800 p-1 shadow-2xl rounded-lg overflow-hidden transition-all duration-1000"])}" data-v-f9410926><!--[-->`);
      ssrRenderList(tiles.value, (tile, index) => {
        _push(`<div class="${ssrRenderClass([[
          selectedIdx.value === index ? "border-yellow-400 z-10 scale-95 brightness-110" : "border-transparent",
          isCompleted.value ? "border-none" : "hover:brightness-110"
        ], "relative w-full h-full cursor-pointer transition-all duration-300 ease-in-out border-2"])}" style="${ssrRenderStyle({
          backgroundImage: `url(${__props.image})`,
          backgroundSize: "300% 300%",
          backgroundPosition: `${tile.correctPos % 3 * 50}% ${Math.floor(tile.correctPos / 3) * 50}%`
        })}" data-v-f9410926></div>`);
      });
      _push(`<!--]--></div><div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-f9410926><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value }, "mb-8 text-center transition-opacity duration-500 px-6"])}" data-v-f9410926><h2 class="text-white font-serif text-2xl md:text-3xl mb-2 text-shadow-lg drop-shadow-md" data-v-f9410926> Recomposez le souvenir... </h2><p class="text-white/80 text-sm max-w-md mx-auto drop-shadow font-medium" data-v-f9410926> Touchez deux cases pour les échanger. </p></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2"])}" data-v-f9410926><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-f9410926>${ssrInterpolate(__props.title)}</h1></div></div></div>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicPuzzle.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const MechanicPuzzle = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-f9410926"]]), { __name: "MechanicsMechanicPuzzle" });
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "MechanicRotate",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const rings = ref([
      // Inner Ring (0% - 35%)
      {
        id: 0,
        currentAngle: Math.floor(Math.random() * 360),
        targetAngle: 0,
        mask: "radial-gradient(circle closest-side, black 35%, transparent 35.5%)"
      },
      // Middle Ring (35% - 65%)
      {
        id: 1,
        currentAngle: Math.floor(Math.random() * 360),
        targetAngle: 0,
        mask: "radial-gradient(circle closest-side, transparent 35%, black 35.5%, black 65%, transparent 65.5%)"
      },
      // Outer Ring (65% - 100%)
      {
        id: 2,
        currentAngle: Math.floor(Math.random() * 360),
        targetAngle: 0,
        mask: "radial-gradient(circle closest-side, transparent 65%, black 65.5%)"
      }
    ]);
    const isCompleted = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full flex flex-col items-center justify-center bg-black/90 p-4 overflow-hidden" }, _attrs))} data-v-b4c52a95><div class="relative w-[300px] h-[300px] md:w-[500px] md:h-[500px]" data-v-b4c52a95><img${ssrRenderAttr("src", __props.image)} class="absolute inset-0 w-full h-full object-cover rounded-full opacity-20 pointer-events-none blur-sm" data-v-b4c52a95><!--[-->`);
      ssrRenderList(rings.value, (ring, index) => {
        _push(`<div class="${ssrRenderClass([{ "duration-1000 ease-in-out": isCompleted.value }, "absolute inset-0 w-full h-full rounded-full cursor-grab active:cursor-grabbing transition-transform duration-300 ease-out will-change-transform shadow-2xl"])}" style="${ssrRenderStyle({
          transform: `rotate(${ring.currentAngle}deg)`,
          maskImage: ring.mask,
          WebkitMaskImage: ring.mask,
          zIndex: 10 + index
        })}" data-v-b4c52a95><img${ssrRenderAttr("src", __props.image)} class="w-full h-full object-cover pointer-events-none select-none" data-v-b4c52a95></div>`);
      });
      _push(`<!--]--></div><div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-b4c52a95><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value }, "mb-8 text-center transition-opacity duration-500 px-6"])}" data-v-b4c52a95><h2 class="text-white font-serif text-2xl md:text-3xl mb-2 text-shadow-lg drop-shadow-md" data-v-b4c52a95> Alignez le souvenir... </h2><p class="text-white/80 text-sm max-w-md mx-auto drop-shadow font-medium" data-v-b4c52a95> Faites tourner les anneaux pour reconstruire l&#39;image. </p></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2"])}" data-v-b4c52a95><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-b4c52a95>${ssrInterpolate(__props.title)}</h1></div></div></div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicRotate.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const MechanicRotate = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-b4c52a95"]]), { __name: "MechanicsMechanicRotate" });
const totalNotes = 7;
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "MechanicMelody",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const notes = ref([]);
    const collectedCount = ref(0);
    const isCompleted = ref(false);
    const imageStyle = computed(() => {
      if (isCompleted.value) {
        return {
          filter: "blur(0px) grayscale(0%) brightness(100%)",
          opacity: 1
        };
      }
      const progress = collectedCount.value / totalNotes;
      const blur = 20 * (1 - progress);
      const grayscale = 100 * (1 - progress);
      const brightness = 30 + 70 * progress;
      return {
        filter: `blur(${blur}px) grayscale(${grayscale}%) brightness(${brightness}%)`,
        opacity: 0.3 + 0.7 * progress
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full flex flex-col items-center justify-center bg-black overflow-hidden select-none" }, _attrs))} data-v-9339f1ad><div class="absolute inset-0 z-0" data-v-9339f1ad><img${ssrRenderAttr("src", __props.image)} class="w-full h-full object-cover transition-all duration-700 ease-out" style="${ssrRenderStyle(imageStyle.value)}" alt="Souvenir à recomposer" data-v-9339f1ad></div><div class="absolute inset-0 z-10 overflow-hidden pointer-events-none" data-v-9339f1ad><!--[-->`);
      ssrRenderList(notes.value, (note) => {
        _push(`<div class="absolute cursor-pointer pointer-events-auto hover:scale-110 active:scale-95 transition-transform duration-200 p-4" style="${ssrRenderStyle({
          left: `${note.x}%`,
          top: `${note.y}%`,
          animation: `float ${note.duration}s ease-in-out infinite ${note.delay}s`
        })}" data-v-9339f1ad><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="white" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="drop-shadow-lg text-white" data-v-9339f1ad>`);
        if (note.type === 0) {
          _push(`<path d="M9 18V5l12-2v13" data-v-9339f1ad></path>`);
        } else {
          _push(`<!---->`);
        }
        if (note.type === 0) {
          _push(`<path d="M6 15h3a3 3 0 1 1-3 3v-3Z" data-v-9339f1ad></path>`);
        } else {
          _push(`<!---->`);
        }
        if (note.type === 0) {
          _push(`<circle cx="18" cy="16" r="3" data-v-9339f1ad></circle>`);
        } else {
          _push(`<!---->`);
        }
        if (note.type === 1) {
          _push(`<path d="M9 18V5l12-2v13" data-v-9339f1ad></path>`);
        } else {
          _push(`<!---->`);
        }
        if (note.type === 1) {
          _push(`<path d="M6 15h3a3 3 0 1 1-3 3v-3Z" data-v-9339f1ad></path>`);
        } else {
          _push(`<!---->`);
        }
        if (note.type === 2) {
          _push(`<path d="M11 5L6 9H2v6h4l5 4V5z" data-v-9339f1ad></path>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</svg></div>`);
      });
      _push(`<!--]--></div><div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-9339f1ad><div class="${ssrRenderClass([{ "opacity-0": isCompleted.value }, "mb-12 text-center transition-opacity duration-500 px-6"])}" data-v-9339f1ad><h2 class="text-white font-serif text-2xl md:text-3xl mb-2 text-shadow-lg drop-shadow-md" data-v-9339f1ad> Attrapez la mélodie... </h2><p class="text-white/80 text-sm max-w-md mx-auto drop-shadow font-medium" data-v-9339f1ad> Cliquez sur les notes pour éclaircir le souvenir (${ssrInterpolate(collectedCount.value)}/${ssrInterpolate(totalNotes)}). </p></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2"])}" data-v-9339f1ad><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-9339f1ad>${ssrInterpolate(__props.title)}</h1></div></div></div>`);
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicMelody.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const MechanicMelody = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-9339f1ad"]]), { __name: "MechanicsMechanicMelody" });
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "MechanicDifference",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const isCompleted = ref(false);
    ref(null);
    const clickFeedback = ref(null);
    const activeZones = ref([]);
    const foundZones = computed(() => activeZones.value.filter((z) => z.found));
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full bg-stone-900 overflow-hidden select-none" }, _attrs))} data-v-ea94c172><div class="relative w-full h-full cursor-crosshair" data-v-ea94c172><img${ssrRenderAttr("src", __props.image)} class="${ssrRenderClass([{ "opacity-100": isCompleted.value }, "w-full h-full object-cover opacity-60 transition-all duration-500"])}" data-v-ea94c172><!--[-->`);
      ssrRenderList(foundZones.value, (zone, index) => {
        _push(`<div class="absolute border-2 border-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)] pointer-events-none transition-all duration-500" style="${ssrRenderStyle({
          left: `${zone.x}%`,
          top: `${zone.y}%`,
          width: `${zone.size}%`,
          paddingBottom: `${zone.size}%`,
          // Aspect ratio hack
          transform: "translate(-50%, -50%) scale(1)"
        })}" data-v-ea94c172></div>`);
      });
      _push(`<!--]-->`);
      if (clickFeedback.value) {
        _push(`<div class="absolute rounded-full border border-white/50 animate-ping pointer-events-none" style="${ssrRenderStyle({ left: clickFeedback.value.x + "px", top: clickFeedback.value.y + "px", width: "40px", height: "40px", transform: "translate(-50%, -50%)" })}" data-v-ea94c172></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (!isCompleted.value) {
        _push(`<div class="absolute bottom-0 w-full p-6 bg-gradient-to-t from-black/90 to-transparent flex flex-col items-center" data-v-ea94c172><h2 class="text-white font-serif text-xl mb-4 text-shadow" data-v-ea94c172>Retrouvez ces détails...</h2><div class="flex gap-4 md:gap-8" data-v-ea94c172><!--[-->`);
        ssrRenderList(activeZones.value, (zone, index) => {
          _push(`<div class="${ssrRenderClass([zone.found ? "border-green-500 opacity-50 scale-90 grayscale" : "border-white hover:scale-110 shadow-lg", "relative w-24 h-24 rounded-full border-4 overflow-hidden bg-black transition-all duration-300 bg-no-repeat"])}" style="${ssrRenderStyle({
            backgroundImage: `url(${__props.image})`,
            backgroundSize: "500%",
            // 5x zoom
            backgroundPosition: `${zone.x}% ${zone.y}%`
          })}" data-v-ea94c172>`);
          if (zone.found) {
            _push(`<div class="absolute inset-0 flex items-center justify-center bg-black/40" data-v-ea94c172><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22c55e" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" data-v-ea94c172><polyline points="20 6 9 17 4 12" data-v-ea94c172></polyline></svg></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "absolute inset-0 pointer-events-none flex flex-col items-center justify-center transition-all duration-1000 transform px-6"])}" data-v-ea94c172><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-ea94c172>${ssrInterpolate(__props.title)}</h1></div></div>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicDifference.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const MechanicDifference = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$3, [["__scopeId", "data-v-ea94c172"]]), { __name: "MechanicsMechanicDifference" });
const totalRounds = 3;
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MechanicSequence",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const isCompleted = ref(false);
    const activeLight = ref(null);
    const lights = [
      { positionClass: "top-10 left-1/2 -translate-x-1/2" },
      // Top
      { positionClass: "bottom-10 left-1/2 -translate-x-1/2" },
      // Bottom
      { positionClass: "left-10 top-1/2 -translate-y-1/2" },
      // Left
      { positionClass: "right-10 top-1/2 -translate-y-1/2" }
      // Right
    ];
    const gameState = ref("IDLE");
    const statusMessage = ref("Mémorisez la séquence...");
    ref([]);
    ref([]);
    const currentRound = ref(0);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full bg-black overflow-hidden select-none" }, _attrs))} data-v-0389c8e2><img${ssrRenderAttr("src", __props.image)} class="${ssrRenderClass([{ "opacity-100 transition-opacity duration-1000": isCompleted.value }, "absolute inset-0 w-full h-full object-cover opacity-40"])}" data-v-0389c8e2>`);
      if (!isCompleted.value) {
        _push(`<div class="absolute inset-0 z-10 flex items-center justify-center" data-v-0389c8e2><div class="relative w-full max-w-lg aspect-square" data-v-0389c8e2><!--[-->`);
        ssrRenderList(lights, (light, index) => {
          _push(`<div class="${ssrRenderClass([[
            light.positionClass,
            activeLight.value === index ? "bg-yellow-100 shadow-[0_0_50px_20px_rgba(255,255,200,0.8)] scale-110 border-white" : "bg-black/50 hover:bg-white/10"
          ], "absolute w-24 h-24 rounded-full border-4 border-white/50 cursor-pointer transition-all duration-200 flex items-center justify-center"])}" data-v-0389c8e2>`);
          if (activeLight.value === index) {
            _push(`<div class="w-full h-full bg-white/20 rounded-full blur-md" data-v-0389c8e2></div>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div>`);
        });
        _push(`<!--]--></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="absolute inset-0 z-20 flex flex-col items-center justify-end pb-20 pointer-events-none" data-v-0389c8e2>`);
      if (!isCompleted.value) {
        _push(`<div class="mb-12 text-center transition-opacity duration-300 pointer-events-auto" data-v-0389c8e2><h2 class="text-white font-serif text-2xl mb-2 text-shadow-lg" data-v-0389c8e2>${ssrInterpolate(statusMessage.value)}</h2><div class="flex gap-2 justify-center mt-4" data-v-0389c8e2><!--[-->`);
        ssrRenderList(totalRounds, (i) => {
          _push(`<div class="${ssrRenderClass([currentRound.value >= i ? "bg-yellow-400 shadow-glow" : "bg-stone-600", "w-3 h-3 rounded-full transition-colors"])}" data-v-0389c8e2></div>`);
        });
        _push(`<!--]--></div>`);
        if (gameState.value === "FAIL" || gameState.value === "IDLE") {
          _push(`<button class="mt-6 px-6 py-2 bg-white text-black font-bold rounded-full hover:bg-yellow-400 transition-colors pointer-events-auto" data-v-0389c8e2>${ssrInterpolate(gameState.value === "FAIL" ? "Réessayer" : "Commencer")}</button>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "mb-20 text-center transition-all duration-1000 transform px-6 absolute top-1/2 -translate-y-1/2 w-full"])}" data-v-0389c8e2><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-0389c8e2>${ssrInterpolate(__props.title)}</h1></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicSequence.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const MechanicSequence = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["__scopeId", "data-v-0389c8e2"]]), { __name: "MechanicsMechanicSequence" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "MechanicTuning",
  __ssrInlineRender: true,
  props: {
    image: {},
    title: {},
    initialCompleted: { type: Boolean }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const isCompleted = ref(false);
    const currentValue = ref(50);
    const targetValue = ref(0);
    const distance = computed(() => Math.abs(currentValue.value - targetValue.value));
    const signalStrength = computed(() => {
      if (distance.value > 20) return 0;
      if (distance.value < 0.5) return 100;
      return Math.round((1 - distance.value / 20) * 100);
    });
    const isSignalStrong = computed(() => signalStrength.value > 90);
    const noiseOpacity = computed(() => {
      if (isCompleted.value) return 0;
      return Math.min(0.8, distance.value / 30);
    });
    const imageStyle = computed(() => {
      if (isCompleted.value) return { filter: "none", opacity: 1 };
      const blur = Math.min(20, distance.value / 2);
      const grayscale = Math.min(100, distance.value * 2);
      return {
        filter: `blur(${blur}px) grayscale(${grayscale}%)`,
        opacity: 0.3 + 0.7 * (signalStrength.value / 100)
      };
    });
    const userWavePath = computed(() => {
      const diff = currentValue.value - targetValue.value;
      const distortion = diff;
      const cp1x = 25 + distortion * 2;
      return `M0 50 Q ${cp1x} 10, 50 50 T 100 50`;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "relative w-full h-full bg-[#1a1a1a] overflow-hidden select-none flex flex-col items-center justify-center" }, _attrs))} data-v-6af7bb78><div class="absolute inset-0 z-0" data-v-6af7bb78><img${ssrRenderAttr("src", __props.image)} class="w-full h-full object-cover transition-all duration-300" style="${ssrRenderStyle(imageStyle.value)}" data-v-6af7bb78><div class="absolute inset-0 opacity-50 pointer-events-none mix-blend-overlay" style="${ssrRenderStyle({ opacity: noiseOpacity.value, backgroundImage: "url(https://grainy-gradients.vercel.app/noise.svg)" })}" data-v-6af7bb78></div></div><div class="${ssrRenderClass([{ "opacity-0 pointer-events-none": isCompleted.value }, "relative z-20 w-full max-w-md p-8 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl transition-all duration-500"])}" data-v-6af7bb78><h2 class="text-white font-serif text-2xl mb-6 text-center text-shadow" data-v-6af7bb78>Réglage de la fréquence...</h2><div class="relative w-full h-32 bg-black/80 rounded-lg mb-8 overflow-hidden border border-green-500/30 shadow-[inset_0_0_20px_rgba(0,0,0,1)]" data-v-6af7bb78><svg class="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none" data-v-6af7bb78><path d="M0 50 Q 25 10, 50 50 T 100 50" fill="none" stroke="#22c55e" stroke-width="2" vector-effect="non-scaling-stroke" data-v-6af7bb78></path></svg><svg class="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" data-v-6af7bb78><path${ssrRenderAttr("d", userWavePath.value)} fill="none"${ssrRenderAttr("stroke", isSignalStrong.value ? "#22c55e" : "#ef4444")} stroke-width="3" vector-effect="non-scaling-stroke" class="transition-all duration-100" data-v-6af7bb78></path></svg><div class="${ssrRenderClass([isSignalStrong.value ? "text-green-400" : "text-red-500", "absolute top-2 right-2 text-xs font-mono"])}" data-v-6af7bb78> SIGNAL: ${ssrInterpolate(signalStrength.value)}% </div></div><div class="flex flex-col gap-6" data-v-6af7bb78><div data-v-6af7bb78><label class="block text-white/50 text-xs uppercase tracking-widest mb-2" data-v-6af7bb78>Fréquence (MHz)</label><input type="range" min="0" max="100" step="0.1"${ssrRenderAttr("value", currentValue.value)} class="w-full h-2 bg-stone-700 rounded-lg appearance-none cursor-pointer accent-green-500" data-v-6af7bb78></div><button class="${ssrRenderClass([isSignalStrong.value ? "bg-green-500 text-white hover:bg-green-400 hover:scale-[1.02] cursor-pointer" : "bg-stone-800 text-white/20 cursor-not-allowed", "w-full py-4 rounded-xl font-bold uppercase tracking-widest transition-all shadow-lg"])}"${ssrIncludeBooleanAttr(!isSignalStrong.value) ? " disabled" : ""} data-v-6af7bb78>${ssrInterpolate(isSignalStrong.value ? "Capter le signal" : "Recherche...")}</button></div></div><div class="${ssrRenderClass([isCompleted.value ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-10", "absolute bottom-20 z-20 text-center transition-all duration-1000 transform px-6 w-full"])}" data-v-6af7bb78><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider" data-v-6af7bb78>${ssrInterpolate(__props.title)}</h1></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/mechanics/MechanicTuning.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const MechanicTuning = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["__scopeId", "data-v-6af7bb78"]]), { __name: "MechanicsMechanicTuning" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[id]",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const config = useRuntimeConfig();
    const tokenCookie = useCookie("auth_token");
    useRouter();
    const placeId = route.params.id;
    const isCompleted = ref(false);
    const { data: place, pending, error } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/places/${placeId}`, "$KBjPut1aMZ")), __temp = await __temp, __restore(), __temp);
    const { data: user } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/user/profile`, {
      headers: {
        "Authorization": `Bearer ${tokenCookie.value}`
      }
    }, "$lglqkNus7h")), __temp = await __temp, __restore(), __temp);
    if (user.value && user.value.progress && place.value) {
      const isUnlocked = user.value.progress.some((p) => p.placeId === placeId && p.isCompleted);
      if (isUnlocked) {
        isCompleted.value = true;
      }
    }
    const currentMechanic = computed(() => {
      if (!place.value) return MechanicFocus;
      switch (place.value.order) {
        case 3:
          return MechanicFlashlight;
        case 4:
          return MechanicMelody;
        case 5:
          return MechanicPuzzle;
        case 6:
          return MechanicRotate;
        case 7:
          return MechanicDifference;
        case 8:
          return MechanicSequence;
        case 9:
          return MechanicTuning;
        default:
          return MechanicFocus;
      }
    });
    const completeDiscovery = async () => {
      if (isCompleted.value) return;
      isCompleted.value = true;
      if (tokenCookie.value) {
        try {
          await fetch(`${config.public.apiBase}/user/progress`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${tokenCookie.value}`
            },
            body: JSON.stringify({ placeId })
          });
        } catch (err) {
          console.error("Failed to save progress", err);
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative w-full transition-all duration-1000", { "h-screen overflow-hidden": !isCompleted.value, "min-h-screen bg-stone-50": isCompleted.value }]
      }, _attrs))} data-v-e52f3f8b>`);
      if (unref(pending)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center text-white/50 z-50 bg-black" data-v-e52f3f8b><p class="animate-pulse" data-v-e52f3f8b>Initialisation de la mémoire...</p></div>`);
      } else if (unref(error) || !unref(place)) {
        _push(`<div class="absolute inset-0 flex items-center justify-center text-red-500 z-50 bg-black" data-v-e52f3f8b><p data-v-e52f3f8b>Souvenir introuvable.</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/map",
          class: "block mt-4 text-white underline"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`Retour`);
            } else {
              return [
                createTextVNode("Retour")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="relative w-full h-screen sticky top-0 z-0 bg-black" data-v-e52f3f8b>`);
        if (!isCompleted.value) {
          ssrRenderVNode(_push, createVNode(resolveDynamicComponent(currentMechanic.value), {
            image: unref(place).watercolorLayer,
            title: unref(place).title,
            "initial-completed": false,
            onComplete: completeDiscovery
          }, null), _parent);
        } else {
          _push(`<div class="relative w-full h-full" data-v-e52f3f8b><img${ssrRenderAttr("src", unref(place).watercolorLayer)} class="absolute inset-0 w-full h-full object-cover" data-v-e52f3f8b><div class="absolute inset-0 bg-black/20 pointer-events-none" data-v-e52f3f8b></div><div class="absolute inset-0 flex flex-col items-center justify-center p-6 text-center" data-v-e52f3f8b><h1 class="text-white font-serif text-5xl md:text-7xl font-bold text-shadow-lg tracking-wider animate-fade-in-up" data-v-e52f3f8b>${ssrInterpolate(unref(place).title)}</h1></div></div>`);
        }
        if (isCompleted.value) {
          _push(`<div class="absolute bottom-8 left-0 right-0 z-30 flex justify-center animate-bounce" data-v-e52f3f8b><div class="p-3 bg-white/20 backdrop-blur-md rounded-full text-white cursor-pointer shadow-lg border border-white/10 hover:bg-white/30 transition-colors" data-v-e52f3f8b><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-e52f3f8b><path d="M12 5v14" data-v-e52f3f8b></path><path d="m19 12-7 7-7-7" data-v-e52f3f8b></path></svg></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      if (unref(place)) {
        _push(`<section id="details" class="relative z-30 bg-white min-h-[50vh]" data-v-e52f3f8b><div class="container mx-auto px-6 py-24 max-w-4xl text-center" data-v-e52f3f8b><span class="text-sm font-bold uppercase tracking-widest text-stone-500 block mb-4" data-v-e52f3f8b>Chapitre ${ssrInterpolate(unref(place).order)}</span><h2 class="text-4xl md:text-5xl font-serif text-[#2C3E50] leading-tight mb-8" data-v-e52f3f8b>${ssrInterpolate(unref(place).title)}</h2><div class="w-24 h-1 bg-stone-200 mx-auto mb-12" data-v-e52f3f8b></div><p class="text-xl text-stone-600 leading-loose font-light mb-16" data-v-e52f3f8b>${ssrInterpolate(unref(place).description)}</p>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/map",
          class: "inline-flex items-center gap-2 px-8 py-4 bg-[#2C3E50] text-white rounded-full font-bold shadow-lg hover:bg-[#34495E] hover:scale-105 transition-all"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span data-v-e52f3f8b${_scopeId}>Retour à la Carte</span>`);
            } else {
              return [
                createVNode("span", null, "Retour à la Carte")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div></section>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/discovery/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-e52f3f8b"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-Cul2cr-i.mjs.map
