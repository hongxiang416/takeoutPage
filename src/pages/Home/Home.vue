<template>
  <div class="container-fluid py-5 home"  lazy="loaded">
    <div class="row justify-content-center py-5">
      <div class="text-center col-md-12">
        <div class="title">顺风外卖系统</div>
        <div class="subtitle mb-5">线上订餐管理系统</div>
        <div class="text">你所想要的 都是我们所努力的</div>
      </div>
      <div class="mt-4">
        <button class="btn btn-primary" @click="$router.push('/menu')">立即开始探索</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      imgUrl: '../../public/images/home.png'
    }
  }
}
</script>

<style scoped>
  .title{
    font-family: Calibri;
    font: 72px bold;
  }
  .subtitle{
    font-size: 16px;
    font-family: 等线;
  }
  .text{
    font-size: 20px;
  }
  .home[lazy=loaded]{
    height: 1080px;
    background:url('../../../public/images/home.png');
    width: 1920px;
    background-size:cover;
  }
</style>
