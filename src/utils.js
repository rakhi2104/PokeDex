const filterData = (pokemonData) => {
  const { types, abilities, held_items } = pokemonData;
  return {
    types,
    abilities,
    heldItems: held_items,
  };
};

const getTitle = (key, data) => {
  return data[key]?.name || "Pokemon";
};

export { filterData, getTitle };
