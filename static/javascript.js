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

// deno-lint-ignore no-unused-vars
const shareImage = (title, url) => {
  if (navigator.canShare) {
    const shareData = {
      title: title,
      url: url,
    };
    navigator.share(shareData);
  } else {
    navigator.clipboard.writeText(url);
    Toastify({
      text: "Copied to clipboard",
      duration: 3000,
      style: {
        background: "rgba(0, 0, 0, 0.7)",
      },
    }).showToast();
  }
};

const clickNavigationButton = (buttonClass) => {
  const id = window.history.state && window.history.state.id;
  if (id) {
    const selector = `#${id} ${buttonClass}`;
    const button = document.querySelector(selector);
    button && button.click();
  }
};

const openPhoto = (id, href) => {
  const photo = document.getElementById(id);
  const phototitle = photo.getAttribute("title");
  removeTargetClass();
  photo.classList.add(TARGET_CLASS);
  document.title = phototitle;
  if (href) {
    window.history.pushState({ id: id }, "", href);
  }
};

const closePhoto = (href) => {
  const title = document.querySelector("head title").getAttribute("data-title");
  removeTargetClass();
  document.title = title;
  if (href) {
    window.history.pushState({}, "", href);
  }
};

const removeTargetClass = () => {
  const targets = document.querySelectorAll(`.${TARGET_CLASS}`);
  targets.forEach((target) => {
    target.classList.remove(TARGET_CLASS);
  });
};

const handleClick = (selector, event, callback) => {
  if (event.target.matches(selector)) {
    callback();
    event.preventDefault();
  }
};

const handleKey = (keyCode, event, callback) => {
  if (event.keyCode === keyCode) {
    callback();
    event.preventDefault();
  }
};

// const reverseSorting = () => {
//   {% if site.env.ALLOW_ORDER_SORT_CHANGE == "1" %}
//   var parent = document.getElementById('target');
//   for (var i = 1; i < parent.childNodes.length; i++){
//       parent.insertBefore(parent.childNodes[i], parent.firstChild);
//   }
//   {% endif %}
// }

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

  handleKey(UP, event, () => {
    reverseSorting();
  });

  handleKey(DOWN, event, () => {
    reverseSorting();
  });
});

document.addEventListener("click", (event) => {
  handleClick("[data-target][href]", event, () => {
    const id = event.target.getAttribute("data-target");
    const href = event.target.getAttribute("href");
    openPhoto(id, href);
  });

  handleClick("[href].close", event, () => {
    const href = event.target.getAttribute("href");
    closePhoto(href);
  });

  handleClick("ul.links li.sort a", event, () => {
    reverseSorting();
  });
});
