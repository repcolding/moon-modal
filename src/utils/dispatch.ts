const dispatchEvent = (eventName: string, currentModal: HTMLElement) => {
  currentModal.dispatchEvent(
    new CustomEvent(eventName, { bubbles: true, detail: { currentModal } })
  )
}

export { dispatchEvent }
