import { useSyncExternalStore } from 'react'

const KEY = 'tfm-progress'
let state: Record<string, number> = {}
try {
  state = JSON.parse(localStorage.getItem(KEY) || '{}')
} catch {
  state = {}
}
const listeners = new Set<() => void>()

function emit() {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    /* storage unavailable */
  }
  listeners.forEach((l) => l())
}

export function setRead(path: string, read: boolean) {
  state = { ...state }
  if (read) state[path] = Date.now()
  else delete state[path]
  emit()
}

export function resetProgress() {
  state = {}
  emit()
}

export function useProgress() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => state,
  )
}
