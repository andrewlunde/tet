import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { State } from 'reducers'
import { NewKeyInputs } from 'shared/key/NewKey'

import { hideSellModal, newKey } from './SellModal.actions'
import { SellModalView } from './SellModal.view'

export const SellModal = () => {
  const dispatch = useDispatch()
  const loading = useSelector((state: State) => state.loading)
  const { videoId, showing } = useSelector((state: State) => state.sellModal)

  const hideCallback = () => {
    dispatch(hideSellModal())
  }

  const newKeyCallback = async (newKeyInputs: any) => {
    dispatch(newKey({ ...newKeyInputs, videoId } as NewKeyInputs))
  }

  return (
    <SellModalView loading={loading} showing={showing} newKeyCallback={newKeyCallback} hideCallback={hideCallback} />
  )
}
