import { ObjectId } from 'mongodb'
import { State } from 'reducers'
import { BuyKeyInputs } from 'shared/key/BuyKey'
import { GetSellersInputs } from 'shared/key/GetSellers'
import { getBalance } from '../Header/Header.actions'

export const SHOW_SELLERS = 'SHOW_SELLERS'
export const HIDE_SELLERS = 'HIDE_SELLERS'

export const showSellers = (videoId: ObjectId) => (dispatch: any) => {
  dispatch({
    type: SHOW_SELLERS,
    payload: { videoId },
  })
}

export const hideSellers = () => (dispatch: any) => {
  dispatch({
    type: HIDE_SELLERS,
  })
}

export const GET_SELLERS_REQUEST = 'GET_SELLERS_REQUEST'
export const GET_SELLERS_COMMIT = 'GET_SELLERS_COMMIT'
export const GET_SELLERS_ROLLBACK = 'GET_SELLERS_ROLLBACK'

export const getSellers = ({ videoId }: GetSellersInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: GET_SELLERS_REQUEST,
    payload: { videoId },
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/key/get-sellers`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { videoId },
        },
        commit: { type: GET_SELLERS_COMMIT, meta: { videoId } },
        rollback: { type: GET_SELLERS_ROLLBACK },
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
