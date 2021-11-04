export const state = () => ({
  authenticated: false,
  token: ''
})

export const mutations = {
  changeAuthenticated(state) {
    state.authenticated = !state.authenticated
  }
}
export const actions = {
  changeAuthenticated(context) {
    context.commit('changeAuthenticated')
  }
}
export const getters = {
  isAuthenticated: state => {
    return state.authenticated
  }
}
