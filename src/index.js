import { hideScrollbar, showScrollBar } from './utils/scroll-bar-toggle'
import { config } from './options/config'
import { addClass, removeClass } from './helpers/class-list'
import { dispatchEventClose, dispatchEventOpen } from './utils/dispatch'
import { getActiveClass } from './helpers/get-active-class'
import { validateOptions } from './utils/validate-options'
import { getEl } from './helpers/get-el'
import { containsAssociated } from './helpers/contains-associated'
import { containsActive } from './helpers/contains-active'

class MoonModal {
  info
  #options
  #state

  constructor(props) {
    const { error, message } = validateOptions(props)

    if (error) {
      return message()
    }

    this.#options = { ...config, ...props }
    this.#state = {
      overlay: getEl(props.overlay.el),
      activeModal: undefined,
      prevModal: undefined,
      isAnimation: false
    }

    this.info = {
      current: undefined,
      prev: undefined
    }
  }

  open (el) {
    if (this.#state.isAnimation) return console.warn('Не прошло закрытие предыдущего модального окна!')

    this.#state.activeModal
      ? this.#hotClose()
      : this.#coldOpen()

    this.#animationOpen(getEl(el))
    this.#stateOpen(getEl(el))

    return {
      prev: this.#state.prevModal,
      current: this.#state.activeModal
    }
  }

  close () {
    if (!this.#state.activeModal) return console.warn('Нет активного модального окна')

    this.#animationClose()
    this.#stateClose()

    return {
      current: this.#state.prevModal
    }
  }

  addModifierOverlay (className) {
    this.#options.overlay.el.classList.add(className)
  }

  removeModifierOverlay (className) {
    this.#options.overlay.el.classList.remove(className)
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

  #onClose ({ target }) {
    if (containsActive(target, this.#options.modal.active)) this.close()
    if (containsAssociated(target, this.#options.modal.associated)) this.close()
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
    const modal = this.#state.activeModal
    removeClass(modal, this.#getActiveClass(modal))

    this.#timeout(() => {
      dispatchEventClose(modal)
    })
  }

  #animationClose () {
    const modal = this.#state.activeModal
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
    this.#state.prevModal = this.#state.activeModal
    this.#state.activeModal = undefined

    this.info.current = this.#state.activeModal
    this.info.prev = this.#state.prevModal
  }

  #stateOpen (modal) {
    this.#state.prevModal = this.#state.activeModal
    this.#state.activeModal = modal

    this.info.current = this.#state.activeModal
    this.info.prev = this.#state.prevModal
  }
}

export {
  MoonModal
}
