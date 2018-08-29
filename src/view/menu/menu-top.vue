<template>
  <Menu mode="horizontal" theme="dark" :active-name="active_name" @on-select="menuhandler" v-afterrender="menurender">
    <div class="layout-logo"></div>
    <div class="layout-nav">
      <template v-for="menu_data in menuOpt">
        <template v-if="checkchild(menu_data.children)">
          <Submenu :name="menu_data.name">
            <template slot="title">
              <Icon :type="menu_data.icon" />
              {{ menu_data.text }}
            </template>
            <template v-for="chi_data in menu_data.children">
              <MenuItem :name="chi_data.name">{{ chi_data.text }}</MenuItem>
            </template>
          </Submenu>
        </template>
        <template v-else>
          <MenuItem :name="menu_data.name" ><Icon :type="menu_data.icon" />{{ menu_data.text }}</MenuItem>
        </template>
      </template>
    </div>
  </Menu>
</template>
<script>
  export default {
    name: 'menu-top',
    data() {
      return {
        active_name: 'pic',
        actived:'',
        menuOpt:[
          {name:'pic',text:this.$t('menu_top.pic'),icon:'ios-image-outline'},
          {name:'mov',text:this.$t('menu_top.mov'),icon:'ios-film-outline'},
          {name:'label',text:this.$t('menu_top.label'),icon:'ios-card-outline'},
          {name:'DataMaintain',text:this.$t('menu_top.DataMaintain'),icon:'ios-albums-outline'}
        ]
      }
    },
    mounted(){

    },
    methods: {
      menuhandler(name) {
        if (name !== this.actived) {
          this.$router.replace('/'+name+'/');
          this.actived = name;
        }
      },
      menurender(el) {
        var name = this.$router.currentRoute.path.split('/')[1];
        this.active_name = name;
        this.actived = name;
        this.$nextTick(function(){
          this.$children[0].updateActiveName();
        })
      },
      checkchild (obj) {
        return obj !== undefined && Array.isArray(obj) && obj.length > 0
      }
    }
  }
</script>
<style scoped>
  .layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav{
    width: 600px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
