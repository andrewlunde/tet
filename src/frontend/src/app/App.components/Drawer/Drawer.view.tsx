import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Link } from 'react-router-dom'
import { PublicUser } from 'shared/user/PublicUser'
import { UserRole } from 'shared/user/UserRole'

import { DrawerItem, DrawerMask, DrawerStyled } from './Drawer.style'

type DrawerViewProps = {
  showing: boolean
  hideCallback: () => void
  pathname: string
  user: PublicUser
  removeAuthUserCallback: () => void
}

export const DrawerView = ({ showing, hideCallback, pathname, user, removeAuthUserCallback }: DrawerViewProps) => (
  <>
    <DrawerMask className={`${showing}`} onClick={() => hideCallback()} />
    <DrawerStyled className={`${showing}`}>
      <h1>Menu</h1>

      {user
        ? loggedInDrawer(user, pathname, hideCallback, removeAuthUserCallback)
        : loggedOutDrawer(pathname, hideCallback)}

      <DrawerItem isSelected={pathname === '/'}>
        <Link to="/" onClick={() => hideCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#home" />
          </svg>
          Home
        </Link>
      </DrawerItem>
    </DrawerStyled>
  </>
)

function loggedOutDrawer(pathname: string, hideCallback: () => void) {
  return (
    <>
      <DrawerItem isSelected={pathname === '/login'}>
        <Link to="/login" onClick={() => hideCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#login" />
          </svg>
          Login
        </Link>
      </DrawerItem>

      <DrawerItem isSelected={pathname === '/sign-up'}>
        <Link to="/sign-up" onClick={() => hideCallback()}>
          <svg>
            <use xlinkHref="/icons/sprites.svg#sign-up" />
          </svg>
          Sign Up
        </Link>
      </DrawerItem>
    </>
  )
}

function loggedInDrawer(
  user: PublicUser,
  pathname: string,
  hideCallback: () => void,
  removeAuthUserCallback: () => void,
) {
  return (
    <>
      <DrawerItem>
        <Link
          to="/"
          onClick={() => {
            removeAuthUserCallback()
            hideCallback()
          }}
        >
          <svg>
            <use xlinkHref="/icons/sprites.svg#log-out" />
          </svg>
          Log Out
        </Link>
      </DrawerItem>
    </>
  )
}

DrawerView.propTypes = {
  showing: PropTypes.bool,
  hideCallback: PropTypes.func.isRequired,
  pathname: PropTypes.string.isRequired,
  user: PropTypes.object,
  removeAuthUserCallback: PropTypes.func.isRequired,
}

DrawerView.defaultProps = {
  showing: false,
  user: undefined,
}
