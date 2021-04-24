import { ObjectId } from 'mongodb'
import { State } from 'reducers'
import { BuyKeyInputs } from 'shared/key/BuyKey'
import { ChargeInputs } from 'shared/video/Charge'
import { Video } from 'shared/video/Video'
import { getBalance } from '../Header/Header.actions'

export const SHOW_VIDEO = 'SHOW_VIDEO'
export const HIDE_VIDEO = 'HIDE_VIDEO'

export const showVideo = (video: Video) => (dispatch: any) => {
  dispatch({
    type: SHOW_VIDEO,
    payload: { video },
  })
}

export const hideVideo = () => (dispatch: any) => {
  dispatch({
    type: HIDE_VIDEO,
  })
}

export const CHARGE_REQUEST = 'CHARGE_REQUEST'
export const CHARGE_COMMIT = 'CHARGE_COMMIT'
export const CHARGE_ROLLBACK = 'CHARGE_ROLLBACK'

export const charge = ({ videoId }: ChargeInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: CHARGE_REQUEST,
    payload: { videoId },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/video/charge`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { videoId },
        },
        commit: { type: CHARGE_COMMIT, meta: { videoId } },
        rollback: { type: CHARGE_ROLLBACK },
      },
    },
  })
}

export const BUY_KEY_REQUEST = 'BUY_KEY_REQUEST'
export const BUY_KEY_COMMIT = 'BUY_KEY_COMMIT'
export const BUY_KEY_ROLLBACK = 'BUY_KEY_ROLLBACK'

export const buyKey = ({ keyId }: BuyKeyInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: BUY_KEY_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/key/buy-key`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { keyId },
        },
        commit: { type: BUY_KEY_COMMIT, meta: { thunks: [getBalance()] } },
        rollback: { type: BUY_KEY_ROLLBACK },
      },
    },
  })
}
