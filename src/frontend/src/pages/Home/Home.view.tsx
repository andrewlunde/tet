import { ObjectId } from 'mongodb'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Video } from 'shared/video/Video'

import { HomeMeta } from './Home.meta'
import { HomeVideo, HomeVideoFooter, HomeVideoImage, HomeVideos, HomeHero, HomeStyled } from './Home.style'

type HomeViewProps = {
  loading: boolean
  videos: Video[]
  showSellersCallback: (videoId: ObjectId) => void
}

export const HomeView = ({ loading, videos = [], showSellersCallback }: HomeViewProps) => {
  console.log(videos)

  return (
    <HomeStyled>
      <HomeMeta blankTitle="Home" />
      <HomeHero />

      <HomeVideos>
        {videos && videos.length > 0 ? (
          <>
            {videos.map((video) => (
              <HomeVideo key={(video._id as any) as string} onClick={() => showSellersCallback(video._id)}>
                <HomeVideoImage alt={video.title} src={video.imageUrl} />
                <HomeVideoFooter>
                  <div>{video.title}</div>
                  <div>{video.creator}</div>
                  <div>{video.note}</div>
                  <div>{`(${video.noteCount})`}</div>
                </HomeVideoFooter>
              </HomeVideo>
            ))}
          </>
        ) : (
          <div>No video</div>
        )}
      </HomeVideos>
    </HomeStyled>
  )
}

HomeView.propTypes = {
  loading: PropTypes.bool,
  videos: PropTypes.array.isRequired,
  showSellersCallback: PropTypes.func.isRequired,
}

HomeView.defaultProps = {
  loading: false,
}
