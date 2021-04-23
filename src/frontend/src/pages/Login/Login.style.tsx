import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop, primaryColor } from '../../styles'

export const LoginStyled = styled(CardPage)`
  background: #000;
`

export const LoginCard = styled(Card)`
  padding: 20px;
  box-shadow: 0px 0px 150px 150px rgba(0, 0, 0, 1);
`
export const LoginSeparator = styled.div`
  height: 10px;
`

export const LoginTitle = styled(FadeInFromTop)``

export const LoginSignUp = styled.div`
  margin-top: 10px;
  text-align: center;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;

  > a {
    color: ${primaryColor} !important;
  }
`
