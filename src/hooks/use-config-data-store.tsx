import { create } from 'zustand'

import { ConfigDataType } from '../lib/conversions/generate-config'

type State = {
  configData: ConfigDataType | undefined
}
// This data is saved to database for actual cover image of the board.

type Actions = {
  setConfigData: (data: ConfigDataType) => void
}
export const initialConfigDataState: State = {
  configData: undefined,
}
type StateActions = {
  state: State
  actions: Actions
}
export const useConfigDataStore = create<StateActions>((set) => ({
  state: initialConfigDataState,
  actions: {
    setConfigData: (newState) =>
      set(() => ({
        state: {
          configData: newState,
        },
      })),
  },
}))
