const containsAssociated = (target, associated) => {
  const listActive = Object.keys(associated ?? {})

  for (const active of listActive) {
    if (target.classList.contains(active)) return true
  }

  return false
}

export {
  containsAssociated
}
