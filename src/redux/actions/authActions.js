import { authAPI } from '../../common/utils/api';

export const loginSuccess = (userData) => ({
  type: 'LOGIN_SUCCESS',
  payload: userData
});

export const logout = () => ({
  type: 'LOGOUT'
});

export const loginUser = (credentials) => async (dispatch) => {
  try {
    const response = await authAPI.login(credentials);
    localStorage.setItem('token', response.data.token);
    dispatch(loginSuccess({
      user: response.data.user,
      token: response.data.token,
      isAdmin: response.data.user.role === 'admin'
    }));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.response.data.message };
  }
};