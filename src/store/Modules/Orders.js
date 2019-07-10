import {reqGetOrder, reqGetAllOrder, reqSearchOrder} from '../../api'

const state = {
  orders: [],
  filteredOrders: []
}

const mutations = {
  updateOrder (state, orders) {
    state.orders = orders
  }
}

const actions = {
  getOrder ({commit}, account) {
    reqGetOrder(account).then((data) => {
      const orders = []
      for (let items of data) {
        const order = []
        for (let item of items) {
          // eslint-disable-next-line no-unused-vars
          const menu = {
            name: item.menuid,
            count: item.count,
            price: item.price,
            total: item.price * item.count,
            picture: item.picture,
            userName: item.userName,
            date: item.date
          }
          order.push(menu)
        }
        orders.push(order)
      }
      commit('updateOrder', orders)
    })
  },

  getAllOrder ({commit}) {
    reqGetAllOrder().then((data) => {
      const orders = []
      for (let items of data.orders) {
        const order = []
        for (let item of items) {
          const menu = {
            name: item.menuid,
            count: item.count,
            price: item.price,
            total: item.price * item.count,
            picture: item.picture,
            userName: item.userName,
            date: item.date
          }
          order.push(menu)
        }
        orders.push(order)
      }
      commit('updateOrder', orders)
    })
  },

  searchOrder ({commit}, filter) {
    reqSearchOrder(filter).then((data) => {
      const orders = []
      for (let items of data.orders) {
        const order = []
        for (let item of items) {
          const menu = {
            name: item.menuid,
            count: item.count,
            price: item.price,
            total: item.price * item.count,
            picture: item.picture,
            userName: item.userName,
            date: item.date
          }
          order.push(menu)
        }
        orders.push(order)
      }
      commit('updateOrder', orders)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
