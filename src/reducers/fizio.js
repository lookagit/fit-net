export default function reducer(state, action) {
  if (action.type === 'FIZIO_FILTRATION') {
    return state.merge({
      skillArr: action.skillArr,
      countiesId: action.countiesId,
      certified: action.certified,
      comesHome: action.comesHome,
      priceFrom: action.priceFrom,
      priceTo: action.priceTo,
    });
  }
  return state;
}