import { State } from 'reducers'

export const GET_VIDEOS_REQUEST = 'GET_VIDEOS_REQUEST'
export const GET_VIDEOS_COMMIT = 'GET_VIDEOS_COMMIT'
export const GET_VIDEOS_ROLLBACK = 'GET_VIDEOS_ROLLBACK'

export const getVideos = () => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: GET_VIDEOS_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `${process.env.REACT_APP_BACKEND_URL}/video/get-videos`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: {},
        },
        commit: { type: GET_VIDEOS_COMMIT },
        rollback: { type: GET_VIDEOS_ROLLBACK },
      },
    },
  })
}
