<template>
  <Modal v-model="showEditWin" :title="$t('base.edit')" :loading="editing" @on-ok="editPlayactor">
    <Form :model="editForm" :label-width="80" label-position="left" style="width: 95%;">
      <div style="border: 0px solid blue;">
        <i-view-upload-img ref="imgupload" style="display: inline-block;" @uploadsucc="uploadsucc"/>
        <div style="display: inline-block;vertical-align: top;width: 330px;">
          <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.name')">
            <Input v-model="editForm.name" ></Input>
          </FormItem>
          <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.type')">
            <Input v-model="editForm.type" ></Input>
          </FormItem>
          <FormItem style="margin-bottom: 5px;" :label="$t('label._playactor.point')">
            <Input v-model="editForm.point" ></Input>
          </FormItem>
        </div>
      </div>
      <Form :label-width="80" label-position="left" inline>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.face')">
          <Rate allow-half v-model="editForm.face_rate"></Rate>
        </FormItem>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.figure')">
          <Rate allow-half v-model="editForm.figure_rate"></Rate>
        </FormItem>
      </Form>
      <Form :label-width="80" label-position="left" inline>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.vagina')">
          <Rate allow-half v-model="editForm.vagina_rate"></Rate>
        </FormItem>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.breast')">
          <Rate allow-half v-model="editForm.breast_rate"></Rate>
        </FormItem>
      </Form>
    </Form>
  </Modal>
</template>

<script>
  // import iViewUploadImg from '@/components/iView-upload-img';
  export default {
    name: "editModal",
    // components:{iViewUploadImg},
    props:{
      editForm:{
        type: Object,
        default: function () {
          return {name:'',type:'',point:'',img:'',face_rate:3,figure_rate:3,vagina_rate:3,breast_rate:3};
        }
      }
    },
    data () {
      return {
        showEditWin:false,
        editing:false,
        // addForm:{
        //   name:'',type:'',point:'',face:3,figure:3,vagina:3,breast:3,img:''
        // }
      }
    },
    methods:{
      setImg (url) {
        this.$refs.imgupload.setUploadList({status:'finished',url:url});
      },
      show () {
        this.showEditWin = true;
      },
      editPlayactor () {
        this.editing = true;
        this.$sendGET('/Playactor/editPlayactor.json',this.editForm,data => {
          this.editing = false;
          this.showEditWin = false;
          // this.editForm = {id:'',name:'',type:'',point:'',img:'',face_rate:3,figure_rate:3,vagina_rate:3,breast_rate:3};
          this.$refs.imgupload.handleRemove();
          this.$Message.success(this.$t('base.savesucc'));
          this.$emit('editsucc');
        })
      },
      uploadsucc (file) {
        this.editForm.img = file[0];
      }
    }
  }
</script>

<style scoped>

</style>
