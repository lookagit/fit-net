export default function reducer(state, action) {
  if (action.type === 'COACHES_FILTRATION') {
    return state.merge({
      skillArr: action.skillArr,
      countyId: action.countyId,
      certified: action.certified,
      groupTraining: action.groupTraining,
      priceFrom: action.priceFrom,
      priceTo: action.priceTo,
    });
  }
  return state;
}
