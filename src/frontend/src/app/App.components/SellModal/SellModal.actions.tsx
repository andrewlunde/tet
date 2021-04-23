import { ObjectId } from 'mongodb'
import { State } from 'reducers'
import { NewKeyInputs } from 'shared/key/NewKey'

import { showToaster } from '../Toaster/Toaster.actions'
import { SUCCESS } from '../Toaster/Toaster.constants'
import { getVideos } from 'pages/Home/Home.actions'

export const SHOW_SELL_MODAL = 'SHOW_SELL_MODAL'
export const HIDE_SELL_MODAL = 'HIDE_SELL_MODAL'

export const showSellModal = (videoId: ObjectId) => (dispatch: any) => {
  dispatch({
    type: SHOW_SELL_MODAL,
    payload: { videoId },
  })
}

export const hideSellModal = () => (dispatch: any) => {
  dispatch({
    type: HIDE_SELL_MODAL,
  })
}

export const NEW_KEY_REQUEST = 'NEW_KEY_REQUEST'
export const NEW_KEY_COMMIT = 'NEW_KEY_COMMIT'
export const NEW_KEY_ROLLBACK = 'NEW_KEY_ROLLBACK'

export const newKey = ({ videoId, price, key }: NewKeyInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: NEW_KEY_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/key/new-key`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { videoId, price, key },
        },
        commit: {
          type: NEW_KEY_COMMIT,
          meta: {
            thunks: [showToaster(SUCCESS, 'Key added!', 'Now on the marketplace'), hideSellModal(), getVideos()],
          },
        },
        rollback: { type: NEW_KEY_ROLLBACK },
      },
    },
  })
}
