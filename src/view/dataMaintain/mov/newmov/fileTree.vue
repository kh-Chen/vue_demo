<template>
  <div style="width: 100%;height: 100%;border: 0 solid blue;display: flex">
    <div style="width: 100%;height:100%;border: 0 solid red;">
      <Breadcrumb>
        <BreadcrumbItem v-for="(path,index) in BreadcrumbPath.split('\\')" :key="index">{{path}}</BreadcrumbItem>
      </Breadcrumb>
      <div style="overflow-x:hidden; overflow-y:auto; width: 100%;height:97%;border-top: 2px solid #c7ccd4;">
        <Tree style="border: 0 solid blue;" :data="data5" :render="renderContent" :load-data="loadData" ></Tree>
      </div>
    </div>
    <div  style="border: 0 solid red;width: 35%"><!--v-if="filepath !== ''"-->
      <infoForm :filepath="filepath" @submit="hideform"></infoForm>
    </div>
  </div>
</template>
<script>
  import infoForm from './infoForm'
  export default {
    name: "iView_filetree_mov",
    components:{infoForm},
    data() {
      return {
        data5: [],
        filepath:'',
        BreadcrumbPath:'/',
        videosrc:''
      }
    },
    mounted () {
      this.getdata({}).then(data => {
        this.data5 = data
      })
    },
    methods: {
      getdata (item) {
        return new Promise((resolve, reject) => {
          this.$sendGET('/DataMaintain/getFileSystemMenu', item, obj => {
            resolve(obj);
            // this.data5 = obj
          });
        })
      },
      loadData (item, callback) {
        this.getdata({fatherPath:item.absolutePath}).then(data => {
          callback(data);
        })
      },
      expandnode(data) {
        if(data.expand){
          this.$set(data, 'expand', false);
        }else{
          this.BreadcrumbPath = data.absolutePath;
          let children = data.children ;
          if(children === undefined){
            return ;
          }
          if(children.length>0){
            this.$set(data, 'expand', true);
          }else{
            this.$set(data, 'loading', true);
            this.$set(data, 'expand', true);
            this.getdata({fatherPath:data.absolutePath}).then(data1 => {
              this.$set(data, 'children', data1);
              this.$set(data, 'loading', false);
            })

          }
        }
      },
      hideform () {
        this.filepath = '';
      },
      test(data){
        // console.log(data.type);
        this.filepath = data.absolutePath;
        // this.videosrc = this.$vars.urlhead + '/' + data.absolutePath.replace(":","").replace(new RegExp('\\\\','g'),"/");

      },
      // append (data) {
      //   const children = data.children || [];
      //   children.push({
      //     title: 'appended node',
      //     expand: true
      //   });
      //   this.$set(data, 'children', children);
      //   this.$set(data, 'expand', !data.expand);
      // },

      // remove(root, node, data) {
      //   const parentKey = root.find(el => el === node).parent;
      //   const parent = root.find(el => el.nodeKey === parentKey).node;
      //   const index = parent.children.indexOf(data);
      //   parent.children.splice(index, 1);
      // },

      renderContent(h, {root, node, data}) {

        const btn = h('Button', {
          // props: Object.assign({}, this.buttonProps, {icon: 'ios-arrow-forward'}),
          props: {icon: 'ios-arrow-forward',type: 'default',size:'small'},
          style: {margin:'0px 5px 0px 5px'},
          on: {click: () => {this.test(data)}}
        });

        let geticon = data =>{
          let icon = '';
          let type = data.type;
          switch(type){
            case 'folder':icon = 'ios-folder-outline';break;
            case 'video':icon = 'md-film';break;
            case 'picture':icon = 'md-image';break;
            case 'document':icon = 'md-list-box';break;
            default:icon = 'md-document';break;
          }

          return icon
        };

        return h('span', {
          style: {display: 'inline-block',width: '99%', padding: '0px 0px 3px 0px',borderColor: '#d7dde4', borderWidth: '0px 0px 1px 0px',borderStyle: 'solid'},
          on:{click: () => {this.expandnode(data)}}
        }, [
          h('span', {style: {margin:'5px 0px 0px 0px'}},[
            h('Icon', {props: {type: geticon(data),size:20},style: {margin:'0px 5px 5px 5px'}}),
            h('font', {style:{fontSize:'15px'}},data.title)
          ]),
          h('span', {style: {display: 'inline-block',float: 'right',marginRight: '32px'}}, data.children ? [] : [btn])
        ]);
      }
    }
  }
</script>
<style scoped>

</style>
