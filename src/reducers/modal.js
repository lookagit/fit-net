export default function reducer(state, action) {
  if (action.type === 'MODAL_VISIBLE') {
    return state.merge({
      isVisible: action.isVisible,
      modalClass: action.modalClass,
    });
  }
  return state;
}
