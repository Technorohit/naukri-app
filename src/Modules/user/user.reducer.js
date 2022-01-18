import {USER_LOGIN} from './user.action'
const initialState = {
    isUserAuthenticated:false
}
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
                isUserAuthenticated:true,
                user: {
                    message: 'success',
                    ...action.response.data
                }
            }
        case USER_LOGIN.FAILED:
        case USER_LOGIN.LOGOUT:
            return {
                ...state,
                isUserAuthenticated:false,
            }
        default:
            return state
    }
}