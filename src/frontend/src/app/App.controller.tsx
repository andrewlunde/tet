import { ConnectedRouter } from 'connected-react-router'
import * as React from 'react'

import { BuyModal } from './App.components/BuyModal/BuyModal.controller'
import { Header } from './App.components/Header/Header.controller'
import { ProgressBar } from './App.components/ProgressBar/ProgressBar.controller'
import { SellModal } from './App.components/SellModal/SellModal.controller'
import { Toaster } from './App.components/Toaster/Toaster.controller'
import { history } from './App.store'
import { AppView } from './App.view'

export const App = () => (
  <ConnectedRouter history={history}>
    <Header />
    <AppView />
    <Toaster />
    <ProgressBar />
    <BuyModal />
    <SellModal />
  </ConnectedRouter>
)
