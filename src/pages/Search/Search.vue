<template>
  <div class="container-fluid">
    <div class="mt-5">
      菜品搜索
    </div>
    <div class="row mt-5">
      <div class="mt-2">
        <i class="iconfont icon-sousuo col-md-9"></i>
      </div>
      <input placeholder="输入菜品名" type="text" class="form-control col-md-10" v-model="filter">
      <button class="btn btn-primary btn-block ml-2 col-md-1" @click="searchMenu">搜索</button>
    </div>
    <div v-show="!init">
      <ul class="mt-5" v-show="menus !==undefined && menus.length > 0">
        <li v-for="(menu, index) in menus" :key="index" class="list-unstyled mb-5">
          <Menu :menu="menu" :index="index"></Menu>
        </li>
      </ul>
      <div v-show="menus !== undefined && menus.length === 0" class="container mt-5">
        <div class="row">
          <div style="font-family: 等线" v-show="!init">
            暂时没有您要搜索的菜品~
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
// eslint-disable-next-line no-unused-vars
import Menu from '../../components/Menu/Menu'
export default {
  name: 'Search',
  components: {
    // eslint-disable-next-line no-undef
    Menu
  },
  mounted () {
    this.filter = ''
    this.$store.dispatch('menu/search', this.filter)
    this.init = true
  },
  data () {
    return {
      filter: '',
      init: true
    }
  },
  computed: {
    ...mapState({
      menus: state => state.Menu.filteredMenu
    })
  },
  methods: {
    searchMenu () {
      this.$store.dispatch('menu/search', this.filter)
      this.init = false
    }
  }
}
</script>

<style scoped>
</style>
