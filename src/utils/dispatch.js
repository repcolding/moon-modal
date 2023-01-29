const dispatchEvent = (eventName, currentModal) => {
  currentModal.dispatchEvent(
    new CustomEvent(eventName, { bubbles: true, detail: { currentModal } })
  )
}

export {
  dispatchEvent
}
