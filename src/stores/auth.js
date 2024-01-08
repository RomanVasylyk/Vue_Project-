
import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
    }),
    actions: {
        register(name, email, password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userExists = users.find(user => user.email === email);

            if (userExists) {
                throw new Error('User already exists');
            } else {
                let newUser = { id: Date.now(), name, email, password };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                this.user = newUser;
                localStorage.setItem('isLoggedIn', 'true');
                return true;
            }
        },
        login(email, password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                this.user = user;
                localStorage.setItem('isLoggedIn', 'true');
                return true;
            } else {
                return false;
            }
        },
        logout() {
            this.user = null;
            localStorage.removeItem('isLoggedIn');
        },
    },
});
