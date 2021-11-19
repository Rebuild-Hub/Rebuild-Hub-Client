export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

export const login = (data) => {
    return {
        type: LOGIN,
        payload: {
            userData: data
        }
    }
}

export const logout = () => {
    return {
        type: LOGOUT,
    }
}