<template>
  <Breadcrumb :style="{margin: '20px 0'}">
    <BreadcrumbItem v-for="(path,index) in paths" :key="index">{{path}}</BreadcrumbItem>
  </Breadcrumb>
</template>
<script>
  export default {
    name:'breadcrumb-iview',

    data () {
      return {
        paths:['内容管理'],
      }
    },
    methods:{
      go (name) {
        this.paths = name.split('/');
      },
      back (num) {
        this.paths = this.paths.slice(0,this.paths.length-(num+1));
      }
    }

  }
</script>


