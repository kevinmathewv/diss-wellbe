import axios from 'axios'
import router from '@/router'

const state = {
	username: null,
	token: null,
};

const mutations = {
	authUser(state, userData) {
		state.username = userData.username;
		state.token = userData.token;
	},
	clearAuthData(state) {
		state.username = null;
		state.token = null;
	},
};

const getters = {
	isAuthenticated(state) {
		return state.token !== null;
	},
};

const actions = {
	login: ({commit}, authData) => {
		return new Promise((resolve, reject) => {
		axios.post('http://localhost:5000/api/login', {
			email: authData.email,
			password: authData.password,
		}).then(response => {
			let success = response.data.success;

			if (success === true) {
				commit('authUser', { username: response.data.username, token: response.data.token });
				localStorage.setItem('token', response.data.token);
				localStorage.setItem('username', response.data.username);
				router.replace({ path: '/dashboard' });
				resolve("success")
			} 
			else {
				reject("Internal Error Occured!")

			}
		}).catch(error => {
			reject(error.response.data)
		})})
	},
	autoLogin({commit}) {
		let token = localStorage.getItem('token');
		let username = localStorage.getItem('username');

		if (!token || !username) {
			return;
		}

		commit('authUser', { username: username, token: token });
	},
	logout: ({commit}) => {
		commit('clearAuthData');
		localStorage.removeItem('username');
		localStorage.removeItem('token');
		router.replace({ path: '/login' });
	},
};

export default {
	namespaced: true,
	state,
	mutations,
	getters,
	actions,
}