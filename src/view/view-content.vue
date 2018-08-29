<template>
  <Layout :style="{padding: '24px 0 0 0', minHeight: '280px', background: '#f5f7f9'}">
    <Sider hide-trigger class="borderR" :style="{background: '#fff'}">
      <menu-left :menu_datas="menu_datas" :menu_open_names="menu_open_names" :menu_active_name="menu_active_name"/>
    </Sider>
    <Content :style="{padding: '24px 24px 0px 24px', minHeight: '280px', background: '#fff', border:'1px solid #d7dde4'}">
      <router-view></router-view>
    </Content>
  </Layout>
</template>

<script>
  import menuLeft from './menu/menu-left';
  export default {
    name: "view-content",
    components:{menuLeft},
    data  () {
      return {
        menu_datas:[],
        menu_open_names:[],
        menu_active_name:'',
        topMenuName:''
      }
    },
    props:{
      menu_config:Array,
    },
    mounted () {
      var names = this.$router.currentRoute.path.split('/');
      var menu = [];
      for( let valu of this.menu_config ){
        if(valu.name === names[1]){
          menu = valu.data;
          break;
        }
      }
      this.menu_datas = menu;

      for(let item of menu){
        let haschildren = item.children !== undefined && Array.isArray(item.children) && item.children.length > 0;
        if(haschildren){
          if(item.children.some(child =>{
            if(child.name === names[2]){
              this.menu_active_name = child.name;
              this.menu_open_names = [item.name];
              return true;
            }
          })){
            break;
          }
        }else{
          if(item.name === names[2]){
            this.menu_active_name = item.name;
            this.menu_open_names = [];
            break;
          }
        }
      }

      this.topMenuName = names[1];
    },
    watch: {
      '$route' (to, _from) {
        if(this.topMenuName !== to.params.mod){
          let menu = [];
          for(let val of this.menu_config){
            if(val.name === to.params.mod){
              menu = val.data;
              break;
            }
          }

          let obj = menu[0].children;
          let haschildren = obj !== undefined && Array.isArray(obj) && obj.length > 0;
          this.menu_datas = menu;
          this.menu_active_name = haschildren ? obj[0].name : menu[0].name ;
          this.menu_open_names = haschildren ? [menu[0].name] : [];
          this.topMenuName = to.params.mod;
        }
      }
    }
  }
</script>

<style scoped>
.borderR{
  border: 1px solid #d7dde4;
  border-right-width: 0;
  min-height: auto;
}
</style>
