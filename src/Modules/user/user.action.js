import doRequest from '../../Utility/api';
import { setUserSession, removeUserSession } from '../../Utility/util';
import { loginApi } from '../../Components/Constant'
export const USER_LOGIN = {
    REQUEST: 'USER_LOGIN_REQUEST',
    SUCCESS: 'USER_LOGIN_SUCCESS',
    FAILED: 'USER_LOGIN_FAILED',
    LOGOUT: 'USER_LOGIN_LOGOUT',
}

export const doLogin = (loginDetails) => {
    return dispatch => {

        const urlDetails = loginApi;
        return dispatch(doRequest(urlDetails, USER_LOGIN, 'post', loginDetails)).then(response => {
            if (response.data) {
                setUserSession(response.data)
            }
            return response;
        });
    }
}

export const doLogOut = () => {
    return dispatch => {
        //USER_LOGIN.FAILED
        //remove session
        removeUserSession()
        return dispatch({
            type: USER_LOGIN.LOGOUT
        });
    }
}