const baseUrl = 'https://jobs-api.squareboat.info/api/v1'

export const loginApi = `${baseUrl}/auth/login`;
export const registerApi = `${baseUrl}/auth/register`;
export const resetPasswordApi = `${baseUrl}/auth/resetpassword?email=[sharad@gmail.com]`;
export const verifyPasswordApi = `${baseUrl}/auth/resetpassword/[eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InJvaGl0QGdtYWlsLmNvbSIsImlhdCI6MTY0MjI5MzExNywiZXhwIjoxNjQyMjk2NzE3fQ.o-ZAcUNq6yq9VjJXSOS5thuUZOr6BN6HkRbZ-AOzH9s]`;
export const changePasswordApi = `${baseUrl}/auth/resetpassword`;
