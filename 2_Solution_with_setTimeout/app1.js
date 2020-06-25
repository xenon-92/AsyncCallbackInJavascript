/** @format */

var pis = document.createElement('p');
var counts = document.createElement('p');
document.body.appendChild(pis);
document.body.appendChild(counts);

document
  .querySelector('.non-blocking-code')
  .addEventListener('click', function customAsync() {
    var state = {};
    state.k = 0;
    state.pi = 0;
    function computePI() {
      if (state.k > 1000000) {
        return;
      }
      for (let i = 0; i <= 1000; i++) {
        state.k++;
        state.pi += (4 * Math.pow(-1, state.k + 1)) / (2 * state.k - 1);
      }
      pis.innerHTML = state.pi;
      counts.innerHTML = state.k;
      setTimeout(computePI, 0);
    }
    computePI();
  });
