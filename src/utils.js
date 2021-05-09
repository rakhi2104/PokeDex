const filterData = (pokemonData) => {
  const { types, abilities, held_items } = pokemonData;
  return {
    types,
    abilities,
    heldItems: held_items,
  };
};

const getTitle = (key, data, filters) => {
  const { offset } = filters;
  const index = key % (offset > 0 ? offset : 1);
  return data[index - 1]?.name || "Pokemon";
};

export { filterData, getTitle };
