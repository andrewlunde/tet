import { redirect } from 'app/App.actions'
import { showToaster } from 'app/App.components/Toaster/Toaster.actions'
import { SUCCESS } from 'app/App.components/Toaster/Toaster.constants'
import { State } from 'reducers'
import { EditProfilePictureInputs } from 'shared/user/EditProfilePicture'

export const EDIT_PROFILE_PICTURE_REQUEST = 'EDIT_PROFILE_PICTURE_REQUEST'
export const EDIT_PROFILE_PICTURE_COMMIT = 'EDIT_PROFILE_PICTURE_COMMIT'
export const EDIT_PROFILE_PICTURE_ROLLBACK = 'EDIT_PROFILE_PICTURE_ROLLBACK'

export const editProfilePicture = ({ profilePicture }: EditProfilePictureInputs) => (dispatch: any, getState: any) => {
  const state: State = getState()
  dispatch({
    type: EDIT_PROFILE_PICTURE_REQUEST,
    payload: {},
    meta: {
      offline: {
        effect: {
          url: `https://api.tet.university/user/edit-profile-picture`,
          method: 'POST',
          headers: { Authorization: `Bearer ${state.auth.jwt}` },
          json: { profilePicture },
        },
        commit: {
          type: EDIT_PROFILE_PICTURE_COMMIT,
          meta: {
            thunks: [showToaster(SUCCESS, 'Profile updated!', 'Nice job'), redirect(`/`)],
          },
        },
        rollback: { type: EDIT_PROFILE_PICTURE_ROLLBACK },
      },
    },
  })
}
