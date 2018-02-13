// MISC
export const SOURCE = "chrome";

// API
export const BASE = process.env.NODE_ENV === "production" ? "http://solshal.com" : "http://localhost:3000";
export const BASE_API = `${BASE}/api`;

// AUTH
export const AUTHED = "AUTHED";
export const UNAUTHED = "UNAUTHED";
export const RESET_AUTH = "RESET_AUTH";

// USER
export const SET_FOLDERS = "SET_FOLDERS";

// APP
export const SET_TAB_URL = "SET_TAB_URL";
export const RESPONSE_SUCCESSFUL = "RESPONSE_SUCCESSFUL";
export const RESPONSE_FAILED = "RESPONSE_FAILED";
export const RESPONSE_WARNING = "RESPONSE_WARNING";
export const SET_NOTIFICATION = "SET_NOTIFICATION";
export const SET_LOADING = "SET_LOADING";
export const SET_OPTIONS = "SET_OPTIONS"
