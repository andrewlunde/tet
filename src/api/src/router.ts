import * as Router from '@koa/router'
import { Context } from 'koa'

import { addCommentView } from './resolvers/comment/addCommentView/addCommentView'
import { getComment } from './resolvers/comment/getComment/getComment'
import { getComments } from './resolvers/comment/getComments/getComments'
import { getGoogleImages } from './resolvers/comment/getGoogleImages/getGoogleImages'
import { newComment } from './resolvers/comment/newComment/newComment'
import { createVideos } from './resolvers/video/createVideos/createVideos'
import { getVideos } from './resolvers/video/getVideos/getVideos'
import { buyKey } from './resolvers/key/buyKey/buyKey'
import { getSellers } from './resolvers/key/getSellers/getSellers'
import { newKey } from './resolvers/key/newKey/newKey'
import { getPublicUser } from './resolvers/page/getPublicUser/getPublicUser'
import { sendReport } from './resolvers/report/sendReport/sendReport'
import { getStats } from './resolvers/stat/getStats/getStats'
import { getToken } from './resolvers/upload/getToken/getToken'
import { changePassword } from './resolvers/user/changePassword/changePassword'
import { editProfilePicture } from './resolvers/user/editProfilePicture/editProfilePicture'
import { forgotPassword } from './resolvers/user/forgotPassword/forgotPassword'
import { getBalance } from './resolvers/user/getBalance/getBalance'
import { login } from './resolvers/user/login/login'
import { resendEmailVerification } from './resolvers/user/resendEmailVerification/resendEmailVerification'
import { resetPassword } from './resolvers/user/resetPassword/resetPassword'
import { signUp } from './resolvers/user/signUp/signUp'
import { verifyEmail } from './resolvers/user/verifyEmail/verifyEmail'
import { getDownvoters } from './resolvers/vote/getDownvoters/getDownvoters'
import { getUpvoters } from './resolvers/vote/getUpvoters/getUpvoters'
import { sendVote } from './resolvers/vote/sendVote/sendVote'

const router = new Router()

router.get('/', async (ctx: Context) => {
  ctx.body = 'You are not supposed to be here ;)'
})

router.post('/user/sign-up', signUp)
router.post('/user/login', login)
router.post('/user/verify-email', verifyEmail)
router.post('/user/resend-email-verification', resendEmailVerification)
router.post('/user/reset-password', resetPassword)
router.post('/user/forgot-password', forgotPassword)
router.post('/user/change-password', changePassword)
router.post('/user/edit-profile-picture', editProfilePicture)
router.post('/user/get-balance', getBalance)

router.post('/vote/send-vote', sendVote)
router.post('/vote/get-upvoters', getUpvoters)
router.post('/vote/get-downvoters', getDownvoters)

router.post('/report/send-report', sendReport)

router.post('/comment/add-comment-view', addCommentView)
router.post('/comment/get-comment', getComment)
router.post('/comment/get-comments', getComments)
router.post('/comment/get-google-images', getGoogleImages)

router.post('/comment/new-comment', newComment)

router.post('/page/get-user', getPublicUser)

router.get('/stat/get-stats', getStats)

router.get('/upload/get-token', getToken)

router.post('/video/get-videos', getVideos)
router.get('/video/create-videos', createVideos)

router.post('/key/get-sellers', getSellers)
router.post('/key/buy-key', buyKey)
router.post('/key/new-key', newKey)


export { router }
