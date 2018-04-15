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
          console.log(response.user)
          commit('SET_NAME', response.user.name)
          // const { user, token, code } = response
          // if (code === 200) {
          //   setToken(token)
          //   commit('SET_TOKEN', response.token)
          //   localStorage.setItem('name', user.name)
          // }
          // console.log(response)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    
    Logout() {}
  }
}

export default user