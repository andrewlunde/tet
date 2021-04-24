import { ObjectId } from 'mongodb'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { charge, hideVideo } from './BuyModal.actions'
import { BuyModalView } from './BuyModal.view'

export const BuyModal = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { video, showing } = useSelector((state: State) => state.buyModal)

  const hideCallback = () => {
    dispatch(hideVideo())
  }

  const chargeCallback = (videoId: ObjectId) => {
    dispatch(charge({ videoId }))
  }

  return (
    <BuyModalView
      loading={loading}
      showing={showing}
      video={video}
      hideCallback={hideCallback}
      chargeCallback={chargeCallback}
    />
  )
}
