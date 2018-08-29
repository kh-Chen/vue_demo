<template>
  <Modal v-model="showWin" width="360">
    <p slot="header" style="color:#f60;text-align:center">
      <Icon type="ios-information-circle"></Icon>
      <span>{{$t('base.delconfirm')}}</span>
    </p>
    <div style="text-align:center">
      <p v-if="centerText != ''">{{centerText}}</p>
      <p>{{$t('base.continuedel')}}</p>
    </div>
    <div slot="footer">
      <Button type="error" size="large" long :loading="loading" @click="del">{{$t('base.del')}}</Button>
    </div>
  </Modal>
</template>

<script>
    export default {
      name: "iView-modal-del",
      props:['centerText','onContinue'],
      data () {
        return {
          showWin:false,
          loading:false,
          param:{}
        }
      },
      methods: {
        del () {
          this.loading = true;
          this.onContinue(this.param);
        },
        show (obj) {
          this.showWin = true;
          this.param = obj;
        },
        close () {
          this.loading = false;
          this.showWin = false;
        }
      }
    }
</script>

<style scoped>

</style>
