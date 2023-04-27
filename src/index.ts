import { hideScrollbar, showScrollBar } from './utils/scroll-bar-toggle'
import { addClass, removeClass } from './helpers/class-list'
import { dispatchEvent } from './utils/dispatch'
import { getActiveClass } from './helpers/get-active-class'
import { getEl } from './helpers/get-el'
import { fillOptions } from './options/default'
import {
  Close,
  Info,
  methodOptions,
  modalOptions,
  modalType,
  Open,
  stateType
} from './types/types'

class MoonModal {
  #options: modalOptions
  #state: stateType

  constructor(options: modalOptions) {
    this.#options = fillOptions(options)

    this.#state = {
      overlay: getEl(options.overlay.el),
      active: undefined,
      prev: undefined,
      isAnimation: false
    }
  }

  open(el: modalType, options?: methodOptions): Open {
    const { hidingScrollbar = true } = options ?? {}

    if (this.#state.isAnimation) {
      // throw Error('Не прошло закрытие предыдущего модального окна!')
    }

    const domModal = getEl(el)

    this.#state.active ? this.#hotClose() : this.#coldOpen(hidingScrollbar)

    this.#animationOpen(domModal)
    this.#stateOpen(domModal)

    dispatchEvent(this.#options.dispatch.open.start, domModal)

    return {
      current: this.#state.active,
      prev: this.#state.prev
    }
  }

  close(): Close {
    if (!this.#state.active) {
      return
    }

    this.#animationClose()
    this.#stateClose()

    dispatchEvent(this.#options.dispatch.close.start, this.#state.prev)

    return {
      current: this.#state.prev
    }
  }

  set timeout(value: number) {
    this.#options.timeout = value
  }

  get info(): Info {
    return {
      overlay: this.#state.overlay,
      active: this.#state.active,
      prev: this.#state.prev,
      timeout: this.#options.timeout
    }
  }

  #getActiveClass(modal: HTMLElement) {
    const activeClass = getActiveClass(modal, this.#options.modal.associated)

    return activeClass ?? this.#options.modal.active
  }

  #animationOpen(modal: HTMLElement) {
    this.#setIsAnimation(true)
    addClass(modal, this.#getActiveClass(modal))

    this.#timeout(() => {
      dispatchEvent(this.#options.dispatch.open.transitionEnd, modal)
      this.#setIsAnimation(false)
    })
  }

  #hotClose() {
    const modal = this.#state.active

    removeClass(modal, this.#getActiveClass(modal))
    dispatchEvent(this.#options.dispatch.close.start, modal)

    this.#timeout(() => {
      dispatchEvent(this.#options.dispatch.close.transitionEnd, modal)
    })
  }

  #animationClose() {
    const modal = this.#state.active
    this.#setIsAnimation(true)

    removeClass(modal, this.#getActiveClass(modal))
    removeClass(this.#state.overlay, this.#options.overlay.active)

    this.#timeout(() => {
      showScrollBar(this.#options.cssVars.sizeScrollBar)
      dispatchEvent(this.#options.dispatch.close.transitionEnd, modal)

      this.#setIsAnimation(false)
    })
  }

  #timeout(cb: () => any) {
    setTimeout(cb, this.#options.timeout)
  }

  #setIsAnimation(value: boolean) {
    this.#state.isAnimation = value
  }

  #coldOpen(hidingScrollbar: boolean) {
    addClass(this.#state.overlay, this.#options.overlay.active)

    if (hidingScrollbar) {
      hideScrollbar(this.#options.cssVars.sizeScrollBar)
    }
  }

  #stateClose() {
    this.#state.prev = this.#state.active
    this.#state.active = undefined
  }

  #stateOpen(modal: HTMLElement) {
    this.#state.prev = this.#state.active
    this.#state.active = modal
  }
}

export { MoonModal }
