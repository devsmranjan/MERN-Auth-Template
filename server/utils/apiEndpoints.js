module.exports = {
    API_ENDPOINT: '/api',
    API_DOCS: '/api/docs',
    AUTH_ENDPOINT: '/api/auth',
    AUTH_SIGNUP: '/signup',
    AUTH_LOGIN: '/login',
    AUTH_VERIFY_EMAIL: '/verify/:token',
    AUTH_VERIFY_FULL: '/api/auth/verify/',
    AUTH_VERIFY_EMAIL_RESEND: '/resend',
    AUTH_RECOVER: '/recover',
    AUTH_CHECK_RESET_LINK: '/reset/:token',
    AUTH_RESET: '/reset/:token',
    AUTH_RESET_FULL: '/api/auth/reset/',

    // user
    USER_ENDPOINT: '/api/user',
    USER_UPDATE: '/update',
    USER_UPDATE_PASSWORD: '/updatePassword',
    USER_DELETE_ACCOUNT: '/deleteAccount',

    // Client
    CLIENT_RESET_PASSWORD_PATH: '/resetPassword',
    CLIENT_EMAIL_VERIFICATION_PATH: '/verifyEmail',
};
