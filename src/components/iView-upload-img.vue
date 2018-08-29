<template>
  <div >
  <div class="demo-upload-list" v-for="item in uploadList" :style="{width: _width+'px',height:_height+'px',lineHeight:_lineHeight+'px'}">
    <template v-if="item.status === 'finished'">
      <img :src="item.url">
      <div class="demo-upload-list-cover">
        <!--<Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>-->
        <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
      </div>
    </template>
    <template v-else>
      <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
    </template>
  </div>
  <Upload
    ref="upload" v-show="showupload"
    accept="image/*"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :max-size="2048"
    :on-exceeded-size="handleMaxSize"
    type="drag"
    :action="$vars.urlhead+'/Playactor/saveIcon.json'"
    :style="{display:'inline-block',width: _width+'px'}">
    <div :style="{width: _width+'px',height:_height+'px',lineHeight:_lineHeight+'px'}">
      <Icon type="ios-camera" size="20"></Icon>
    </div>
  </Upload>
  <!--<Modal title="查看图片" v-model="visible">-->
    <!--<img :src="imgName" v-if="visible" style="width: 100%">-->
  <!--</Modal>-->
  </div>
</template>
<script>
  export default {
    name: "iView-upload-img",
    props:{
      _width: {
        type: Number,
        default: function () {
          return 120;
        }
      },
      _height: {
        type: Number,
        default: function () {
          return 120;
        }
      },
      _lineHeight: {
        type: Number,
        default: function () {
          return 120;
        }
      }
    },
    data () {
      return {
        imgName: '',
        uploadList:[],
        showupload:true
      }
    },
    mounted () {
      this.uploadList = this.$refs.upload.fileList;
    },
    methods: {
      setUploadList (list) {
        this.$refs.upload.fileList.splice(0,1);
        this.uploadList.push(list);
        this.showupload = false;
      },
      // handleView (fileid) {
      //   this.$refs.upload.fileList
      // },
      handleRemove (file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.showupload = true
      },
      beforeUpload () {
        this.showupload = false;
      },
      handleSuccess (res, file) {
        const fileid = res.data;
        file.url = this.$vars.urlhead + '/Playactor/getTempIcon.json?filename='+fileid;
        this.$emit('uploadsucc',[fileid])
        // this.uploadList.push({url:file.url,status:'finished'})
      },
      handleError (error, file, fileList) {
        this.showupload = true;
      },
      handleMaxSize (file) {
        this.$Notice.warning({
          title: '超出文件大小限制',
          desc: '文件 ' + file.name + ' 太大，不能超过 2M。'
        });
        this.showupload = true
      }
    }
  }
</script>
<style scoped>
  .demo-upload-list{
    /*display: inline-block;*/
    /*width: 120px;*/
    /*height: 120px;*/
    text-align: center;
    /*line-height: 120px;*/
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0,0,0,.2);
    margin-right: 4px;
  }
  .demo-upload-list img{
    width: 100%;
    height: 100%;
  }
  .demo-upload-list-cover{
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0,0,0,.6);
  }
  .demo-upload-list:hover .demo-upload-list-cover{
    display: block;
  }
  .demo-upload-list-cover i{
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
