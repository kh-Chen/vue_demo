<template>
  <Row>
    <div style="text-align: right">
      <Button @click="showAddWin = true" >{{$t('base.add')}}</Button>
      <Button @click="delBtnClick" >{{$t('base.del')}}</Button>
    </div>

    <Modal v-model="showAddWin" :title="$t('base.add')" :loading="adding" @on-ok="addLabel">
      <Form :model="addFormItem" :label-width="80" style="width: 80%;">
        <FormItem :label="$t('base.name')">
          <Input v-model="addFormItem.label_name" ></Input>
        </FormItem>
        <FormItem :label="$t('base.describe')">
          <Input v-model="addFormItem.describe" ></Input>
        </FormItem>
      </Form>
    </Modal>


    <iview-modal-del ref="delmodal" centerText="" :onContinue="delLabel" />

    <i-view-table ref="table" paging="true" :url="url" :params="params" :columns="columns" />

    <Modal v-model="showEditWin" :title="$t('base.edit')" :loading="editing" @on-ok="editLabel">
      <Form :model="editFormItem" :label-width="80" style="width: 80%;">
        <FormItem :label="$t('base.name')">
          <Input v-model="editFormItem.label_name" ></Input>
        </FormItem>
        <FormItem :label="$t('base.describe')">
          <Input v-model="editFormItem.describe" ></Input>
        </FormItem>
      </Form>
    </Modal>
  </Row>
</template>

<script>
  import iViewTable from '@/components/iView-table';
  export default {
    name: "base-label-table",
    components:{iViewTable},
    props:['type'],
    data () {
      return {
        addFormItem:{
          label_name:'',
          describe:''
        },
        editFormItem:{
          id:'',
          label_name:'',
          describe:''
        },
        showAddWin:false,
        adding:true,
        showEditWin:false,
        editing:true,
        url:'/Label/getLabelList/'+this.type+'.json',
        params:{},
        columns: [
          {type:'selection', width: 50, align: 'center'},
          { title: this.$t('base.name'), minWidth: 200,key: 'label_name' },
          { title: this.$t('base.source_num'), minWidth: 200,key: 'num'},
          { title: this.$t('base.describe'), minWidth: 200,key: 'describe' },
          { title: this.$t('base.lastchangetime'), minWidth: 200,key: 'last_change_time' },
          { title: this.$t('base.action'), minWidth: 200,key: 'id',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {type: 'primary',size: 'small'},
                  on: {click: event => this.editBtnClick(event,params)}
                }, this.$t('base.edit'))
              ]);
            }
          }

        ],
      }
    },
    methods:{

      delBtnClick () {
        if(this.$refs.table.selectData.length === 0){
          this.$Message.warning(this.$t('base.noselectdata'));
          return ;
        }
        this.$refs.delmodal.show();
      },
      delLabel (fn) {
        var data = this.$refs.table.selectData;
        let ids = [];
        data.forEach(obj => {
          ids.push(obj.id);
        });
        this.$sendGET('/Label/delLabel/'+this.type+'.json',{ids:ids.join()},data => {
          this.$refs.delmodal.close()
          this.$Message.success(this.$t('base.delsucc'));
          this.$refs.table.loadData();
        })

      },
      addLabel () {
        this.adding = true;
        this.$sendGET('/Label/addLabel/'+this.type+'.json',this.addFormItem,data => {
          this.adding = false;
          this.showAddWin = false;
          this.addFormItem = {label_name:'',describe:''},
            this.$Message.success(this.$t('base.savesucc'));
          this.$refs.table.loadData();
        })
      },
      editBtnClick (event,params) {
        this.editFormItem.id = params.row.id;
        this.editFormItem.label_name = params.row.label_name;
        this.editFormItem.describe = params.row.describe;
        this.showEditWin = true;
        event.stopPropagation()
      },
      editLabel () {
        this.editing = true;
        this.$sendGET('/Label/editLabel/'+this.type+'.json',this.editFormItem,data => {
          this.editing = false;
          this.showEditWin = false;
          this.$Message.success(this.$t('base.savesucc'));
          this.$refs.table.loadData();
        })
      }
    }
  }

</script>

<style scoped>

</style>
