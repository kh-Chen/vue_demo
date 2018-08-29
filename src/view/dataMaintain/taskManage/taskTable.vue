<template>
  <div>
  <i-view-table ref="table" paging="false" :url="url" :params="params" :columns="columns" />
  <iview-modal-del ref="delmodal" centerText="" :onContinue="delTask" />
  </div>
</template>

<script>
    import iViewTable from '@/components/iView-table';
    export default {
      name: "taskTable",
      components:{iViewTable},
      data () {
        return {
          url:'/FFmpegTask//getList.json',
          params:{},
          columns: [
            {type:'selection', width: 50, align: 'center',fixed: 'left'},
            { title: this.$t('DataMaintain.taskStatus'), minWidth: 100,key: 'status',fixed: 'left',
              render: (h, params) => {
                let s = '';
                if(params.row.status === 0){
                  s = this.$t('DataMaintain.nostart')
                }else if(params.row.status === 1){
                  s = this.$t('DataMaintain.running')
                }else{
                  s = this.$t('DataMaintain.runsucc')
                }
                return h('span',[s]);
              }
            },
            { title: this.$t('DataMaintain.addTaskTime'), minWidth: 150,key: 'time',fixed: 'left'},
            { title: this.$t('DataMaintain.taskStartTime'), minWidth: 150,key: 'start_time',fixed: 'left'},
            { title: this.$t('DataMaintain.taskEndTime'), minWidth: 150,key: 'end_time',fixed: 'left'},
            { title: this.$t('DataMaintain.inputFilePath'), minWidth: 250,key: 'inputPath' },
            { title: this.$t('DataMaintain.outputFilePath'), minWidth: 250,key: 'outputPath' },
            { title: this.$t('DataMaintain.cmd'), minWidth: 300,key: 'cmd',
              render: (h, params) => {
                let s = params.row.cmd;
                return h('Tooltip',{
                  attrs:{placement:"bottom-start",content:s,maxWidth:"300"},
                  props:{delay:500}
                },[h('span',{
                  style:{whiteSpace:"nowrap"}
                },s)])
              }
            },
            { title: this.$t('DataMaintain.descript'), minWidth: 200,key: 'descript' },
            { title: this.$t('base.action'), minWidth: 100,key: 'id',fixed: 'right',
              render: (h, params) => {
                return h('div', [
                  h('Button', {
                    props: {type: 'primary',size: 'small',disabled:params.row.status === 1},
                    on: {click: event => this.delBtn(event,params.row)}
                  }, this.$t('base.del'))
                ]);
              }
            }
          ],
        }
      },
      methods:{
        delBtn (event,row) {
          this.$refs.delmodal.show({id:row.id,status:row.status});
          event.stopPropagation()
        },
        delTask (obj) {
          this.$sendPOST("/FFmpegTask/delTask.json",obj, data => {
            this.$Message.success(this.$t('base.delsucc'));
            this.$refs.delmodal.close()
            this.$refs.table.loadData()
          });
        }
      }
    }
</script>

<style scoped>

</style>
