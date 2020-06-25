/** @format */

var attachPi = document.querySelector('.attachPi');
var attachCounter = document.querySelector('.attachCounter');

var alertbtn = document.querySelector('.alert');
alertbtn.addEventListener('click', function () {
  alert('Just here to alert....');
});

var freeze = document.querySelector('.blocking-code');
freeze.addEventListener('click', function (event) {
  var pi = 0;
  var k = 0;
  var newElemPi = document.createElement('p');
  attachPi.appendChild(newElemPi);
  var newElemCounter = document.createElement('p');
  attachCounter.appendChild(newElemCounter);
  for (k = 1; k <= 1000000; k++) {
    pi += (4 * Math.pow(-1, k + 1)) / (2 * k - 1);
    newElemPi.innerHTML = pi;
    newElemCounter.innerHTML = k;
  }
});
