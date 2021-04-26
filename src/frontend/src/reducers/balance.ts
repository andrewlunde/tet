import { RESET, RESTORE } from 'app/App.actions'
import { CHARGE_COMMIT } from 'app/App.components/BuyModal/BuyModal.actions'
import { GET_BALANCE_COMMIT } from 'app/App.components/Header/Header.actions'
import { SIGN_UP_COMMIT } from 'pages/SignUp/SignUp.actions'

export type BalanceState = number | null

const balanceDefaultState: BalanceState = null

export function balance(state = balanceDefaultState, action: any): BalanceState {
  switch (action.type) {
    case RESET: {
      return balanceDefaultState
    }
    case RESTORE: {
      return balanceDefaultState
    }
    case GET_BALANCE_COMMIT: {
      return action.payload.balance
    }
    case SIGN_UP_COMMIT: {
      return 100
    }
    case CHARGE_COMMIT: {
      if(state && state > 0) return state - 1
      return state
    }
    default:
      return state
  }
}
