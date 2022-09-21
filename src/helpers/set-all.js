export const setAll = (state, properties) => {
  const props = Object.keys(properties);
  props.forEach((key) => {
    state[key] = properties[key];
  });
};
