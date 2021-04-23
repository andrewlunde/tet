import { ObjectId } from 'mongodb'
import * as React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'

import { showSellModal } from '../SellModal/SellModal.actions'
import { buyKey, getSellers, hideSellers } from './BuyModal.actions'
import { BuyModalView } from './BuyModal.view'

export const BuyModal = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { videoId, showing, sellers, purchasedKey, transactionHash } = useSelector((state: State) => state.buyModal)

  useEffect(() => {
    if (videoId) {
      dispatch(getSellers({ videoId }))
    }
  }, [dispatch, videoId])

  const hideCallback = () => {
    dispatch(hideSellers())
  }

  const buyCallback = (keyId: ObjectId) => {
    dispatch(buyKey({ keyId }))
  }

  const sellCallback = () => {
    dispatch(hideSellers())
    if (videoId) dispatch(showSellModal(videoId))
  }

  return (
    <BuyModalView
      loading={loading}
      showing={showing}
      sellers={sellers}
      purchasedKey={purchasedKey}
      transactionHash={transactionHash}
      hideCallback={hideCallback}
      sellCallback={sellCallback}
      buyCallback={buyCallback}
    />
  )
}
