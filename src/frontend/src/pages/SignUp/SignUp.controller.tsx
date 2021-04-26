import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SignUpInputs } from 'shared/user/SignUp'

import { State } from '../../reducers'
import { signUp } from './SignUp.actions'
import { SignUpView } from './SignUp.view'

export const SignUp = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)

  const signUpCallback = async (signUpInputs: SignUpInputs) => {
    dispatch(
      signUp({
        ...signUpInputs,
        recaptchaToken:
          'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      }),
    )
  }

  return <SignUpView signUpCallback={signUpCallback} loading={loading} />
}
