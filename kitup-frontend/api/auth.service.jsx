import {LOGIN,REGISTER, LOGOUT} from '../constants/routes';

export const authService = {
    registerUser: async (user) => {
        const response = await fetch(REGISTER, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    },
    loginUser: async (email, password) => {
        const response = await fetch(LOGIN, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        return data;
    },
    logoutUser: async () => {
        const response = await fetch(LOGOUT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    },
};