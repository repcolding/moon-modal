import { hideScrollbar, showScrollBar } from './utils/scroll-bar-toggle'
import { addClass, removeClass } from './helpers/class-list'
import { dispatchEvent } from './utils/dispatch'
import { getActiveClass } from './helpers/get-active-class'
import { validateOptions } from './utils/validate-options'
import { getEl } from './helpers/get-el'
import { getOptions } from './options/default'

class MoonModal {
  #options
  #state

  constructor(options) {
    const { error, message } = validateOptions(options)

    if (error) {
      return message()
    }

    this.#options = getOptions(options)
    this.#state = {
      overlay: getEl(options.overlay.el),
      active: undefined,
      prev: undefined,
      isAnimation: false
    }
  }

  open (el, timeout, hidingScrollbar = true) {
    if (this.#state.isAnimation) return console.warn('Не прошло закрытие предыдущего модального окна!')

    const domModal = getEl(el)

    this.#state.active
      ? this.#hotClose()
      : this.#coldOpen(hidingScrollbar)

    this.#animationOpen(timeout, domModal)
    this.#stateOpen(domModal)

    dispatchEvent(this.#options.dispatch.open.start, domModal)

    return {
      current: this.#state.active,
      prev: this.#state.prev
    }
  }

  close (timeout) {
    if (!this.#state.active) return console.warn('Нет активного модального окна')

    this.#animationClose(timeout)
    this.#stateClose()

    dispatchEvent(this.#options.dispatch.close.start, this.#state.prev)

    return {
      current: this.#state.prev
    }
  }

  addModOverlay (className) {
    this.#state.overlay.classList.add(className)
  }

  removeModOverlay (className) {
    this.#state.overlay.classList.remove(className)
  }

  set timeout (value) {
    this.#options.timeout = value
  }

  get info () {
    return {
      overlay: this.#state.overlay,
      active: this.#state.active,
      prev: this.#state.prev,
      timeout: this.#options.timeout
    }
  }

  #getActiveClass (modal) {
    return getActiveClass(modal, this.#options.modal.associated) ?? this.#options.modal.active
  }

  #animationOpen (timeout, modal) {
    this.#setIsAnimation(true)
    addClass(modal, this.#getActiveClass(modal))

    this.#timeout(timeout, () => {
      dispatchEvent(this.#options.dispatch.open.transitionEnd, modal)
      this.#setIsAnimation(false)
    })
  }

  #hotClose () {
    const modal = this.#state.active
    removeClass(modal, this.#getActiveClass(modal))

    this.#timeout(() => {
      dispatchEvent(this.#options.dispatch.close.transitionEnd, modal)
    })
  }

  #animationClose (timeout) {
    const modal = this.#state.active
    this.#setIsAnimation(true)

    removeClass(modal, this.#getActiveClass(modal))
    removeClass(this.#state.overlay, this.#options.overlay.active)

    this.#timeout(timeout, () => {
      showScrollBar(this.#options.cssVars.sizeScrollBar)
      dispatchEvent(this.#options.dispatch.close.transitionEnd, modal)

      this.#setIsAnimation(false)
    })
  }

  #timeout (timeout, cb) {
    setTimeout(cb, timeout ?? this.#options.timeout)
  }

  #setIsAnimation (value) {
    this.#state.isAnimation = value
  }

  #coldOpen (hidingScrollbar) {
    addClass(this.#state.overlay, this.#options.overlay.active)

    if (hidingScrollbar) {
      hideScrollbar(this.#options.cssVars.sizeScrollBar)
    }
  }

  #stateClose () {
    this.#state.prev = this.#state.active
    this.#state.active = undefined
  }

  #stateOpen (modal) {
    this.#state.prev = this.#state.active
    this.#state.active = modal
  }
}

export {
  MoonModal
}
