# ASYNC PATTERN in JS with setTimeout, window.postMessage and Generator functions
Converting a blocking code into a non blocking. This is done by using setTimeout, window.postMessage, generator function introduced in ES5.

# Problem: Find the value of Pi upto 10000000000 iteration

# Solution 0: Blocking code, completely freezes the UI thread of execution



```
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

```

# Solution 1: Using setTimeout

we use a state object to record the iteration and value for an interval of every 1000, and update the UI.

```
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

```

# Solution 2: Using window.postMessage

Similarly to the setTimeout, we keep the iteration count and pi value inside a state object. Implementation wise postMessage and setTimeout are similar but postMessage is faster
as it fires up immediately, compared to setTimeout whcih take 3-4 miliseconds depending upon the browser.


```
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

```
# Solution 3: Using yield and Generator* functions

With the use of Generator function we do not need to keep track of the state object, as the JS engine does this for us.

```
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
      return pi; //this is returned when the loop exits
    }
    setTimeout(resume, 0);
  });

```
