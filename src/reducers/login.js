export default function reducer(state, action) {
  if (action.type === 'FACEBOOK_LOGIN') {
    return state.merge({
      accessToken: action.accessToken,
    });
  }
  return state;
}
