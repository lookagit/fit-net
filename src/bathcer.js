var fetch = require('isomorphic-fetch');
fetch('https://fit-net.herokuapp.com/', {
      method: 'GET',
  })
setInterval(() => {
  fetch('https://fit-net.herokuapp.com/', {
      method: 'GET',
  })
}, 1000 * 60 * 3)