import styled from 'styled-components/macro'
import { FullPage, primaryColor, subTextColor, textColor } from 'styles'

export const HomeStyled = styled(FullPage)`
  text-align: center;

  > img {
    margin: auto;
  }
`

export const HomeHero = styled.div`
  height: 502px;
`

export const HomeVideos = styled.div`
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 30px;
  width: 100%;
`

export const HomeVideo = styled.div`
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`

export const HomeVideoImage = styled.img`
  width: 100%;
  border-radius: 5px;
`

export const HomeVideoFooter = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin: 6px 0 6px 0;

  > div:nth-child(1) {
    font-size: 16px;
    color: ${primaryColor};
    text-align: left;
    font-weight: bold;
  }

  > div:nth-child(2) {
    font-size: 16px;
    color: ${textColor};
    text-align: right;
  }

  > div:nth-child(3) {
    font-size: 12px;
    color: ${subTextColor};
    text-align: left;
  }

  > div:nth-child(4) {
    font-size: 12px;
    color: ${subTextColor};
    text-align: right;
  }
`
