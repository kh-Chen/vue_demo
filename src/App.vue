<template>
  <div class="layout layout-con">
    <Layout class="layout-con">
      <Header >
        <menu-top />
      </Header>
      <Layout class="layout-con" :style="{padding: '0 50px' }">
        <router-view></router-view>
      </Layout>
      <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
    </Layout>
  </div>
</template>

<script>
  import menuTop from '@/view/menu/menu-top';
  export default {
    name: "App",
    components:{menuTop},
  }
</script>

<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-con{
    height: 100%;
    width: 100%;
    background: #f5f7f9;
  }
  .layout-footer-center{
    text-align: center;
    background: #f5f7f9;
  }
</style>
