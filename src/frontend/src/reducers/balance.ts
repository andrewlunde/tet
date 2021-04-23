import { RESET, RESTORE } from 'app/App.actions'
import { GET_BALANCE_COMMIT } from 'app/App.components/Header/Header.actions'

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
    default:
      return state
  }
}
