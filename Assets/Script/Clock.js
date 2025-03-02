let seconds = 0;
Clock();

function Clock() {
  seconds++;

  if (seconds == 3) {
    ThreeSeconds();
    seconds = 0;
  }
  //   else if (seconds == 5) {
  //     FiveSeconds();
  //     seconds = 0;
  //   }

  setTimeout(function () {
    Clock();
  }, 1000);
}
