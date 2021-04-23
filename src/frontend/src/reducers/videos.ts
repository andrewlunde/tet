import { RESET, RESTORE } from 'app/App.actions'
import { GET_VIDEOS_COMMIT } from 'pages/Home/Home.actions'
import { Video } from 'shared/video/Video'

export type VideosState = Video[]

const videosDefaultState: VideosState = []

export function videos(state = videosDefaultState, action: any): VideosState {
  switch (action.type) {
    case RESET: {
      return videosDefaultState
    }
    case RESTORE: {
      return state
    }
    case GET_VIDEOS_COMMIT: {
      return action.payload.videos
    }
    default:
      return state
  }
}
