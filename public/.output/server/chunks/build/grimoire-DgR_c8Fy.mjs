import { _ as __nuxt_component_0 } from './nuxt-link-B-UF9dEV.mjs';
import { withAsyncContext, computed, ref, watch, mergeProps, withCtx, createVNode, unref, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr, ssrRenderTeleport, ssrRenderStyle } from 'vue/server-renderer';
import { defineStore } from 'pinia';
import { _ as _export_sfc, b as useRoute, c as useRuntimeConfig } from './server.mjs';
import { u as useTotems } from './useTotems-fFvG8yBz.mjs';
import { u as useFetch } from './fetch-Clcf5u9m.mjs';
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
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'vue-router';
import '@vue/shared';
import './ssr-DzJ2wLrC.mjs';

const _sfc_main$3 = {
  __name: "SharedBreathingLoader",
  __ssrInlineRender: true,
  props: {
    duration: {
      type: Number,
      default: 4e3
      // Total cycle time (Inhale + Exhale approx)
    },
    minCycles: {
      type: Number,
      default: 1
    },
    color: {
      type: String,
      default: "#2C3E50"
    }
  },
  emits: ["complete"],
  setup(__props, { emit: __emit }) {
    const isInhaling = ref(false);
    const instruction = ref("Inspirez...");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/90 backdrop-blur-md transition-opacity duration-500" }, _attrs))} data-v-d8523622><div class="relative flex items-center justify-center w-64 h-64" data-v-d8523622><div style="${ssrRenderStyle({ backgroundColor: `${__props.color}20` })}" class="${ssrRenderClass([{ "w-64 h-64 opacity-100": isInhaling.value, "w-16 h-16 opacity-30": !isInhaling.value }, "absolute rounded-full blur-2xl transition-all duration-[4000ms] ease-in-out"])}" data-v-d8523622></div><div style="${ssrRenderStyle({ backgroundColor: `${__props.color}40`, borderColor: `${__props.color}20` })}" class="${ssrRenderClass([{ "w-48 h-48": isInhaling.value, "w-12 h-12": !isInhaling.value }, "absolute rounded-full transition-all duration-[4000ms] ease-in-out border"])}" data-v-d8523622></div><p class="relative z-10 font-serif text-xl font-light tracking-widest transition-opacity duration-1000" style="${ssrRenderStyle({ color: __props.color })}" data-v-d8523622>${ssrInterpolate(instruction.value)}</p></div><div class="mt-8 font-light text-sm tracking-wide animate-pulse" style="${ssrRenderStyle({ color: `${__props.color}80` })}" data-v-d8523622> Laissez le temps au temps... </div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/shared/BreathingLoader.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const BreathingLoader = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-d8523622"]]);
const _sfc_main$2 = {
  __name: "GrimoireEnigmaCard",
  __ssrInlineRender: true,
  props: {
    enigmaId: { type: String, required: true },
    question: { type: String, required: true },
    initiallySolved: { type: Boolean, default: false },
    themeColor: { type: String, default: "#2C3E50" }
  },
  emits: ["unlocked"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const answer = ref("");
    const isLoading = ref(false);
    const isMeditating = ref(false);
    const pendingResponse = ref(null);
    const error = ref("");
    const isSolved = ref(props.initiallySolved);
    watch(() => props.initiallySolved, (newVal) => {
      if (newVal) {
        isSolved.value = true;
      }
    });
    const onMeditationComplete = () => {
      isMeditating.value = false;
      isLoading.value = false;
      if (pendingResponse.value) {
        if (pendingResponse.value.success) {
          const data = pendingResponse.value.data;
          if (data.success) {
            isSolved.value = true;
            const reward = data.reward;
            const fragmentData = {
              id: props.enigmaId,
              url: reward.fragment_svg_path,
              x: reward.x,
              y: reward.y,
              width: reward.width,
              zIndex: reward.zIndex
            };
            emit("unlocked", fragmentData);
          } else {
            error.value = "La réponse n'est pas celle attendue par le totem.";
          }
        } else {
          console.error(pendingResponse.value.err);
          error.value = "Les esprits semblent perturbés (Erreur serveur).";
        }
      } else {
        error.value = "Pas de réponse des esprits...";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="relative p-6 bg-white rounded-2xl border border-stone-100 shadow-sm hover:shadow-md transition-all"><div class="flex justify-between items-start mb-4"><h3 class="text-[#2C3E50] font-serif text-xl font-bold tracking-wide"> Énigme #${ssrInterpolate(__props.enigmaId)}</h3>`);
      if (isSolved.value) {
        _push(`<span class="text-green-600 text-xs font-bold uppercase tracking-widest bg-green-50 border border-green-100 px-2 py-1 rounded"> Résolu </span>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><p class="text-stone-600 font-light leading-relaxed mb-6">${ssrInterpolate(__props.question)}</p>`);
      if (isSolved.value) {
        _push(`<div class="text-center py-2"><p class="text-[#2C3E50] italic font-serif opacity-70">&quot;Le fragment s&#39;est révélé...&quot;</p></div>`);
      } else {
        _push(`<form class="flex flex-col gap-4"><input${ssrRenderAttr("value", answer.value)} type="text" placeholder="Votre réponse..." class="w-full bg-stone-50 border border-stone-200 text-[#2C3E50] px-4 py-3 rounded-xl focus:ring-2 focus:ring-[#2C3E50]/20 focus:border-[#2C3E50] outline-none transition-all placeholder-stone-400"${ssrIncludeBooleanAttr(isLoading.value) ? " disabled" : ""}><button type="submit"${ssrIncludeBooleanAttr(!answer.value || isLoading.value) ? " disabled" : ""} class="w-full py-3 bg-[#2C3E50] text-white font-bold rounded-xl hover:bg-[#34495E] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md active:scale-[0.98]">`);
        if (isLoading.value) {
          _push(`<span class="animate-pulse">Invocation...</span>`);
        } else {
          _push(`<span>Invoquer</span>`);
        }
        _push(`</button>`);
        if (error.value) {
          _push(`<p class="text-red-500 text-xs text-center mt-1">${ssrInterpolate(error.value)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</form>`);
      }
      _push(`</div>`);
      ssrRenderTeleport(_push, (_push2) => {
        if (isMeditating.value) {
          _push2(ssrRenderComponent(BreathingLoader, {
            duration: 4e3,
            color: __props.themeColor,
            onComplete: onMeditationComplete
          }, null, _parent));
        } else {
          _push2(`<!---->`);
        }
      }, "body", false, _parent);
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/grimoire/EnigmaCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const useGrimoireStore = defineStore("grimoire", {
  state: () => ({
    unlockedFragments: []
    // Array of objects containing fragment data
  }),
  actions: {
    /**
     * Unlock a new totem fragment
     * @param {Object} fragment - Fragment data { id, url, x, y, zIndex }
     */
    unlockFragment(fragment) {
      if (!this.unlockedFragments.find((f) => f.id === fragment.id)) {
        this.unlockedFragments.push(fragment);
      }
    },
    /**
     * Check if a fragment is already unlocked
     * @param {String} id 
     */
    isUnlocked(id) {
      return !!this.unlockedFragments.find((f) => f.id === id);
    }
  }
});
const _sfc_main$1 = {
  __name: "GrimoireTotemCanvas",
  __ssrInlineRender: true,
  props: {
    scale: {
      type: Number,
      default: 1
    },
    isCompleted: {
      type: Boolean,
      default: false
    },
    totemId: {
      type: Number,
      required: true
    },
    completedImage: {
      type: String,
      required: true
    },
    heightClass: {
      type: String,
      default: "h-[600px]"
    }
  },
  setup(__props) {
    const props = __props;
    const store = useGrimoireStore();
    const currentFragments = computed(() => {
      return store.unlockedFragments.filter((f) => f.totemId === props.totemId);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["relative w-full flex items-center justify-center bg-stone-50/50 rounded-2xl border border-stone-100 overflow-hidden", __props.heightClass]
      }, _attrs))} data-v-12393e99>`);
      if (__props.isCompleted) {
        _push(`<div class="w-full h-full p-8 animate-fade-in duration-1000" data-v-12393e99><img${ssrRenderAttr("src", __props.completedImage)} alt="Totem Complet" class="w-full h-full object-contain drop-shadow-2xl" data-v-12393e99></div>`);
      } else if (currentFragments.value.length === 0) {
        _push(`<div class="text-center opacity-40 select-none pointer-events-none" data-v-12393e99><div class="text-6xl mb-4 grayscale opacity-50" data-v-12393e99>🔮</div><p class="font-serif text-stone-400" data-v-12393e99>Totem endormi...</p></div>`);
      } else {
        _push(`<div class="relative w-full h-full flex justify-center items-center p-4" data-v-12393e99><div class="relative h-full aspect-[2/3]" data-v-12393e99><!--[-->`);
        ssrRenderList(currentFragments.value, (fragment) => {
          _push(`<div class="absolute transition-all duration-1000 ease-out flex justify-center" style="${ssrRenderStyle({
            top: `${fragment.y}%`,
            left: "50%",
            transform: "translate(-50%, 0)",
            zIndex: fragment.zIndex,
            width: fragment.width ? `${fragment.width * __props.scale}px` : `${100 * __props.scale}px`
          })}" data-v-12393e99><img${ssrRenderAttr("src", fragment.url)} class="w-full h-auto" style="${ssrRenderStyle({
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))"
          })}" alt="Totem Fragment" data-v-12393e99></div>`);
        });
        _push(`<!--]--></div></div>`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/grimoire/TotemCanvas.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TotemCanvas = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-12393e99"]]);
const _sfc_main = {
  __name: "grimoire",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const route = useRoute();
    const store = useGrimoireStore();
    const { totemMetadata } = useTotems();
    const config = useRuntimeConfig();
    const { data: enigmas } = ([__temp, __restore] = withAsyncContext(() => useFetch(`${config.public.apiBase}/enigmas`, "$biZPAlTBUP")), __temp = await __temp, __restore(), __temp);
    useCookie("auth_token");
    const availableTotems = computed(() => {
      if (!enigmas.value) return [];
      const uniqueIds = [...new Set(enigmas.value.map((e) => e.totem_id || 1))].sort((a, b) => a - b);
      return uniqueIds.map((id) => {
        const meta = totemMetadata[id];
        return {
          id,
          name: meta?.name || `Totem #${id}`,
          image: meta?.image || "",
          // Provide a default placeholder URL if needed, or empty
          description: meta?.description || "Un nouveau mystère à résoudre."
        };
      });
    });
    const totemPalette = {
      1: "#10B981",
      // Emerald (Nature)
      2: "#F59E0B",
      // Amber (Warmth/Light)
      3: "#3B82F6",
      // Blue (Water/Sky)
      4: "#8B5CF6",
      // Purple (Mystery)
      5: "#EC4899",
      // Pink (Love/Charm)
      6: "#6366F1"
      // Indigo
    };
    const activeTotemColor = computed(() => {
      return totemPalette[activeTotemId.value] || "#2C3E50";
    });
    const activeTotemId = ref(1);
    watch(availableTotems, (newVal) => {
      const rawQuery = Array.isArray(route.query.totemId) ? route.query.totemId[0] : route.query.totemId;
      const queryTotemId = parseInt(rawQuery);
      if (queryTotemId && newVal.find((t) => t.id === queryTotemId)) {
        activeTotemId.value = queryTotemId;
      } else if (newVal.length > 0 && !newVal.find((t) => t.id === activeTotemId.value)) {
        activeTotemId.value = newVal[0].id;
      }
    }, { immediate: true });
    const activeTotem = computed(() => {
      return availableTotems.value.find((t) => t.id === activeTotemId.value) || availableTotems.value[0] || {};
    });
    const currentEnigmas = computed(() => {
      if (!enigmas.value) return [];
      return enigmas.value.filter((e) => (e.totem_id || 1) == activeTotemId.value).sort((a, b) => a.id - b.id);
    });
    const showSuccessModal = ref(false);
    const isRestoring = ref(true);
    const isCurrentTotemCompleted = computed(() => {
      if (currentEnigmas.value.length === 0) return false;
      return currentEnigmas.value.every((e) => store.isUnlocked(e.id));
    });
    const isTotemCompleted = (tId) => {
      const totemEnigmas = enigmas.value ? enigmas.value.filter((e) => (e.totem_id || 1) === tId) : [];
      if (totemEnigmas.length === 0) return false;
      return totemEnigmas.every((e) => store.isUnlocked(e.id));
    };
    watch(isCurrentTotemCompleted, (newVal, oldVal) => {
      if (newVal && !oldVal && !isRestoring.value) {
        showSuccessModal.value = true;
      }
    });
    const handleUnlock = (fragment) => {
      const enigma = enigmas.value.find((e) => e.id === fragment.id);
      if (enigma) {
        store.unlockFragment({
          ...fragment,
          totemId: enigma.totem_id || 1
        });
      } else {
        store.unlockFragment(fragment);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen text-[#2C3E50] font-sans" }, _attrs))} data-v-b9d2ba7e><div class="container mx-auto px-6 py-12 flex flex-col lg:flex-row gap-12 items-start justify-center min-h-screen" data-v-b9d2ba7e><div class="w-full lg:w-5/12 h-auto z-10 flex flex-col order-2 lg:order-1 sticky top-12" data-v-b9d2ba7e><div class="bg-white rounded-3xl w-full flex flex-col overflow-hidden divide-y divide-stone-100 shadow-sm border border-stone-100" data-v-b9d2ba7e><div class="p-6 pb-2 text-center border-b border-stone-50" data-v-b9d2ba7e><h2 class="font-serif text-3xl text-[#2C3E50] font-bold" data-v-b9d2ba7e>Totems</h2></div><!--[-->`);
      ssrRenderList(availableTotems.value, (totem) => {
        _push(`<div class="${ssrRenderClass([activeTotemId.value === totem.id ? "bg-stone-50" : "hover:bg-stone-50/50", "relative p-6 flex flex-col items-center cursor-pointer transition-all duration-300"])}" data-v-b9d2ba7e>`);
        if (activeTotemId.value === totem.id) {
          _push(`<div class="absolute left-0 top-0 bottom-0 w-2 bg-[#2C3E50]" data-v-b9d2ba7e></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="w-full relative" data-v-b9d2ba7e>`);
        _push(ssrRenderComponent(TotemCanvas, {
          totemId: totem.id,
          completedImage: totem.image,
          scale: 2,
          heightClass: "h-[300px]",
          isCompleted: isTotemCompleted(totem.id),
          class: ["transition-opacity duration-300", activeTotemId.value === totem.id ? "opacity-100" : "opacity-70 grayscale-[0.5]"]
        }, null, _parent));
        _push(`</div></div>`);
      });
      _push(`<!--]--></div></div><div class="w-full lg:w-6/12 flex flex-col gap-8 order-1 lg:order-2" data-v-b9d2ba7e><div class="mb-4" data-v-b9d2ba7e><h1 class="text-4xl md:text-5xl font-serif font-bold text-[#2C3E50] mb-4" data-v-b9d2ba7e>Le Grimoire</h1><p class="text-lg text-stone-500 leading-relaxed border-l-4 border-[#2C3E50] pl-4 py-1 italic mb-4" data-v-b9d2ba7e> &quot;${ssrInterpolate(activeTotem.value.description)}&quot; </p>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: `/map?focusTotem=${activeTotemId.value}`,
        class: "inline-flex items-center gap-2 px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 rounded-full text-sm font-bold transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span data-v-b9d2ba7e${_scopeId}>📍 Localiser le Sanctuaire</span>`);
          } else {
            return [
              createVNode("span", null, "📍 Localiser le Sanctuaire")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div${ssrRenderAttrs({
        "enter-active-class": "transition duration-500 ease-out",
        "enter-from-class": "transform translate-y-10 opacity-0",
        "leave-active-class": "absolute opacity-0 hidden",
        class: "flex flex-col gap-6 relative"
      })} data-v-b9d2ba7e>`);
      ssrRenderList(currentEnigmas.value, (enigma) => {
        _push(ssrRenderComponent(_sfc_main$2, {
          key: enigma.id,
          enigmaId: enigma.id,
          question: enigma.question,
          initiallySolved: unref(store).isUnlocked(enigma.id),
          themeColor: activeTotemColor.value,
          onUnlocked: handleUnlock
        }, null, _parent));
      });
      if (currentEnigmas.value.length === 0) {
        _push(`<div class="text-center py-12 text-stone-400 italic" data-v-b9d2ba7e> Aucune énigme trouvée pour ce totem. </div>`);
      }
      _push(`</div></div></div>`);
      if (showSuccessModal.value) {
        _push(`<div class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-md" data-v-b9d2ba7e><div class="bg-white p-12 max-w-lg w-full text-center rounded-3xl transform scale-100 animate-[bounce-in_0.5s_ease-out] shadow-2xl" data-v-b9d2ba7e><div class="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600" data-v-b9d2ba7e><svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-v-b9d2ba7e><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" data-v-b9d2ba7e></path><path d="m9 12 2 2 4-4" data-v-b9d2ba7e></path></svg></div><h2 class="text-3xl font-serif text-[#2C3E50] font-bold mb-4" data-v-b9d2ba7e>Le Totem est Complet !</h2><p class="text-stone-600 mb-8 leading-relaxed" data-v-b9d2ba7e> Vous avez rassemblé tous les fragments. L&#39;esprit de la ville est réveillé. </p><div class="p-4 bg-stone-50 rounded-xl border border-stone-100 mb-8" data-v-b9d2ba7e><p class="text-[#2C3E50] font-bold flex items-center justify-center gap-2" data-v-b9d2ba7e> ✨ Le Totem a été ajouté à votre profil </p></div><div class="flex flex-col gap-3" data-v-b9d2ba7e>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/profile",
          class: "w-full py-4 bg-[#2C3E50] text-white rounded-xl font-bold hover:bg-[#34495E] hover:scale-105 transition-all shadow-lg"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Voir mon Profil `);
            } else {
              return [
                createTextVNode(" Voir mon Profil ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`<button class="text-stone-400 text-sm hover:text-stone-600 underline mt-2" data-v-b9d2ba7e> Rester sur le Grimoire </button></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/grimoire.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const grimoire = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-b9d2ba7e"]]);

export { grimoire as default };
//# sourceMappingURL=grimoire-DgR_c8Fy.mjs.map
