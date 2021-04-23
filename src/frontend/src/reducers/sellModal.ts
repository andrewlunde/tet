import { RESET, RESTORE } from 'app/App.actions'
import { HIDE_SELL_MODAL, SHOW_SELL_MODAL } from 'app/App.components/SellModal/SellModal.actions'
import { ObjectId } from 'mongodb'

export interface SellModalState {
  showing: boolean
  videoId?: ObjectId
}

const sellModalDefaultState: SellModalState = {
  showing: false,
  videoId: undefined
}

export function sellModal(state = sellModalDefaultState, action: any): SellModalState {
  switch (action.type) {
    case RESET: {
      return sellModalDefaultState
    }
    case RESTORE: {
      return sellModalDefaultState
    }
    case SHOW_SELL_MODAL: {
      return {
        ...state,
        videoId: action.payload.videoId,
        showing: true
      }
    }
    case HIDE_SELL_MODAL: {
      return sellModalDefaultState
    }
    default:
      return state
  }
}
