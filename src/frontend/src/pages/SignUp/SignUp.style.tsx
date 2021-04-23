import styled from 'styled-components/macro'

import { Card, CardPage, FadeInFromTop, primaryColor } from '../../styles'

export const SignUpStyled = styled(CardPage)`
  background: #000;
`

export const SignUpCard = styled(Card)`
  padding: 20px;
  box-shadow: 0px 0px 150px 150px rgba(0, 0, 0, 1);
`
export const SignUpSeparator = styled.div`
  height: 10px;
`

export const SignUpTitle = styled(FadeInFromTop)``

export const SignUpLogin = styled.div`
  margin-top: 10px;
  text-align: center;
  > a {
    color: ${primaryColor} !important;
  }
`
