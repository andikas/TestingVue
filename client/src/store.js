import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)



export default new Vuex.Store({
	state: {
  		status: '',
  		token: localStorage.getItem('token') || '',
  		user : {}
	},
	mutations: {
		auth_request(state){
	    	state.status = 'loading'
	  	},
	  	auth_success(state, token, user){
		    state.status = 'success'
		    state.token = token
		    state.user = user
	  	},
	  	auth_error(state){
	    	state.status = 'error'
	  	},
	  	logout(state){
	    	state.status = ''
	    	state.token = ''
	  	},
	},
	actions: {
		login({commit}, user){
			var data = {'username' : user.username};

	        return new Promise((resolve, reject) => {
				commit('auth_request')
				axios({url: 'http://localhost:4000/api/getUserSalt', data, method: 'POST' })
	            .then(response => {
					
						let firstHashedPassword = sjcl.hash.sha256.hash(user.password);
						firstHashedPassword = sjcl.codec.hex.fromBits(firstHashedPassword);
						let fixPassword = sjcl.hash.sha256.hash(firstHashedPassword + response.data.salt);
						fixPassword = sjcl.codec.hex.fromBits(fixPassword);
						data.password = fixPassword;
						axios({url: 'http://localhost:4000/api/login', data, method: 'POST' }).then(response => {
							const token = response.data.token
	                const user = response.data.user
							localStorage.setItem('token', token)
							// Add the following line:
							axios.defaults.headers.common['Authorization'] = token
							commit('auth_success', token, user)
							resolve(response)
						});
					})
	            .catch(err => {
	                commit('auth_error')
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },	
	    register({commit}, user){
			var data = {'username' : user.username};
			
	    	return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/user', data, method: 'POST' }).then(response => {
					let firstHashedPassword = sjcl.hash.sha256.hash(user.password);
					firstHashedPassword = sjcl.codec.hex.fromBits(firstHashedPassword);
					let fixPassword = sjcl.hash.sha256.hash(firstHashedPassword + response.data);
					fixPassword = sjcl.codec.hex.fromBits(fixPassword);
					data.password = fixPassword;
					axios({url: 'http://localhost:4000/api/user/update', data, method: 'POST' }).then(response => {
						commit('auth_success')
	                	resolve(response)
					});
	            })
	            .catch(err => {
	                commit('auth_error', err)
	                localStorage.removeItem('token')
	                reject(err)
	            })
	        })
	    },
		logout({commit}){
		    return new Promise((resolve, reject) => {
		      	commit('logout')
		      	localStorage.removeItem('token')
		      	delete axios.defaults.headers.common['Authorization']
		      	resolve()
		    })
		},
		getAllData({commit}, type){

			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/'+type, method: 'GET', headers: {Authorization: localStorage.getItem('token')}}).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
		addNewData({commit}, data){
			return new Promise((resolve, reject) => {
				axios({url: 'http://localhost:4000/api/'+data.type, data, method: 'POST', headers: {Authorization: localStorage.getItem('token')}}).then(response => {
					resolve(response)
	            })
	            .catch(err => {
	                reject(err)
				});
			});
		},
		saveAllCategory({commit}, data){

			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/category/updateAll', data, method: 'POST' }).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
		getBookData({commit}, data){

			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/book/'+data, method: 'GET' }).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
		updateBookData({commit}, data){
			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/book/update/'+data.form.book._id, data, method: 'POST' }).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
		deleteBook({commit}, data){
			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/book/delete/'+data, method: 'DELETE' }).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
		searchBook({commit}, data){
			return new Promise((resolve, reject) => {
	            commit('auth_request')
	            axios({url: 'http://localhost:4000/api/book/search/', data, method: 'POST', headers: {Authorization: localStorage.getItem('token')}}).then(response => {
	                resolve(response)
	            })
	            .catch(err => {
	                reject(err)
	            })
	        })
		},
	},
	getters : {
		isLoggedIn: state => !!state.token,
		authStatus: state => state.status,
	}
})
