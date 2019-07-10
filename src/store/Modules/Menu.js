import {reqGetAllMenu, reqSearchMenu} from '../../api'

const state = {
  menu: [],
  filteredMenu: []
}

const mutations = {
  updateMenu (state, menu) {
    state.menu = menu
  },

  updateFilteredMenu (state, menu) {
    state.filteredMenu = menu
  }
}

const actions = {
  getAllMenu ({commit}) {
    reqGetAllMenu().then((data) => {
      commit('updateMenu', data)
    })
  },

  searchMenu ({commit}, filter) {
    reqSearchMenu(filter).then((data) => {
      commit('updateFilteredMenu', data)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
