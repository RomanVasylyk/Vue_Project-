import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        favorites: [],
    }),
    actions: {
        register(name, email, password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userExists = users.find(user => user.email === email);

            if (userExists) {
                throw new Error('User already exists');
            } else {
                let newUser = { id: Date.now(), name, email, password, favorites: [] };
                users.push(newUser);
                localStorage.setItem('users', JSON.stringify(users));
                localStorage.setItem('currentUserEmail', email);

                this.user = newUser;
                localStorage.setItem('isLoggedIn', 'true');
                return true;
            }
        },
        login(email, password) {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let user = users.find(user => user.email === email && user.password === password);

            if (user) {
                localStorage.setItem('currentUserEmail', user.email);
                this.user = user;
                this.favorites = user.favorites;
                localStorage.setItem('isLoggedIn', 'true');
                return true;
            } else {
                return false;
            }
        },
        logout() {
            this.user = null;
            this.favorites = [];
            localStorage.removeItem('currentUserEmail');
            localStorage.removeItem('isLoggedIn');
        },
        addFavorite(mealId) {
            if (!this.favorites.includes(mealId)) {
                this.favorites.push(mealId);
                this.updateUserFavorites();
            }
        },
        removeFavorite(mealId) {
            this.favorites = this.favorites.filter(id => id !== mealId);
            this.updateUserFavorites();
        },
        updateUserFavorites() {
            let users = JSON.parse(localStorage.getItem('users')) || [];
            let userIndex = users.findIndex(user => user.id === this.user.id);
            if (userIndex !== -1) {
                users[userIndex].favorites = this.favorites;
                localStorage.setItem('users', JSON.stringify(users));
            }
        },
        initialize() {
            const isLoggedIn = localStorage.getItem('isLoggedIn');
            if (isLoggedIn) {
                const users = JSON.parse(localStorage.getItem('users')) || [];
                const email = localStorage.getItem('currentUserEmail');
                const user = users.find(u => u.email === email);

                if (user) {
                    this.user = user;
                    this.favorites = user.favorites || [];
                }
            }
        }
    },
});
