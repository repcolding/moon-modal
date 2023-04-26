export interface modalOptions {
  modal: {
    active: string
    associated?: object
  }
  overlay: {
    el: string | HTMLElement
    active: string
  }
  dispatch?: {
    open?: {
      start?: string
      transitionEnd?: string
    }
    close?: {
      start?: string
      transitionEnd?: string
    }
  }
  cssVars?: {
    sizeScrollBar?: string
  }
  timeout: number
}

export interface methodOptions {
  hidingScrollbar?: boolean
}

export interface stateType {
  overlay: HTMLElement
  active: HTMLElement | undefined
  prev: HTMLElement | undefined
  isAnimation: boolean
}

export type modalType = HTMLElement | string

export interface Open {
  current: HTMLElement
  prev: HTMLElement
}

export interface Close {
  current: HTMLElement
}

export interface Info {
  overlay: HTMLElement
  active: HTMLElement
  prev: HTMLElement
  timeout: number
}
