import styled from 'styled-components/macro'
import { backgroundColorDeep, primaryColor, subTextColor } from 'styles'

export const BuyModalNoKey = styled.div`
  background-color: ${backgroundColorDeep};
  padding: 20px;
  margin-top: 20px;
`

export const BuyModalSeller = styled.div`
  background-color: ${backgroundColorDeep};
  padding: 20px;
  margin-top: 20px;
  display: grid;
  grid-template-columns: 45px repeat(3, 1fr);
  grid-gap: 10px;
`
export const BuyModalVideo = styled.div``

export const BuyModalSellerImg = styled.img`
  width: 45px;
  border-radius: 40px;
`

export const BuyModalSellerName = styled.div`
  margin-top: 6px;

  > div {
    font-weight: bold;
    font-size: 16px;
  }

  > p {
    color: ${subTextColor};
    margin: 0;
    font-size: 12px;
  }
`

export const BuyModalSellerKeyPrice = styled.div`
  margin-top: 6px;

  > div {
    color: ${primaryColor};
    font-weight: bold;
    font-size: 16px;
  }

  > p {
    color: ${subTextColor};
    margin: 0;
    font-size: 12px;
  }
`

export const BuyModalSellerBuyButton = styled.div`
  background: linear-gradient(to right bottom, #ff3b00, #fe7e00);
  display: flex;
  align-items: center;
  justify-content: space-around;
  border-radius: 5px;
  cursor: pointer;
`
