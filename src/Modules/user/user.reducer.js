import {USER_LOGIN} from './user.action'
const initialState = {}
export default (state = initialState,action) => {
    switch (action.type) {
        case USER_LOGIN.REQUEST:
            return {
                ...state,
                user: {
                    message: 'request',
                    ...action.data
                }
            };
        case USER_LOGIN.SUCCESS:
            return {
                ...state,
                user: {
                    message: 'success',
                    ...action.data
                }
            }
        case USER_LOGIN.FAILED:
            return {
                ...state,
                user: {
                    message: 'failed',
                    ...action.data
                }
            }
    }
}