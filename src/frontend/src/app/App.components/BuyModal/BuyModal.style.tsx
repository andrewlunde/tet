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
export const BuyModalVideo = styled.div`
  > h1 {
    margin: 0 0 10px 0;
    line-height: 36px;
  }
`

export const BuyModalConsumedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 10px;
  margin-top: 20px;
`

export const BuyModalConsumedTitle = styled.div`
  font-size: 16px;
  line-height: 16px;
  color: #999999;
`

export const BuyModalConsumedValue = styled.div`
  font-weight: bold;
  font-size: 40px;
  line-height: 40px;
  color: #ffffff;

  > img {
    height: 39px;
    vertical-align: bottom;
    margin-left: 10px;
  }
`

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
