import Vue from 'vue';
import Router from 'vue-router';
import viewContent from '../view/view-content';
import i18n from '../lang-i18n';

Vue.use(Router);

// console.log(Vue.prototype.$t('menu_left.newSource'));
// console.log(i18n.t('menu_left.newSource'))
// console.log(Vue.prototype.$getText('menu_left.newSource'))

const picmenu = [
  {name:'pic_title1',text:'pic_title1',children:[
      {name:'pic_content1',text:'table',path:'components/iView-table-pic'},
      {name:'pic_content2',text:'pic_content2',path:'components/iView-collapse'}
    ]},
  {name:'pic_title2',text:'pic_title2',children:[
      {name:'pic_content3',text:'pic_content3',path:'components/iView-card'},
      {name:'pic_content4',text:'pic_content4',path:'components/iView-collapse'}
    ]}
];

const movmenu = [
  {name:'mov_title1',text:'mov_title1',children:[
      {name:'mov_content1',text:'mov_content1',path:'components/iView-collapse'},
      {name:'mov_content2',text:'mov_content2',path:'components/iView-card'}
    ]},
  {name:'mov_title2',text:'mov_title2',path:'components/iView-card'}
];

const labelmenu = [
  {name:'display',text:i18n.t('menu_left.display'),children:[
      {name:'distributor',text:i18n.t('label.distributor'),path:'view/label/baseLabel/distributor'},
      {name:'location',text:i18n.t('label.location'),path:'view/label/baseLabel/location'},
      {name:'type',text:i18n.t('label.type'),path:'view/label/baseLabel/type'}
    ]},
  {name:'highgrade',text:i18n.t('menu_left.highgrade'),children:[
      {name:'playactor',text:i18n.t('menu_left.playactor'),path:'view/label/highgrade/playactorView'},
  ]}
];
// import '../view/label/distributor/listTable'
const DataMaintainmenu = [
  {name:'sourceMgr',text:i18n.t('menu_left.sourceMgr'),children:[
      {name:'newMov',text:i18n.t('menu_left.newmov'),path:'view/dataMaintain/mov/newmov/fileTree'},
      {name:'movInfo',text:i18n.t('menu_left.movInfo'),path:'view/dataMaintain/mov/movInfo/movtable'}
    ]},
  {name:'highgrade',text:i18n.t('menu_left.highgrade'),children:[
      {name:'taskmanage',text:i18n.t('menu_left.taskManage'),path:'view/dataMaintain/taskManage/taskTable'}
    ]}
];

const menu_config=[
  {name:'pic',data:picmenu},
  {name:'mov',data:movmenu},
  {name:'label',data:labelmenu},
  {name:'DataMaintain',data:DataMaintainmenu}
];

const coverRouteObj = (name,path) => {
  let obj = {};
  obj.path = name;
  // obj.component = resolve => require(['@/'+path], resolve);
  obj.component = () => import('@/'+path);
  return obj;
};

const createrouterClild = _menu_config => {
  let re = [];
  for( let menu of _menu_config){
    for( let menuitem of menu.data){
      let haschildren = menuitem.children !== undefined && Array.isArray(menuitem.children) && menuitem.children.length > 0;
      if(haschildren){
        for(let child of menuitem.children){
          re.push(coverRouteObj(child.name,child.path));
        }
      }else{
        re.push(coverRouteObj(menuitem.name,menuitem.path));
      }
    }
  }
  return re;
};

const picCon = Vue.extend({
  components: { viewContent },
  template:'<view-content :menu_config="menu_config" />',
  data () {
    return {
      menu_config:menu_config
    }
  },

});
const routes = [
  {
    path: '/:mod',
    component: picCon,
    children: createrouterClild(menu_config)
  }
];

const router = new Router({
  routes // （缩写）相当于 routes: routes
});

router.beforeEach((to, from, next) => {
// alert(to.fullPath);
  if(to.fullPath === '/'){
    next({
      path: '/'+menu_config[0].name+'/',
    });
  }else if(to.fullPath.endsWith('/') && to.fullPath.split('/').length === 3){
    let name = to.fullPath.split('/')[1];
    let menu = {};
    for(let val of menu_config){
      if(val.name === name){
        menu = val.data[0];
        break;
      }
    }
    let haschild = menu.children !== undefined && Array.isArray(menu.children) && menu.children.length > 0;
    next({
      path: to.fullPath + ( haschild ? menu.children[0].name : menu.name )
    })
  }else{
    next();
  }
});
export default {
  getRouter:function(){
    return router;
  }
}
