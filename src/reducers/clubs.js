export default function reducer(state, action) {
    if(action.type === 'CLUBS_FILTER') {
      return state.merge({
        skillId: action.skillId,
        countiesId: action.countiesId,
      });
    }
    return state;
  }
  