import { ObjectId } from 'mongodb'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { Video } from 'shared/video/Video'

import { HomeMeta } from './Home.meta'
import { HomeVideo, HomeVideoFooter, HomeVideoImage, HomeVideos, HomeHero, HomeStyled } from './Home.style'

type HomeViewProps = {
  loading: boolean
  videos: Video[]
  showVideoCallback: (video: Video) => void
}

export const HomeView = ({ loading, videos = [], showVideoCallback }: HomeViewProps) => {
  console.log(videos)

  return (
    <HomeStyled>
      <HomeMeta blankTitle="Home" />
      <HomeHero />

      <HomeVideos>
        {videos && videos.length > 0 ? (
          <>
            {videos.map((video) => (
              <HomeVideo key={(video._id as any) as string} onClick={() => showVideoCallback(video)}>
                <HomeVideoImage alt={video.title} src={video.imageUrl} />
                <HomeVideoFooter>
                  <div>{video.title}</div>
                  <div>{video.creator}</div>
                  <img src="/images/note.svg" />
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
  showVideoCallback: PropTypes.func.isRequired,
}

HomeView.defaultProps = {
  loading: false,
}
