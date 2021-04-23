import { State } from 'reducers'

export const GET_BALANCE_REQUEST = 'GET_BALANCE_REQUEST'
export const GET_BALANCE_COMMIT = 'GET_BALANCE_COMMIT'
export const GET_BALANCE_ROLLBACK = 'GET_BALANCE_ROLLBACK'

export const getBalance = () => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: GET_BALANCE_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/user/get-balance`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: {},
        },
        commit: {
          type: GET_BALANCE_COMMIT,
        },
        rollback: { type: GET_BALANCE_ROLLBACK },
      },
    },
  })
}
