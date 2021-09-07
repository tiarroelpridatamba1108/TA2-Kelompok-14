import axios from 'axios';

export function setHeaderToken(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
}

export function removeHeaderToken() {
  delete axios.defaults.headers.common['Authorization'];
}

export default {
  state: {
    user: null,
    isLoggedIn: false,
  },
  mutations: {
    set_user(state, data) {
      state.user = data;
      state.isLoggedIn = true;
    },
    reset_user(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  getters: {
    isLoggedIn(state) {
      return state.isLoggedIn;
    },
    user(state) {
      return state.user;
    },
  },
  actions: {
    login({ dispatch, commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/login', data)
          .then((response) => {
            const token = response.data.jwt;
            localStorage.setItem('token', token);
            setHeaderToken(token);
            dispatch('get_user');
            resolve(response.data);
          })
          .catch((err) => {
            commit('reset_user');
            localStorage.removeItem('token');
            reject(err);
          });
      });
    },
    async get_user({ commit }) {
      if (!localStorage.getItem('token')) {
        return;
      }
      try {
        await axios.get('/admin/').then((response) => {
          commit('set_user', response.data);
        });
      } catch (error) {
        commit('reset_user');
        removeHeaderToken();
        localStorage.removeItem('token');
        return error;
      }
    },
    register({ commit }, data) {
      return new Promise((resolve, reject) => {
        axios
          .post('/signup', data)
          .then((resp) => {
            resolve(resp);
          })
          .catch((err) => {
            commit('reset_user');
            reject(err);
          });
      });
    },
    logout({ commit }) {
      return new Promise((resolve) => {
        commit('reset_user');
        localStorage.removeItem('token');
        removeHeaderToken();
        resolve();
      });
    },
  },
};
