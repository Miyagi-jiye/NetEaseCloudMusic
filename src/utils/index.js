// 函数节流
export function throttle(fn, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      timer = setTimeout(() => {
        fn.apply(this);
        timer = null;
      }, delay);
    }
  }
}

// 函数防抖
export function debounce(fn, delay, immediate) {
  let timer = null;
  return function () {
    if (timer) clearTimeout(timer);
    if (immediate == true) {
      fn.apply(this, arguments);
      immediate = false
    }
    timer = setTimeout(() => {
      fn.apply(this, arguments);
    }, delay);
  }
}