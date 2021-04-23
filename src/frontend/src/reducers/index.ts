import { connectRouter } from 'connected-react-router'
import { combineReducers } from 'redux'

import { auth, AuthState } from './auth'
import { balance, BalanceState } from './balance'
import { buyModal, BuyModalState } from './buyModal'
import { comments, CommentsState } from './comments'
import { drawer, DrawerState } from './drawer'
import { videos, VideosState } from './videos'
import { loading, LoadingState } from './loading'
import { posts, PostsState } from './posts'
import { progressBar, ProgressBarState } from './progressBar'
import { report, ReportState } from './report'
import { sellModal, SellModalState } from './sellModal'
import { serviceWorker, ServiceWorkerState } from './serviceWorker'
import { stats, StatsState } from './stats'
import { toaster, ToasterState } from './toaster'
import { uploader, UploaderState } from './uploader'
import { users, UsersState } from './users'
import { voters, VotersState } from './voters'

export const reducers = (history: any) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    loading,
    users,
    toaster,
    drawer,
    progressBar,
    serviceWorker,
    comments,
    uploader,
    voters,
    report,
    posts,
    stats,
    videos,
    buyModal,
    sellModal,
    balance
  })

export interface State {
  auth: AuthState
  loading: LoadingState
  users: UsersState
  toaster: ToasterState
  drawer: DrawerState
  progressBar: ProgressBarState
  serviceWorker: ServiceWorkerState
  comments: CommentsState
  uploader: UploaderState
  voters: VotersState
  report: ReportState
  posts: PostsState
  stats: StatsState
  videos: VideosState
  buyModal: BuyModalState
  sellModal: SellModalState
  balance: BalanceState
}
