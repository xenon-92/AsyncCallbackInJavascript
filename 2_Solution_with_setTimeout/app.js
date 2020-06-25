/** @format */

var attachPi = document.querySelector('.attachPi');
var attachCounter = document.querySelector('.attachCounter');

var attachPinonblck = document.querySelector('.attachPi-nonblck');
var attachCounternonblck = document.querySelector('.attachCounter-nonblck');

//#region   alert
var alertbtn = document.querySelector('.alert');
alertbtn.addEventListener('click', function () {
  alert('Just here to alert....');
});
//#endregion

//#region freezes the UI
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
//#endregion

//#region Does not freezes the Ui
var stateObj = Object.create(null);
stateObj.k = 0;
stateObj.pi = 0;

var nonBlockingElemPi = document.createElement('p');
var nonBlockingElemCounter = document.createElement('p');
attachPinonblck.appendChild(nonBlockingElemPi);
attachCounternonblck.appendChild(nonBlockingElemCounter);
document
  .querySelector('.non-blocking-code')
  .addEventListener('click', function computePiAsync() {
    if (stateObj.k > 10000000) {
      return;
    }
    for (var i = 0; i <= 1000; i++) {
      stateObj.k++;
      stateObj.pi += (4 * Math.pow(-1, stateObj.k + 1)) / (2 * stateObj.k - 1);
    }
    nonBlockingElemPi.innerHTML = stateObj.pi;
    nonBlockingElemCounter.innerHTML = stateObj.k;
    setTimeout(computePiAsync,0);
  });
//#endregion
