const state = {
  menus: []
}

const mutations = {
  deletemenu (state, index) {
    state.menus.splice(index, 1)
  },

  add (state, index) {
    state.menus[index].count++
    state.menus[index].money += state.menus[index].price
  },

  substract (state, index) {
    state.menus[index].count--
    state.menus[index].money -= state.menus[index].price
  },

  clearShopCart (state) {
    state.menus = []
  }
}

const actions = {
  addtocart ({state}, menu) {
    return new Promise((resolve, reject) => {
      let repeat = false
      state.menus.forEach((item) => {
        // eslint-disable-next-line no-undef
        if (menu.name === item.name) {
          // eslint-disable-next-line no-undef
          if (menu.count + item.count <= item.stock) {
            item.money += menu.money
            item.count += menu.count
          } else {
            // eslint-disable-next-line prefer-promise-reject-errors
            reject('exceed')
          }

          repeat = true
        }
      })

      if (!repeat) {
        if (menu.stock === 0) {
          // eslint-disable-next-line prefer-promise-reject-errors
          reject('exceed')
        } else {
          // eslint-disable-next-line no-undef
          state.menus.push(menu)
        }
      }

      resolve('succeed')
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
