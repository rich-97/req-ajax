window.onload = function () {
  const $btnGet = document.querySelector('button[name=get]');
  const $btnDel = document.querySelector('button[name=delete]');
  const $btnGetJSON = document.querySelector('button[name=getJSON]');
  const $getData = document.querySelector('.get-data');
  const $postForm = document.querySelector('#post-form');
  const $getJSON = document.querySelector('.get-json');
  const $jsonForm = document.querySelector('#post-json-form');

  $btnGet.onclick = function () {
    ajax.get('/data')
      .then(function (res) { $getData.textContent = res; })
      .catch(function (err) { console.log(err); });
  };

  $postForm.onsubmit = function (e) {
    const value = this.children[0].value;

    e.preventDefault();

    ajax.post('/post', value)
      .then(function () { console.log('Post sucess!.'); })
      .catch(function (err) { console.log(err); });
  };

  $btnDel.onclick = function () {
    const index = this.previousElementSibling.value;

    ajax.query({
      url: '/delete',
      method: 'delete',
      params: {
        index
      }
    })
      .then(function () { console.log('Delete sucess!'); })
      .catch(function (err) { console.log(err); });
  };

  $btnGetJSON.onclick = function () {
    ajax.get('/test.json', true)
      .then(function (res) { $getJSON.textContent = JSON.stringify(res); })
      .catch(function (err) { console.log(err); });
  };

  $jsonForm.onsubmit = function (e) {
    e.preventDefault();

    const key = this.children[0].value;
    const value = this.children[1].value;
    const json = {};

    json[key] = value;

    ajax.post('/json', json, true)
      .then(function () { console.log('Send json sucessfully!.'); })
      .catch(function (err) { console.log(err); });
  };
};
