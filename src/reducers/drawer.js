export default function reducer(state, action) {
  if (action.type === 'DRAWER_OPEN') {
    return state.merge({
      drawerOpen: true,
    });
  }
  if (action.type === 'DRAWER_CLOSE') {
    return state.merge({
      drawerOpen: false,
    });
  }
  if (action.type === 'DRAWER_TOGGLE') {
    return state.merge({
      drawerOpen: !state.drawerOpen,
    });
  }
  return state;
}
