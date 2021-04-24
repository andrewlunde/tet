import { ObjectId } from 'mongodb'
import * as PropTypes from 'prop-types'
import React, { useEffect, useRef, useState } from 'react'
import videojs from 'video.js'
import VREPlayer from 'videojs-react-enhanced'
import 'video.js/dist/video-js.css'

import { Video } from 'shared/video/Video'
// prettier-ignore
import { ModalCard, ModalCardContent, ModalClose, ModalMask, ModalStyled, textColor, ModalCardText, ModalCardH1, ModalA } from 'styles'
import { BuyModalVideo } from './BuyModal.style'

type BuyModalViewProps = {
  loading: boolean
  showing: boolean
  video?: Video
  hideCallback: () => void
  chargeCallback: (videoId: ObjectId) => void
}

export const BuyModalView = ({ loading, showing, video, hideCallback, chargeCallback }: BuyModalViewProps) => {
  const playerOptions = {
    src: video?.videoUrl || '',
    controls: true,
    autoplay: 'play' as 'play',
  }
  const videojsOptions = {
    fluid: true,
  }

  return (
    <ModalStyled showing={showing}>
      {showing && (
        <>
          <ModalMask showing={showing} onClick={() => hideCallback()} />
          <ModalCard>
            <ModalClose onClick={() => hideCallback()}>
              <svg>
                <use xlinkHref="/icons/sprites.svg#close" />
              </svg>
            </ModalClose>
            <ModalCardContent width={70} height={70}>
              <BuyModalVideo>
                <h1>{video?.title}</h1>
                <VREPlayer
                  playerOptions={playerOptions}
                  videojsOptions={videojsOptions}
                  onReady={(player) => console.log(player)}
                  onPlay={(e, _, second) => console.log('Play!')}
                  onPause={(e, _, second) => console.log('Pause!')}
                  onEnded={(e, _) => console.log('Ended!')}
                />
              </BuyModalVideo>
            </ModalCardContent>
          </ModalCard>
        </>
      )}
    </ModalStyled>
  )
}

BuyModalView.propTypes = {
  loading: PropTypes.bool,
  showing: PropTypes.bool.isRequired,
  hideCallback: PropTypes.func.isRequired,
  chargeCallback: PropTypes.func.isRequired,
}

BuyModalView.defaultProps = {
  loading: false,
}
