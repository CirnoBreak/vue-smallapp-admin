import { reqLogin } from '../api'
import { getToken, setToken, removeToken } from '../auth'
const user = {
  state: {
    token: getToken(),
    name: ''
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
  },
  actions: {
    Login({commit}, userInfo) {
      return new Promise((resolve, reject) => {
        reqLogin(userInfo).then(response => {
          setToken(response.token)
          commit('SET_TOKEN', response.token)
          resolve()
        }).catch(error => {
          console.log('sb')
          reject(error)
        })
      })
    }
  }
}

export default user