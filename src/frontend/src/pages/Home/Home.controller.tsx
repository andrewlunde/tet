import { showVideo } from 'app/App.components/BuyModal/BuyModal.actions'
import { ObjectId } from 'mongodb'
import * as PropTypes from 'prop-types'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { Video } from 'shared/video/Video'

import { getVideos } from './Home.actions'
import { HomeView } from './Home.view'

export const Home = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const videos = useSelector((state: State) => state.videos)

  useEffect(() => {
    dispatch(getVideos())
  }, [dispatch])

  const showVideoCallback = (video: Video) => {
    dispatch(showVideo(video))
  }

  return <HomeView loading={loading} videos={videos} showVideoCallback={showVideoCallback} />
}
