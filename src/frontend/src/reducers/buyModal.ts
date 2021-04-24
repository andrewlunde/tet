import { RESET, RESTORE } from 'app/App.actions'
import { BUY_KEY_COMMIT, CHARGE_COMMIT, CHARGE_REQUEST, HIDE_VIDEO, SHOW_VIDEO } from 'app/App.components/BuyModal/BuyModal.actions'
import { Key } from 'shared/key/Key'
import { KeyUser } from 'shared/key/KeyUser'
import { Video } from 'shared/video/Video'

export interface BuyModalState {
  showing: boolean
  video?: Video
  purchasedKey?: Key
  transactionHash?: string
  sellers: KeyUser[]
}

const buyModalDefaultState: BuyModalState = {
  showing: false,
  video: undefined,
  purchasedKey: undefined,
  transactionHash: undefined,
  sellers: []
}

export function buyModal(state = buyModalDefaultState, action: any): BuyModalState {
  switch (action.type) {
    case RESET: {
      return buyModalDefaultState
    }
    case RESTORE: {
      return buyModalDefaultState
    }
    case SHOW_VIDEO: {
      return {
        ...state,
        video: action.payload.video,
        showing: true
      }
    }
    case HIDE_VIDEO: {
      return buyModalDefaultState
    }
    case CHARGE_REQUEST: {
      return {
        ...state,
        sellers: []
      }
    }
    case CHARGE_COMMIT: {
      return {
        ...state,
        sellers: action.payload.keyUsers
      }
    }
    case BUY_KEY_COMMIT: {
      return {
        ...state,
        purchasedKey: action.payload.key,
        transactionHash: action.payload.transactionHash
      }
    }
    default:
      return state
  }
}
