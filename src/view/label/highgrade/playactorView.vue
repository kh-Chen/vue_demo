<template>
  <Row style="border: 0px solid green;height: 90%">
    <Button @click="$refs.addModal.show()">{{$t('base.add')}}</Button>
    <add-modal @addsucc="addsucc" ref="addModal"/>
    <edit-modal @editsucc="editsucc" :editForm="editForm" ref="editModal"/>
    <div style="border: 1px solid #ddd ; height: 90%; overflow-x: hidden; overflow-y: auto">
      <transition :name="name" @after-leave="afterLeave">
        <div v-show="show" style="border: 0px solid red ;">
            <i-view-card v-for="(field,index) in fields" style="display: inline-block"
                         @btn1click="editbtnclick" @btn2click="delbtnclick"
                         :btn1Text="$t('base.edit')" :btn2Text="$t('base.del')"
                         :key="index" :index="index" :cardid="field.id" :title="field.title" :imgPath="field.imgPath" :fields="field.field"/>
        </div>
      </transition>
      <Spin size="large" v-if="loading"></Spin>
    </div>
    <Page transfer show-sizer show-total style="float: right;margin: 5px 5px 0px 0px"
          :total="total" :page-size="pageSize"
          @on-change="pageChange" @on-page-size-change="pageSizeChange" />
  </Row>
</template>
<script>
  import iViewCard from '@/components/iView-card';
  import addModal from './playactor/addModal';
  import editModal from './playactor/editModal';
  export default {
    name: "playactorView",
    components:{iViewCard,addModal,editModal},
    data () {
      return {
        fields:[],
        tempfields:[],
        fieldsData:[],
        editForm:{},
        total:0,
        pageSize:10,
        showPage:1,
        loading:false,
        changing:false,
        show:true,
        name:'fade1',
      }
    },
    mounted () {
      this.loadData();
    },
    methods: {
      addsucc () {
        this.loadData();
      },
      editsucc () {
        this.loadData();
      },
      loadData () {
        let params = {paging:true,showpage:this.showPage,pageSize:this.pageSize};
        this.loading = true;
        this.$sendGET('/Playactor/getPlayactorList.json',params,obj => {
          this.fieldsData = obj.data;
          let f = [];
          obj.data.forEach( item => {

            let field = [];
            let o = {};
            o.text = this.$t('label._playactor.type');
            o.rate = false;
            o.value = item.type;
            field.push(o);
            o = {};
            o.text = this.$t('label._playactor.face');
            o.rate = true;
            o.value = Number(item.face_rate);
            field.push(o);
            o = {};
            o.text = this.$t('label._playactor.figure');
            o.rate = true;
            o.value = Number(item.figure_rate);
            field.push(o);
            o = {};
            o.text = this.$t('label._playactor.vagina');
            o.rate = true;
            o.value = Number(item.vagina_rate);
            field.push(o);
            o = {};
            o.text = this.$t('label._playactor.breast');
            o.rate = true;
            o.value = Number(item.breast_rate);
            field.push(o);
            o = {};
            o.id = item.id;
            o.title = item.name;
            o.imgPath = this.$vars.urlhead+'/Playactor/getImg.json?id='+item.id;
            o.field = field;
            f.push(o);
          })


          this.total = obj.total;
          this.loading = false;
          if(!this.changing){
            this.fields = f;
            this.show = true;
          }else{
            this.tempfields = f;
          }
        })
      },
      pageChange (num) {
        this.changing = true;
        if(this.showPage < num){
          this.name = 'fade2';
          this.show = false;
        }else{
          this.name = 'fade1';
          this.show = false;
        }
        this.showPage = num;
        this.loadData();
      },
      pageSizeChange (num) {
        this.changing = true;
        this.name = 'fade1';
        this.show = false;
        this.loadData();
      },
      afterLeave (el) {
        setTimeout(()=>{
          this.changing = false;
          if(!this.loading){
            this.show = true;
            this.fields = [...this.tempfields];
          }

        },100)
      },
      editbtnclick (id) {
        this.editForm = this.fieldsData[id[1]];
        this.$refs.editModal.setImg( this.$vars.urlhead+'/Playactor/getImg.json?id='+this.editForm.id);
        this.$refs.editModal.show();
      },
      delbtnclick (id) {
        this.$sendGET('/Playactor/delPlayactor.json',{id:id[0]},data => {
          this.loadData();
        })
      },
    }

  }
</script>
<style scoped>
  .fade1-enter-active,.fade1-leave-active,.fade2-enter-active,.fade2-leave-active  {
    transition: all .3s cubic-bezier(.25,.01,.25,1)
  }
  .fade1-enter,.fade2-leave-to{
    transform: translateX(-300px);
    opacity: 0
  }
  .fade2-enter,.fade1-leave-to {
    transform: translateX(300px);
    opacity: 0
  }
</style>
