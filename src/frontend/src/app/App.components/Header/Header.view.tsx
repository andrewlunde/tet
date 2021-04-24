import { logout } from 'pages/Login/Login.actions'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { textColor, backgroundTextColor } from 'styles'

import { Button } from '../Button/Button.controller'
// prettier-ignore
import { HeaderFloat, HeaderLoggedIn, HeaderLoggedInBalance, HeaderLoggedInName, HeaderLoggedOut, HeaderStyled } from './Header.style'

type HeaderViewProps = {
  user?: PublicUser
  balance: number | null
}

export const HeaderView = ({ user, balance }: HeaderViewProps) => {
  const dispatch = useDispatch()

  return (
    <HeaderStyled>
      <Link to="/">
        <img alt="TET" src="/logo.svg" />
      </Link>

      <HeaderFloat>{user ? loggedInHeader(dispatch, user, balance) : loggedOutHeader()}</HeaderFloat>
    </HeaderStyled>
  )
}

function loggedOutHeader() {
  return (
    <HeaderLoggedOut>
      <Link to="/login">
        <Button color="transparent" text="Login" icon="login" textColor={textColor} />
      </Link>
      <Link to="/sign-up">
        <Button color="transparent" text="Sign Up" icon="plus-card" />
      </Link>
    </HeaderLoggedOut>
  )
}

function loggedInHeader(dispatch: any, user?: PublicUser, balance?: number | null) {
  return (
    <HeaderLoggedIn>
      <HeaderLoggedInName>{`${user?.username}`}</HeaderLoggedInName>
      <HeaderLoggedInBalance>
        <div style={{ display: 'inline-block' }}>
          {balance ? `Balance: ${balance.toLocaleString()} TFUEL` : 'Loading balance...'}
        </div>
      </HeaderLoggedInBalance>
      <Button
        color="transparent"
        text="Logout"
        icon="logout"
        onClick={() => {
          dispatch(logout())
        }}
      />
    </HeaderLoggedIn>
  )
}

HeaderView.propTypes = {
  user: PropTypes.object,
  balance: PropTypes.number,
}

HeaderView.defaultProps = {}
