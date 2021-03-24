import { testToken } from "./api";

export const getLocalToken = () => localStorage.getItem("token");

export const saveLocalToken = (token) => localStorage.setItem("token", token);

export const deleteLocalToken = () => localStorage.removeItem("token");

export const saveLocalUsername = (username) =>
    localStorage.setItem("username", username);

export const getLocalUsername = () => localStorage.getItem("username");

export const isLoggedIn = async () => {
    if (getLocalToken() === null) return false;
    return await testToken();
};

export const bigScreenMediaQuery = window.matchMedia("(min-width: 640px)");
