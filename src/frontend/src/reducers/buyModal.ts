import { RESET, RESTORE } from 'app/App.actions'
import { BUY_KEY_COMMIT, GET_SELLERS_COMMIT, GET_SELLERS_REQUEST, HIDE_SELLERS, SHOW_SELLERS } from 'app/App.components/BuyModal/BuyModal.actions'
import { ObjectId } from 'mongodb'
import { Key } from 'shared/key/Key'
import { KeyUser } from 'shared/key/KeyUser'

export interface BuyModalState {
  showing: boolean
  videoId?: ObjectId
  purchasedKey?: Key,
  transactionHash?: string,
  sellers: KeyUser[]
}

const buyModalDefaultState: BuyModalState = {
  showing: false,
  videoId: undefined,
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
    case SHOW_SELLERS: {
      return {
        ...state,
        videoId: action.payload.videoId,
        showing: true
      }
    }
    case HIDE_SELLERS: {
      return buyModalDefaultState
    }
    case GET_SELLERS_REQUEST: {
      return {
        ...state,
        sellers: []
      }
    }
    case GET_SELLERS_COMMIT: {
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
