const ESCAPE = 27;
const RIGHT = 39;
const LEFT = 37;
const UP = 38;
const DOWN = 40;
const TARGET_CLASS = "target";

/*
 * swipe detection
 *
 * found at: https://stackoverflow.com/a/23230280
 */
document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;

function getTouches(evt) {
  return evt.touches || // browser API
    evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
}

function handleTouchMove(evt) {
  if (!xDown) {
    return;
  }

  const xUp = evt.touches[0].clientX;

  const xDiff = xDown - xUp;

  if (xDiff > 0) {
    clickNavigationButton(".next");
  } else {
    clickNavigationButton(".previous");
  }
  /* reset values */
  xDown = null;
  yDown = null;
}

/* image sharing */

const clickNavigationButton = (buttonClass) => {
  const id = window.history.state && window.history.state.id;
  if (id) {
    const selector = `#${id} ${buttonClass}`;
    const button = document.querySelector(selector);
    button && button.click();
  }
};

const handleKey = (keyCode, event, callback) => {
  if (event.keyCode === keyCode) {
    callback();
    event.preventDefault();
  }
};

window.onpopstate = function (event) {
  if (event.state && event.state.id) {
    const id = event.state.id;
    openPhoto(id, null);
  } else {
    closePhoto(null);
  }
};

document.addEventListener("keydown", (event) => {
  handleKey(ESCAPE, event, () => {
    clickNavigationButton(".close");
  });

  handleKey(RIGHT, event, () => {
    clickNavigationButton(".next");
  });

  handleKey(LEFT, event, () => {
    clickNavigationButton(".previous");
  });
});
