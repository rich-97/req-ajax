const ajax = require('../');

ajax.get('/foo')
  .then(function (res) {
    // Do stuff with the response.
  }).catch(function (err) {
    // Throw the error.
  });
