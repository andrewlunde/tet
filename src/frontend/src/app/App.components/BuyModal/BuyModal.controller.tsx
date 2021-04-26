import { ObjectId } from 'mongodb'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { charge, hideVideo } from './BuyModal.actions'
import { BuyModalView } from './BuyModal.view'

export const BuyModal = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { video, showing } = useSelector((state: State) => state.buyModal)
  const [ticker, setTicker] = useState(1)
  const [intervalID, setIntervalID] = useState(-1)
  const { jwt } = useSelector((state: State) => state.auth)

  const startInterval = () => {
    setIntervalID(
      setInterval(() => {
        setTicker((prev) => prev + 1)
      }, 1000),
    )
  }

  const stopInterval = () => {
    clearInterval(intervalID)
    setIntervalID(-1)
    setTicker(0)
  }

  useEffect(() => {
    if (video && ticker % 60 === 0) dispatch(charge({ videoId: video._id }))
  }, [ticker])

  useEffect(() => {
    if (showing) startInterval()
    else stopInterval()

    return function cleanup() {
      stopInterval()
    }
  }, [showing])

  const hideCallback = () => {
    dispatch(hideVideo())
  }

  return (
    <BuyModalView
      loading={loading}
      showing={showing}
      video={video}
      hideCallback={hideCallback}
      ticker={ticker}
      jwt={jwt}
    />
  )
}
