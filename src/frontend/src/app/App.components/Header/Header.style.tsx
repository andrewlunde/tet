import styled from 'styled-components/macro'

// prettier-ignore
import { backgroundColorDark, backgroundColorLight, backgroundTextColor, bgTextColor, headerColor, HURME_GEOMETRIC, primaryColor, secondaryColor, shadowColor, subTextColor, textColor } from '../../../styles'

export const HeaderStyled = styled.div`
  z-index: 1;
  width: 90vw;
  max-width: 1280px;
  display: grid;
  grid-template-columns: 130px auto;
  grid-gap: 10px;
  margin: auto;

  img {
    height: 30px;
    margin-top: 12px;
  }
`

export const HeaderFloat = styled.div``

export const HeaderLoggedOut = styled.div`
  display: grid;
  grid-template-columns: 80px 120px;
  grid-gap: 10px;
  padding: 6px 9px;
`

export const HeaderLoggedIn = styled.div`
  font-size: 16px;
  font-weight: bold;
  line-height: 60px;
  display: grid;
  grid-template-columns: 80px 150px 100px;
  grid-gap: 20px;

  > button {
    margin-top: 11px;
  }
`

export const HeaderNotificationCount = styled.div`
  position: absolute;
  top: 11px;
  margin-left: 26px;
  width: 20px;
  height: 14px;
  font-size: 9px;
  line-height: 14px;
  font-family: '${HURME_GEOMETRIC}';
  font-weight: bold;
  border-radius: 12px;
  border: 1px solid ${backgroundColorDark};
  text-align: center;
  background-color: ${primaryColor};
  color: ${textColor};

  &.secondary {
    background-color: ${secondaryColor};
    color: ${backgroundColorLight};
  }
`

export const HeaderLoggedInName = styled.div``

export const HeaderLoggedInBalance = styled.div`
  color: ${primaryColor};
`
