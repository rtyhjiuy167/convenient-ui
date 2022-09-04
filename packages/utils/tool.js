export function getScrollParent(element) {
  let _parent = element;
  while (_parent) {
    //  HTML HTMLDocument window
    if ([document.documentElement, document, window].includes(_parent)) {
      return window;
    }
    let styleOverflow = document.defaultView.getComputedStyle(_parent)['overflow'];
    if (/(scroll)|(auto)|(overlay)/.test(styleOverflow)) {
      return _parent;
    }
    _parent = _parent.parentNode;
  }
}

export function isInContainer(element, container) {
  if (!element || !container) return false;
  const { top, bottom, right, left } = element.getBoundingClientRect();
  let containerRect;
  if ([window, document, document.documentElement, null, undefined].includes(container)) {
    containerRect = {
      top: 0,
      right: window.innerWidth,
      bottom: window.innerHeight,
      left: 0
    };
  } else {
    containerRect = container.getBoundingClientRect();
  }
  return top < containerRect.bottom &&
    bottom > containerRect.top &&
    right > containerRect.left &&
    left < containerRect.right;
}