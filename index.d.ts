interface options {
  modal: {
    active: string,
    associated?: object
  },
  overlay: {
    el: string | HTMLElement,
    active: string
  },
  timeout: number
}

declare class MoonModal {
  constructor (options: options)

  open (el: string | HTMLElement): {
    prev: undefined | HTMLElement,
    current: HTMLElement
  }

  close (): {
    current: HTMLElement
  }

  addModifierOverlay (className: string)

  removeModifierOverlay (className: string)

  initOuterClose ()

  destroy ()

  set timeout (value: number)

  get info (): {
    active: HTMLElement,
    prev: undefined | HTMLElement,
    timeout: number
  }
}

export {
  MoonModal
}
