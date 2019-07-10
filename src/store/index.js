import Vue from 'vue'
import Vuex from 'vuex'
import ShopCart from './modules/ShopCart'
import Person from './modules/Person'
import Menu from './modules/Menu'
import Orders from './modules/Orders'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ShopCart,
    Person,
    Menu,
    Orders
  }

})
