/** @format */

//#region alert
document.querySelector('.alert').addEventListener('click', function () {
  alert('just to alert....');
});
//#endregion

//#region Blocking code
document.querySelector('.blocking').addEventListener('click', function () {
  var counter = document.querySelector('.block-counter');
  var pi = document.querySelector('.block-piValue');
  var state = {};
  state.pi = 0;
  state.k = 0;
  for (var i = 0; i < 10000000000; i++) {
    state.k++;
    state.pi += (4 * Math.pow(-1, state.k + 1)) / (2 * state.k - 1);
  }
  counter.innerHTML = state.k;
  pi.innerHTML = state.pi;
});
//#endregion

//#region non blocking setTimeout
document
  .querySelector('.non-blocking-timeout')
  .addEventListener('click', function () {
    var counter = document.querySelector('.nonblock-counter-timeout');
    var pi = document.querySelector('.nonblock-piValue-timeout');
    var state = {};
    state.k = 0;
    state.pi = 0;
    function calculatePi() {
      if (state.k > 10000000) {
        return;
      }
      for (var i = 0; i < 1000; i++) {
        state.k++;
        state.pi += (4 * Math.pow(-1, state.k + 1)) / (2 * state.k - 1);
      }
      counter.innerHTML = state.k;
      pi.innerHTML = state.pi;
      setTimeout(calculatePi, 0);
    }
    setTimeout(calculatePi, 0);
  });
//#endregion

//#region non blocking postMessage
document
  .querySelector('.non-blocking-postmessage')
  .addEventListener('click', function () {
    var counter = document.querySelector('.nonblock-counter-postmessage');
    var pi = document.querySelector('.nonblock-piValue-postmessage');
    var state = {};
    state.k = 0;
    state.pi = 0;
    function calculatePIasync() {
      if (state.k > 10000000) {
        return;
      }
      for (var i = 0; i < 1000; i++) {
        state.k++;
        state.pi += (4 * Math.pow(-1, state.k + 1)) / (2 * state.k - 1);
      }
      counter.innerHTML = state.k;
      pi.innerHTML = state.pi;
      window.postMessage('msg', '*');
    }
    window.addEventListener('message', function (event) {
      console.log(event);
      calculatePIasync();
    });
    calculatePIasync();
  });
//#endregion

//#region Generator function
document
  .querySelector('.non-blocking-generator')
  .addEventListener('click', function () {
    var counter = document.querySelector('.nonblock-counter-postmessage');
    var pi = document.querySelector('.nonblock-piValue-generator');
    var genObject = AsyncPi();
    var pivalue = 0;
    function resume() {
      pivalue = genObject.next();
      pi.innerHTML = pivalue.value;
      if (!pivalue.done) {
        setTimeout(resume, 0);
      }
    }
    function* AsyncPi() {
      var pi = 0;
      for (var k = 1; k < 10000000; k++) {
        pi += (4 * Math.pow(-1, k + 1)) / (2 * k - 1);
        if (Math.trunc(k / 1000) * 1000 === k) {
          yield pi; // this is returned whith in the loop
        }
      }
      return pi; //this is returned when the loop is exits
    }
    setTimeout(resume, 0);
  });


//#endregion
