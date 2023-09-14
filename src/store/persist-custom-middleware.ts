import { State, StateCreator, StoreMutatorIdentifier } from 'zustand'

type Persist = <
  T extends State,
  Mps extends [StoreMutatorIdentifier, unknown][] = [],
  Mcs extends [StoreMutatorIdentifier, unknown][] = []
>(
  f: StateCreator<T, Mps, Mcs>,
  saveState: (state: T) => void
) => StateCreator<T, Mps, Mcs>

type PersistImpl = <T extends State>(
  f: StateCreator<T, [], []>,
  saveState: (state: T) => void
) => StateCreator<T, [], []>

const persistImpl: PersistImpl = (f, saveState) => (set, get, store) => {
  type T = ReturnType<typeof f>
  const saveSet: typeof set = (...a) => {
    set(...a)
    saveState(get())
  }
  store.setState = saveSet

  return f(saveSet, get, store)
}

export const persistState = persistImpl as unknown as Persist
