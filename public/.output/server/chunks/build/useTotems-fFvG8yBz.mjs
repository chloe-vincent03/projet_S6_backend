const useTotems = () => {
  const totemMetadata = {
    1: {
      name: "Le Veilleur",
      image: "https://res.cloudinary.com/dveki8qer/image/upload/v1768909823/totem_ezvedw.svg",
      description: "C'est l'esprit des parcs oubliés et des vieilles pierres. Il raconte comment la nature reprend toujours ses droits, s'infiltrant entre les pavés pour nous rappeler que la ville n'est pas éternelle.",
      coordinates: { x: 500, y: 1200 }
      // Near a park area ideally
    },
    2: {
      name: "L'Éveilleur",
      image: "https://res.cloudinary.com/dveki8qer/image/upload/v1768987067/totem_02_ctfw6u.svg",
      description: "Gardien des premières lueurs, il connaît les histoires de ceux qui bâtissent la cité de leurs mains. Il murmure les secrets de l'aube et de l'innovation.",
      coordinates: { x: 1500, y: 800 }
      // Industrial/East side
    },
    3: {
      name: "Le Voyageur",
      image: "https://res.cloudinary.com/dveki8qer/image/upload/v1768987064/totem_03_rocezc.svg",
      description: "L'âme des rivières souterraines et des passants anonymes. Il porte en lui la mémoire de tous les pas qui ont foulé ces rues avant vous.",
      coordinates: { x: 1e3, y: 400 }
      // Center/North
    }
  };
  const getTotemMetadata = (id) => {
    const meta = totemMetadata[id];
    return {
      id,
      name: meta?.name || `Totem #${id}`,
      image: meta?.image || "",
      description: meta?.description || "Un nouveau mystère à résoudre.",
      coordinates: meta?.coordinates || { x: 0, y: 0 }
    };
  };
  return {
    totemMetadata,
    getTotemMetadata
  };
};

export { useTotems as u };
//# sourceMappingURL=useTotems-fFvG8yBz.mjs.map
