const dispatchEventClose = currentModal => {
  currentModal.dispatchEvent(
    new CustomEvent('moon-modal:close', { bubbles: true, detail: { currentModal }
    })
  )
}

const dispatchEventOpen = currentModal => {
  currentModal.dispatchEvent(
    new CustomEvent('moon-modal:open', { bubbles: true, detail: { currentModal } })
  )
}

export {
  dispatchEventOpen,
  dispatchEventClose
}
