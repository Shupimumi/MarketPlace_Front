import axios from "axios";
import apiUrls from "../config/apiUrls";
import keycloak from "../keycloak";

// Refresh the access token if it expires within this many seconds
const TOKEN_MIN_VALIDITY_SECONDS = 30;

const axiosInstance = axios.create({
    baseURL: apiUrls.BASE_URL,
    timeout: 50000,
    headers: {
        'Content-Type': 'application/json', // Общие заголовки
    },
});

// Attach the Keycloak access token to every request.
// `keycloak` is the same instance that ReactKeycloakProvider uses (see index.js),
// so its token is already populated once the user has logged in.
axiosInstance.interceptors.request.use(async (config) => {
    if (!keycloak.authenticated) {
        return config;
    }

    try {
        // Resolves immediately if the token is still valid,
        // otherwise exchanges the refresh token for a new access token.
        await keycloak.updateToken(TOKEN_MIN_VALIDITY_SECONDS);
    } catch (error) {
        // Refresh token expired or Keycloak is down: the session is over, re-login.
        await keycloak.login();
        return Promise.reject(error);
    }

    config.headers.Authorization = `Bearer ${keycloak.token}`;
    return config;
});

export default axiosInstance;
