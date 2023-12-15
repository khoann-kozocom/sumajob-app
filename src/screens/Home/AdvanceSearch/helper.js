export const setSelectedListFunc = ({ id, name }, state, setState) => {
  const exist = state.find((selectedItem) => selectedItem.id === id);
  if (exist) {
    setState((prev) => prev.filter((selectedItem) => selectedItem.id !== id));
  } else {
    setState((prev) => [...prev, { id, name }]);
  }
};
