export function getLocalStorage(key, defaultValue) {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : defaultValue
    }
  } catch {
    return null
  }
}

export function setLocalStorage(key, value) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
    return null
  } catch {
    return null
  }
}

export function removeLocalStorage(key) {
  try {
    window.localStorage.removeItem(key)
    return null
  } catch {
    return null
  }
}

export function updateLocalStorage(updatedData, name) {
  const item = {
    ...getLocalStorage(`${name}`),
    ...updatedData,
  }
  setLocalStorage(`${name}`, item)
}

export function getSessionStorage(key, defaultValue) {
  try {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(key)
      return saved !== null ? JSON.parse(saved) : defaultValue
    }
  } catch {
    return null
  }
}

export function setSessionStorage(key, value) {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
    return null
  } catch {
    return null
  }
}

export function generateRandomString(length) {
  let text = ''
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return text
}