const getInfo = (error, message) => ({
  error,
  message: () => console.error(`MoonModal: ${message}`)
})

const validateOptions = (options) => {
  const {
    modal,
    overlay
  } = options

  if (!modal.active && !modal.associated) {
    return getInfo(true, 'Не указан modal: { active || associated }')
  }

  if (overlay?.el === undefined) {
    return getInfo(true, 'Не указан overlay: { selector }')
  }

  if (overlay?.active === undefined) {
    return getInfo(true, 'Не указан overlay: { active }')
  }

  return getInfo(false, '')
}

export {
  validateOptions
}
