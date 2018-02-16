import update from 'immutability-helper'
import createActionCreator from 'core/action'

const initialState = { user: {}, error: null, isLoading: false }

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case `${getUser.type}_PENDING`:
      return update(state, {
        $merge: {
          isLoading: true,
          error: null
        }
      })
    case `${getUser.type}_FULFILLED`:
      return update(state, {
        user: {
          $set: action.payload
        },
        isLoading: {
          $set: false
        }
      })
    case `${getUser.type}_REJECTED`:
      return update(state, {
        $merge: {
          error: action.payload,
          isLoading: false
        }
      })
    default: return state
  }
}

// Action Creators
export const getUser = createActionCreator('GET_USER', async ({user}) => {
  try {
    let fetchedUser = await fetch(`https://api.github.com/users/${user}`)
    fetchedUser = await fetchedUser.json()
    return fetchedUser
  } catch (e) {
    return e
  }
})
