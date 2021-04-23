import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { getBalance } from './Header.actions'
import { HeaderView } from './Header.view'

export const Header = () => {
  const dispatch = useDispatch()
  const user = useSelector((state: State) => state.auth.user)
  const balance = useSelector((state: State) => state.balance)

  useEffect(() => {
    if (user) {
      dispatch(getBalance())
    }
  }, [dispatch, user])

  return <HeaderView user={user} balance={balance} />
}
