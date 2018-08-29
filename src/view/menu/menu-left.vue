<template>
  <Menu :active-name="menu_active_name" :open-names="menu_open_names" theme="light" width="auto"  @on-select="menuhandler" >
    <template v-for="menu_data in menu_datas">
      <template v-if="checkchild(menu_data.children)">
        <Submenu :name="menu_data.name">
          <template slot="title">
            <Icon type="ios-navigate"></Icon>
            {{ menu_data.text }}
          </template>
          <template v-for="chi_data in menu_data.children">
            <MenuItem :name="chi_data.name">{{ chi_data.text }}</MenuItem>
          </template>
        </Submenu>
      </template>
      <template v-else>
        <MenuItem :name="menu_data.name">{{ menu_data.text }}</MenuItem>
      </template>
    </template>
  </Menu>
</template>

<script>
    export default {
      name: "content-menu",
      props:{
        menu_datas:{
          type:Array,
          required: true
        },
        menu_open_names:Array,
        menu_active_name:String,
      },
      methods:{
        menuhandler(name) {
          this.$router.replace('./'+name);
        },
        checkchild (obj) {
          return obj !== undefined && Array.isArray(obj) && obj.length > 0
        }
      },
      watch:{
        menu_active_name:function(val , oldval){
          this.$nextTick(function(){
            this.$children[0].updateOpened();
            this.$children[0].updateActiveName();
          })
        }
      }
    }
</script>

<style scoped>

</style>
