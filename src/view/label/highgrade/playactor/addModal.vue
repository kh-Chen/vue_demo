<template>
  <Modal v-model="showAddWin" :title="$t('base.add')" :loading="adding" @on-ok="addPlayactor">
    <Form :model="addForm" :label-width="80" label-position="left" style="width: 95%;">
      <div style="border: 0px solid blue;">
        <i-view-upload-img ref="imgupload" style="display: inline-block;" @uploadsucc="uploadsucc"/>
        <div style="display: inline-block;vertical-align: top;width: 330px;">
          <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.name')">
            <Input v-model="addForm.name" ></Input>
          </FormItem>
          <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.type')">
            <Input v-model="addForm.type" ></Input>
          </FormItem>
          <FormItem style="margin-bottom: 5px;" :label="$t('label._playactor.point')">
            <Input v-model="addForm.point" ></Input>
          </FormItem>
        </div>
      </div>
      <Form :label-width="80" label-position="left" inline>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.face')">
          <Rate allow-half v-model="addForm.face_rate"></Rate>
        </FormItem>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.figure')">
          <Rate allow-half v-model="addForm.figure_rate"></Rate>
        </FormItem>
      </Form>
      <Form :label-width="80" label-position="left" inline>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.vagina')">
          <Rate allow-half v-model="addForm.vagina_rate"></Rate>
        </FormItem>
        <FormItem style="margin-bottom: 10px;" :label="$t('label._playactor.breast')">
          <Rate allow-half v-model="addForm.breast_rate"></Rate>
        </FormItem>
      </Form>
    </Form>
  </Modal>
</template>

<script>
  // import iViewUploadImg from '@/components/iView-upload-img';
    export default {
      name: "addModal",
      // components:{iViewUploadImg},
      props:[''],
      data () {
        return {
          showAddWin:false,
          adding:false,
          addForm:{
            name:'',type:'',point:'',face_rate:3,figure_rate:3,vagina_rate:3,breast_rate:3,img:''
          }
        }
      },
      methods:{
        show () {
          this.showAddWin = true;
        },
        addPlayactor () {
          this.adding = true;
          this.$sendGET('/Playactor/addPlayactor.json',this.addForm,data => {
            this.adding = false;
            this.showAddWin = false;
            this.addForm = {name:'',type:'',point:'',img:'',face_rate:3,figure_rate:3,vagina_rate:3,breast_rate:3};
            this.$refs.imgupload.handleRemove();
            this.$Message.success(this.$t('base.savesucc'));
            this.$emit('addsucc');
          })
        },
        uploadsucc (file) {
          this.addForm.img = file[0];
        }
      }
    }
</script>

<style scoped>

</style>
