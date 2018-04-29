var fetch = require('isomorphic-fetch');
fetch('https://honesty-app.herokuapp.com/', {
      method: 'GET',
  })
setInterval(() => {
  fetch('https://honesty-app.herokuapp.com/', {
      method: 'GET',
  })
}, 1000 * 60 * 3)