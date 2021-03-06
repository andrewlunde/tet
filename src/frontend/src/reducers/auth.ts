import { RESET, RESTORE } from 'app/App.actions'
import { EDIT_PROFILE_PICTURE_COMMIT } from 'pages/EditProfilePicture/EditProfilePicture.actions'
import { FORGOT_PASSWORD_COMMIT } from 'pages/ForgotPassword/ForgotPassword.actions'
import { LOGIN_COMMIT, LOGIN_ROLLBACK, LOGOUT } from 'pages/Login/Login.actions'
import { SIGN_UP_COMMIT, SIGN_UP_ROLLBACK } from 'pages/SignUp/SignUp.actions'
import { Jwt } from 'shared/user/Jwt'
import { PublicUser } from 'shared/user/PublicUser'

export interface AuthState {
  jwt?: Jwt
  user?: PublicUser
  resetPasswordToken?:string
  mnemonic?:string
}

const authDefaultState: AuthState = {
  jwt: undefined,
  user: undefined,
  resetPasswordToken: undefined,
  mnemonic: undefined
}

export function auth(state = authDefaultState, action: any): AuthState {
  switch (action.type) {
    case RESET: {
      return authDefaultState
    }
    case RESTORE: {
      return {
        ...state,
        resetPasswordToken: undefined
      }
    }
    case SIGN_UP_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
        mnemonic: action.payload.mnemonic,
      }
    }
    case SIGN_UP_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    }
    case LOGOUT:
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    case LOGIN_COMMIT: {
      return {
        ...state,
        jwt: action.payload.jwt,
        user: action.payload.user,
      }
    }
    case LOGIN_ROLLBACK: {
      return {
        ...state,
        jwt: undefined,
        user: undefined,
      }
    }
    case EDIT_PROFILE_PICTURE_COMMIT: {
      return {
        ...state,
        user: action.payload.user,
      }
    }
    case FORGOT_PASSWORD_COMMIT: {
      return {
        ...state,
        resetPasswordToken: action.payload.token,
      }
    }
    default:
      return state
  }
}
