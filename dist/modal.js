// src/helpers/get-width-scrollbar.js
var getWidthScrollBar = () => {
  const div = document.createElement("div");
  div.style.overflow = "scroll";
  div.style.width = "50px";
  div.style.height = "50px";
  div.style.position = "absolute";
  div.style.pointerEvents = "none";
  document.body.append(div);
  const scrollWidth = div.offsetWidth - div.clientWidth;
  div.remove();
  return scrollWidth;
};

// src/utils/scroll-bar-toggle.js
var widthScrollBar = getWidthScrollBar();
var showScrollBar = () => {
  document.body.style.overflow = "";
  document.body.style.paddingRight = "";
  document.documentElement.style.removeProperty("--scrollbar");
};
var hideScrollbar = () => {
  document.body.style.overflow = "hidden";
  document.body.style.paddingRight = `${widthScrollBar}px`;
  document.documentElement.style.setProperty("--scrollbar", `${widthScrollBar}px`);
};

// src/options/config.js
var config = {
  timeout: 0
};

// src/helpers/class-list.js
var removeClass = (el, className) => el.classList.remove(className);
var addClass = (el, className) => el.classList.add(className);

// src/utils/dispatch.js
var dispatchEventClose = (currentModal) => {
  currentModal.dispatchEvent(
    new CustomEvent("moon-modal:close", {
      bubbles: true,
      detail: { currentModal }
    })
  );
};
var dispatchEventOpen = (currentModal) => {
  currentModal.dispatchEvent(
    new CustomEvent("moon-modal:open", { bubbles: true, detail: { currentModal } })
  );
};

// src/helpers/get-active-class.js
var getListClass = (modal) => modal.classList.value.split(" ");
var isIncludes = (classList, key) => {
  for (const item of classList) {
    if (item === key)
      return true;
  }
  return false;
};
var getActiveClass = (modal, associated) => {
  const classList = getListClass(modal);
  for (const key in associated) {
    if (isIncludes(classList, key))
      return associated[key];
  }
  return void 0;
};

// src/utils/validate-options.js
var getInfo = (error, message) => ({
  error,
  message: () => console.error(`MoonModal: ${message}`)
});
var validateOptions = (options) => {
  const {
    modal,
    overlay
  } = options;
  if (!modal.active && !modal.associated) {
    return getInfo(true, "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D modal: { active || associated }");
  }
  if (overlay?.selector === void 0) {
    return getInfo(true, "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D overlay: { selector }");
  }
  if (overlay?.active === void 0) {
    return getInfo(true, "\u041D\u0435 \u0443\u043A\u0430\u0437\u0430\u043D overlay: { active }");
  }
  return getInfo(false, "");
};

// src/utils/is-element.js
var isElement = (value) => {
  return value instanceof HTMLElement;
};

// src/helpers/get-dom.js
var getDom = (selector) => document.querySelector(selector);

// src/helpers/get-el.js
var getEl = (value) => {
  return isElement(value) ? value : getDom(value);
};

// src/index.js
var MoonModal = class {
  info;
  #options;
  #state;
  constructor(props) {
    const { error, message } = validateOptions(props);
    if (error) {
      return message();
    }
    this.#options = { ...config, ...props };
    this.#state = {
      overlay: getEl(props.overlay.el),
      activeModal: void 0,
      prevModal: void 0,
      isAnimation: false
    };
    this.info = {
      activeModal: void 0,
      prevModal: void 0
    };
  }
  open(el) {
    if (this.#state.isAnimation)
      return console.warn("\u041D\u0435 \u043F\u0440\u043E\u0448\u043B\u043E \u0437\u0430\u043A\u0440\u044B\u0442\u0438\u0435 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430!");
    this.#state.activeModal ? this.#hotClose() : this.#coldOpen();
    this.#animationOpen(getEl(el));
    this.#stateOpen(getEl(el));
    return {
      prev: this.#state.prevModal,
      current: this.#state.activeModal
    };
  }
  close() {
    if (!this.#state.activeModal)
      return console.warn("\u041D\u0435\u0442 \u0430\u043A\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u043C\u043E\u0434\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430");
    this.#animationClose();
    this.#stateClose();
    return {
      current: this.#state.prevModal
    };
  }
  addModifierOverlay(className) {
    this.#options.overlay.classList.add(className);
  }
  removeModifierOverlay(className) {
    this.#options.overlay.classList.remove(className);
  }
  set timeout(value) {
    this.#options.timeout = value;
  }
  #initEvent() {
    document.addEventListener("click", ({ target }) => {
      if (target === this.#state.overlay)
        this.close();
      if (target.classList.contains(this.#options.modal.active))
        this.close();
    });
  }
  #getActiveClass(modal) {
    return getActiveClass(modal, this.#options.modal.associated) ?? this.#options.modal.active;
  }
  #animationOpen(modal) {
    this.#setIsAnimation(true);
    addClass(modal, this.#getActiveClass(modal));
    this.#timeout(() => {
      dispatchEventOpen(modal);
      this.#setIsAnimation(false);
    });
  }
  #hotClose() {
    const modal = this.#state.activeModal;
    removeClass(modal, this.#getActiveClass(modal));
    this.#timeout(() => {
      dispatchEventClose(modal);
    });
  }
  #animationClose() {
    const modal = this.#state.activeModal;
    this.#setIsAnimation(true);
    removeClass(modal, this.#getActiveClass(modal));
    removeClass(this.#state.overlay, this.#options.overlay.active);
    this.#timeout(() => {
      showScrollBar();
      dispatchEventClose(modal);
      this.#setIsAnimation(false);
    });
  }
  #timeout(cb) {
    setTimeout(cb, this.#options.timeout);
  }
  #setIsAnimation(value) {
    this.#state.isAnimation = value;
  }
  #coldOpen() {
    addClass(this.#state.overlay, this.#options.overlay.active);
    hideScrollbar();
  }
  #stateClose() {
    this.#state.prevModal = this.#state.activeModal;
    this.#state.activeModal = void 0;
    this.info.activeModal = this.#state.activeModal;
    this.info.prevModal = this.#state.prevModal;
  }
  #stateOpen(modal) {
    this.#state.prevModal = this.#state.activeModal;
    this.#state.activeModal = modal;
    this.info.activeModal = this.#state.activeModal;
    this.info.prevModal = this.#state.prevModal;
  }
};
export {
  MoonModal
};
