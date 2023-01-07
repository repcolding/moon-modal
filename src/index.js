import { hideScrollbar, showScrollBar } from './utils/scroll-bar-toggle'
import { addClass, removeClass } from './helpers/class-list'
import { dispatchEventClose, dispatchEventOpen } from './utils/dispatch'
import { getActiveClass } from './helpers/get-active-class'
import { validateOptions } from './utils/validate-options'
import { getEl } from './helpers/get-el'
import { containsAssociated } from './helpers/contains-associated'
import { containsActive } from './helpers/contains-active'

class MoonModal {
  #options
  #state

  #onClose = ({ target }) => {
    if (containsActive(target, this.#options.modal.active)) this.close()
    if (containsAssociated(target, this.#options.modal.associated)) this.close()
  }

  constructor(options) {
    const { error, message } = validateOptions(options)

    if (error) {
      return message()
    }

    this.#options = options
    this.#state = {
      overlay: getEl(options.overlay.el),
      active: undefined,
      prev: undefined,
      isAnimation: false
    }
  }

  open (el) {
    if (this.#state.isAnimation) return console.warn('Не прошло закрытие предыдущего модального окна!')

    this.#state.active
      ? this.#hotClose()
      : this.#coldOpen()

    this.#animationOpen(getEl(el))
    this.#stateOpen(getEl(el))

    return {
      current: this.#state.active,
      prev: this.#state.prev
    }
  }

  close () {
    if (!this.#state.active) return console.warn('Нет активного модального окна')

    this.#animationClose()
    this.#stateClose()

    return {
      current: this.#state.prev
    }
  }

  addModifierOverlay (className) {
    this.#state.overlay.classList.add(className)
  }

  removeModifierOverlay (className) {
    this.#state.overlay.classList.remove(className)
  }

  initOuterClose () {
    document.addEventListener('click', this.#onClose)
  }

  destroy () {
    document.removeEventListener('click', this.#onClose)
  }

  set timeout (value) {
    this.#options.timeout = value
  }

  get info () {
    return {
      active: this.#state.active,
      prev: this.#state.prev,
      timeout: this.#options.timeout
    }
  }

  #getActiveClass (modal) {
    return getActiveClass(modal, this.#options.modal.associated) ?? this.#options.modal.active
  }

  #animationOpen (modal) {
    this.#setIsAnimation(true)
    addClass(modal, this.#getActiveClass(modal))

    this.#timeout(() => {
      dispatchEventOpen(modal)
      this.#setIsAnimation(false)
    })
  }

  #hotClose () {
    const modal = this.#state.active
    removeClass(modal, this.#getActiveClass(modal))

    this.#timeout(() => {
      dispatchEventClose(modal)
    })
  }

  #animationClose () {
    const modal = this.#state.active
    this.#setIsAnimation(true)

    removeClass(modal, this.#getActiveClass(modal))
    removeClass(this.#state.overlay, this.#options.overlay.active)

    this.#timeout(() => {
      showScrollBar()
      dispatchEventClose(modal)

      this.#setIsAnimation(false)
    })
  }

  #timeout (cb) {
    setTimeout(cb, this.#options.timeout)
  }

  #setIsAnimation (value) {
    this.#state.isAnimation = value
  }

  #coldOpen () {
    addClass(this.#state.overlay, this.#options.overlay.active)
    hideScrollbar()
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
