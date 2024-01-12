import { defineStore } from 'pinia';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        favorites: [],
        reviews: [],
        users: [],
        viewHistory: {},
        forumTopics: {},
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
                const savedViewHistory = localStorage.getItem('viewHistory');
                if (savedViewHistory) {
                    this.viewHistory = JSON.parse(savedViewHistory);
                }
                if (user) {
                    this.user = user;
                    this.favorites = user.favorites || [];
                } else {
                    localStorage.removeItem('isLoggedIn');
                    this.user = null;
                }
            }
        },

        addReview(mealId, review) {
            const newReview = {
                mealId,
                userId: this.user.id,
                comment: review.comment,
                rating: review.rating,
                date: new Date().toISOString()
            };

            this.reviews.push(newReview);
            this.saveReviewsToLocalStorage();
        },

        saveReviewsToLocalStorage() {
            localStorage.setItem('reviews', JSON.stringify(this.reviews));
        },
        loadReviewsFromLocalStorage() {
            const savedReviews = localStorage.getItem('reviews');
            if (savedReviews) {
                this.reviews = JSON.parse(savedReviews);
            }
        },
        loadUsersFromLocalStorage() {
            const savedUsers = localStorage.getItem('users');
            if (savedUsers) {
                this.users = JSON.parse(savedUsers);
            }
        },
        updateUserDetails(updatedUser) {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userIndex = users.findIndex(user => user.id === this.user.id);

            let emailInUse = users.some(user => user.email === updatedUser.email && user.id !== this.user.id);

            if (emailInUse) {
                alert('Email is already in use by another account.');
            } else {
                if (userIndex !== -1) {
                    users[userIndex] = {...users[userIndex], ...updatedUser};
                    localStorage.setItem('users', JSON.stringify(users));
                    this.user = users[userIndex];
                    alert('User data updated successfully!');
                }
            }
        },
        updateViewHistory(mealId) {
            const userId = this.user?.id;
            if (userId) {
                if (!this.viewHistory[userId]) {
                    this.viewHistory[userId] = [];
                }
                const existingIndex = this.viewHistory[userId].indexOf(mealId);
                if (existingIndex > -1) {
                    this.viewHistory[userId].splice(existingIndex, 1);
                }
                this.viewHistory[userId].unshift(mealId);
                localStorage.setItem('viewHistory', JSON.stringify(this.viewHistory));
            }
        },
        createTopic(topicId, topicTitle, topicDescription) {
            if (!this.forumTopics[topicId]) {
                this.forumTopics[topicId] = {
                    title: topicTitle,
                    description: topicDescription,
                    messages: []
                };
                this.saveForumTopicsToLocalStorage();
            }
        },

        addMessageToTopic(topicId, message) {
            if (!this.user) {
                console.error("User not logged in or not found");
                return;
            }
            if (!this.forumTopics[topicId]) {
                console.error(`Topic with ID ${topicId} not found`);
                return;
            }
            this.forumTopics[topicId].messages.push({
                userId: this.user.id,
                content: message,
                date: new Date().toISOString()
            });
            this.saveForumTopicsToLocalStorage();
        },

        saveForumTopicsToLocalStorage() {
            localStorage.setItem('forumTopics', JSON.stringify(this.forumTopics));
        },

        loadForumTopicsFromLocalStorage() {
            const savedTopics = localStorage.getItem('forumTopics');
            if (savedTopics) {
                this.forumTopics = JSON.parse(savedTopics);
            }
        },

    },
});
