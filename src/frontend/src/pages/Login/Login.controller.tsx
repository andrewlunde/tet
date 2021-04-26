import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LoginInputs } from 'shared/user/Login'

import { State } from '../../reducers'
import { login } from './Login.actions'
import { LoginView } from './Login.view'

export const Login = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)

  const loginCallback = async (loginInputs: LoginInputs) => {
    dispatch(
      login({
        ...loginInputs,
        recaptchaToken:
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }),
    )
  }

  return <LoginView loginCallback={loginCallback} loading={loading} />
}
